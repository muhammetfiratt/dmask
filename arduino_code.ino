/*
 * Romantik Evlilik Teklifi Arduino Kodu
 * HC-06 Bluetooth Modülü + USB Serial ile Web Sitesi Kontrolü
 * 
 * Bu kod, web sitesinden gelen "1" sinyalini alır ve
 * evlilik teklifi için özel efektler çalıştırır.
 * Hem Bluetooth hem USB üzerinden veri alabilir.
 */

#include <SoftwareSerial.h>

// Bluetooth modülü için pin tanımlamaları
#define BT_RX 2  // Arduino pin 2 -> HC-06 TX
#define BT_TX 3  // Arduino pin 3 -> HC-06 RX

// LED pinleri
#define LED_PIN 13      // Dahili LED
#define LED_RED 9       // Kırmızı LED (PWM)
#define LED_GREEN 10    // Yeşil LED (PWM)
#define LED_BLUE 11     // Mavi LED (PWM)

// Servo motor için (opsiyonel - çelenk açma için)
#include <Servo.h>
#define SERVO_PIN 6
Servo myServo;

// Bluetooth seri haberleşme
SoftwareSerial bluetooth(BT_RX, BT_TX);

// Değişkenler
String receivedData = "";
String usbData = "";
String btData = "";
bool isRomanticMode = false;
int ledBrightness = 0;
int fadeDirection = 1;
unsigned long lastBlinkTime = 0;
bool ledState = false;

void setup() {
  // USB Seri haberleşme başlat
  Serial.begin(9600);
  
  // Bluetooth seri haberleşme başlat
  bluetooth.begin(9600);
  
  // Pin modlarını ayarla
  pinMode(LED_PIN, OUTPUT);
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_BLUE, OUTPUT);
  
  // Servo motor başlat
  myServo.attach(SERVO_PIN);
  myServo.write(0); // Başlangıç pozisyonu
  
  // LED'leri söndür
  digitalWrite(LED_PIN, LOW);
  analogWrite(LED_RED, 0);
  analogWrite(LED_GREEN, 0);
  analogWrite(LED_BLUE, 0);
  
  Serial.println("Romantik Evlilik Teklifi Arduino Hazır!");
  Serial.println("USB ve Bluetooth bağlantısı bekleniyor...");
  
  // Başlangıç animasyonu
  startupAnimation();
}

void loop() {
  // USB Serial'dan veri oku
  if (Serial.available()) {
    char c = Serial.read();
    
    if (c == '\n' || c == '\r') {
      // Satır sonu geldi, veriyi işle
      if (usbData.length() > 0) {
        processReceivedData(usbData, "USB");
        usbData = "";
      }
    } else {
      usbData += c;
    }
  }
  
  // Bluetooth'dan veri oku
  if (bluetooth.available()) {
    char c = bluetooth.read();
    
    if (c == '\n' || c == '\r') {
      // Satır sonu geldi, veriyi işle
      if (btData.length() > 0) {
        processReceivedData(btData, "Bluetooth");
        btData = "";
      }
    } else {
      btData += c;
    }
  }
  
  // Romantik mod aktifse efektleri çalıştır
  if (isRomanticMode) {
    romanticEffects();
  }
  
  // Bağlantı durumunu göster (dahili LED yanıp söner)
  showConnectionStatus();
  
  // Kısa gecikme
  delay(50);
}

void processReceivedData(String data, String source) {
  data.trim(); // Boşlukları temizle
  
  Serial.print("Alınan veri (" + source + "): ");
  Serial.println(data);
  
  if (data == "1") {
    // Web sitesinden "1" sinyali geldi!
    Serial.println("🎉 ROMANTİK MOD AKTİF! 🎉");
    activateRomanticMode();
  } else if (data == "0") {
    // Romantik modu kapat
    Serial.println("Romantik mod kapatıldı");
    deactivateRomanticMode();
  } else if (data.startsWith("LED:")) {
    // LED kontrol komutu
    processLEDCommand(data);
  } else if (data.startsWith("SERVO:")) {
    // Servo kontrol komutu
    processServoCommand(data);
  }
}

void showConnectionStatus() {
  // Her 2 saniyede bir dahili LED'i yanıp söndür (bağlantı var)
  if (millis() - lastBlinkTime > 2000) {
    ledState = !ledState;
    digitalWrite(LED_PIN, ledState);
    lastBlinkTime = millis();
    
    // Bağlantı durumunu USB ve Bluetooth'a gönder
    if (ledState) {
      Serial.println("STATUS:CONNECTED");
      bluetooth.println("STATUS:CONNECTED");
    }
  }
}

void activateRomanticMode() {
  isRomanticMode = true;
  
  // Başlangıç efekti
  digitalWrite(LED_PIN, HIGH);
  
  // Renkli LED'leri yak
  analogWrite(LED_RED, 255);
  analogWrite(LED_GREEN, 0);
  analogWrite(LED_BLUE, 255);
  
  // Servo motoru hareket ettir
  myServo.write(180);
  
  // Başarı mesajı gönder (hem USB hem Bluetooth)
  Serial.println("ROMANTIK_MODE_ACTIVE");
  bluetooth.println("ROMANTIK_MODE_ACTIVE");
  
  Serial.println("Romantik mod aktif edildi!");
}

void deactivateRomanticMode() {
  isRomanticMode = false;
  
  // Tüm LED'leri söndür
  digitalWrite(LED_PIN, LOW);
  analogWrite(LED_RED, 0);
  analogWrite(LED_GREEN, 0);
  analogWrite(LED_BLUE, 0);
  
  // Servo motoru sıfırla
  myServo.write(0);
  
  // Kapatma mesajı gönder (hem USB hem Bluetooth)
  Serial.println("ROMANTIK_MODE_DEACTIVE");
  bluetooth.println("ROMANTIK_MODE_DEACTIVE");
  
  Serial.println("Romantik mod kapatıldı!");
}

void romanticEffects() {
  // Kalp atışı efekti
  static unsigned long lastHeartbeat = 0;
  if (millis() - lastHeartbeat > 1000) {
    heartbeatEffect();
    lastHeartbeat = millis();
  }
  
  // Renk geçiş efekti
  static unsigned long lastColorChange = 0;
  if (millis() - lastColorChange > 100) {
    colorFadeEffect();
    lastColorChange = millis();
  }
}

void heartbeatEffect() {
  // Dahili LED kalp atışı
  digitalWrite(LED_PIN, HIGH);
  delay(100);
  digitalWrite(LED_PIN, LOW);
  delay(100);
  digitalWrite(LED_PIN, HIGH);
  delay(100);
  digitalWrite(LED_PIN, LOW);
}

void colorFadeEffect() {
  // RGB LED renk geçiş efekti
  ledBrightness += fadeDirection * 5;
  
  if (ledBrightness >= 255) {
    ledBrightness = 255;
    fadeDirection = -1;
  } else if (ledBrightness <= 0) {
    ledBrightness = 0;
    fadeDirection = 1;
  }
  
  // Renk geçişi (pembe -> kırmızı -> pembe)
  int redValue = map(ledBrightness, 0, 255, 128, 255);
  int blueValue = map(ledBrightness, 0, 255, 255, 128);
  
  analogWrite(LED_RED, redValue);
  analogWrite(LED_BLUE, blueValue);
}

void processLEDCommand(String command) {
  // LED:RED:255 formatında komut
  if (command.startsWith("LED:RED:")) {
    int value = command.substring(8).toInt();
    analogWrite(LED_RED, constrain(value, 0, 255));
  } else if (command.startsWith("LED:GREEN:")) {
    int value = command.substring(10).toInt();
    analogWrite(LED_GREEN, constrain(value, 0, 255));
  } else if (command.startsWith("LED:BLUE:")) {
    int value = command.substring(9).toInt();
    analogWrite(LED_BLUE, constrain(value, 0, 255));
  }
}

void processServoCommand(String command) {
  // SERVO:90 formatında komut
  if (command.startsWith("SERVO:")) {
    int angle = command.substring(6).toInt();
    angle = constrain(angle, 0, 180);
    myServo.write(angle);
    
    // Onay mesajı gönder
    bluetooth.print("SERVO_MOVED_TO:");
    bluetooth.println(angle);
  }
}

void startupAnimation() {
  // Başlangıç animasyonu
  Serial.println("Başlangıç animasyonu çalışıyor...");
  
  // LED'leri sırayla yak
  for (int i = 0; i < 3; i++) {
    digitalWrite(LED_PIN, HIGH);
    delay(200);
    digitalWrite(LED_PIN, LOW);
    delay(200);
  }
  
  // RGB LED test
  analogWrite(LED_RED, 255);
  delay(300);
  analogWrite(LED_RED, 0);
  
  analogWrite(LED_GREEN, 255);
  delay(300);
  analogWrite(LED_GREEN, 0);
  
  analogWrite(LED_BLUE, 255);
  delay(300);
  analogWrite(LED_BLUE, 0);
  
  // Servo test
  myServo.write(90);
  delay(500);
  myServo.write(0);
  
  Serial.println("Başlangıç animasyonu tamamlandı!");
}

// Yardımcı fonksiyonlar
int constrain(int value, int min, int max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/*
 * Kullanım Talimatları:
 * 
 * 1. HC-06 Bluetooth modülünü Arduino'ya bağlayın:
 *    - HC-06 TX -> Arduino Pin 2
 *    - HC-06 RX -> Arduino Pin 3
 *    - HC-06 VCC -> Arduino 5V
 *    - HC-06 GND -> Arduino GND
 * 
 * 2. LED'leri bağlayın:
 *    - Kırmızı LED -> Pin 9 (PWM)
 *    - Yeşil LED -> Pin 10 (PWM)
 *    - Mavi LED -> Pin 11 (PWM)
 *    - Dahili LED -> Pin 13
 * 
 * 3. Servo motor (opsiyonel):
 *    - Servo sinyal -> Pin 6
 *    - Servo VCC -> Arduino 5V
 *    - Servo GND -> Arduino GND
 * 
 * 4. Web sitesinden "1" sinyali geldiğinde:
 *    - Romantik mod aktif olur
 *    - LED'ler yanar ve efektler başlar
 *    - Servo motor hareket eder
 * 
 * 5. Ek komutlar:
 *    - "0" -> Romantik modu kapat
 *    - "LED:RED:255" -> Kırmızı LED'i tam parlaklıkta yak
 *    - "SERVO:90" -> Servo motoru 90 dereceye çevir
 * 
 * Not: Bu kod evlilik teklifi için özel olarak tasarlanmıştır.
 * Romantik efektler ve LED animasyonları içerir.
 */
