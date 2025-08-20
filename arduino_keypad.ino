/*
 * Romantik Evlilik Teklifi Arduino Kodu
 * 4x4 Membran Keypad + Servo Motor Kontrolü
 * 
 * Bu kod, keypad'den girilen şifreyi kontrol eder ve
 * doğru şifre girildiğinde servo motoru döndürür.
 */

#include <Keypad.h>
#include <Servo.h>

// Keypad ayarları
const byte ROWS = 4;
const byte COLS = 4;
char hexaKeys[ROWS][COLS] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};

byte rowPins[ROWS] = {2, 3, 4, 5}; // Arduino pinleri
byte colPins[COLS] = {6, 7, 8, 9}; // Arduino pinleri

Keypad customKeypad = Keypad(makeKeymap(hexaKeys), rowPins, colPins, ROWS, COLS);

// Servo motor
Servo myServo;
#define SERVO_PIN 10

// LED'ler
#define LED_RED 11
#define LED_GREEN 12
#define LED_BLUE 13

// Şifre ayarları
String correctPassword = "1995"; // Doğru şifre
String enteredPassword = "";
bool isPasswordCorrect = false;

// Servo pozisyonları
#define SERVO_START 0
#define SERVO_END 180

void setup() {
  Serial.begin(9600);
  
  // Pin modlarını ayarla
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_BLUE, OUTPUT);
  
  // Servo motor başlat
  myServo.attach(SERVO_PIN);
  myServo.write(SERVO_START);
  
  // LED'leri söndür
  digitalWrite(LED_RED, LOW);
  digitalWrite(LED_GREEN, LOW);
  digitalWrite(LED_BLUE, LOW);
  
  Serial.println("🎉 Romantik Evlilik Teklifi Arduino Hazır!");
  Serial.println("🔐 Keypad'den şifre bekleniyor...");
  Serial.println("💡 Şifre: " + correctPassword);
  
  // Başlangıç animasyonu
  startupAnimation();
}

void loop() {
  char customKey = customKeypad.getKey();
  
  if (customKey) {
    handleKeyPress(customKey);
  }
  
  // Romantik efektler (şifre doğruysa)
  if (isPasswordCorrect) {
    romanticEffects();
  }
}

void handleKeyPress(char key) {
  Serial.print("🔑 Basılan tuş: ");
  Serial.println(key);
  
  if (key == '#') {
    // Şifre girişi tamamlandı, kontrol et
    checkPassword();
  } else if (key == '*') {
    // Şifreyi temizle
    enteredPassword = "";
    Serial.println("🗑️ Şifre temizlendi");
    resetLEDs();
  } else if (key >= '0' && key <= '9') {
    // Sayı tuşu, şifreye ekle
    enteredPassword += key;
    Serial.print("📝 Girilen şifre: ");
    Serial.println(enteredPassword);
    
    // LED göstergesi
    showPasswordProgress();
  }
}

void checkPassword() {
  Serial.print("🔍 Şifre kontrol ediliyor: ");
  Serial.println(enteredPassword);
  
  if (enteredPassword == correctPassword) {
    Serial.println("🎉 Şifre doğru! Romantik mod aktif!");
    isPasswordCorrect = true;
    
    // Başarı LED'i
    digitalWrite(LED_GREEN, HIGH);
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_BLUE, LOW);
    
    // Servo motoru döndür
    activateServo();
    
    // Web sitesine bilgi gönder
    Serial.println("STATUS:ROMANTIK_MODE_ACTIVE");
    
  } else {
    Serial.println("❌ Yanlış şifre! Tekrar deneyin.");
    
    // Hata LED'i
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_GREEN, LOW);
    digitalWrite(LED_BLUE, LOW);
    
    // 2 saniye sonra LED'i söndür
    delay(2000);
    resetLEDs();
  }
  
  // Şifreyi temizle
  enteredPassword = "";
}

void activateServo() {
  Serial.println("🔄 Servo motor döndürülüyor...");
  
  // Yumuşak dönüş
  for (int pos = SERVO_START; pos <= SERVO_END; pos += 2) {
    myServo.write(pos);
    delay(20);
  }
  
  delay(1000);
  
  // Geri dön
  for (int pos = SERVO_END; pos >= SERVO_START; pos -= 2) {
    myServo.write(pos);
    delay(20);
  }
  
  Serial.println("✅ Servo motor hareketi tamamlandı!");
}

void showPasswordProgress() {
  int passwordLength = enteredPassword.length();
  
  // Şifre uzunluğuna göre LED göster
  if (passwordLength == 1) {
    digitalWrite(LED_BLUE, HIGH);
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_GREEN, LOW);
  } else if (passwordLength == 2) {
    digitalWrite(LED_BLUE, HIGH);
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_GREEN, LOW);
  } else if (passwordLength == 3) {
    digitalWrite(LED_BLUE, HIGH);
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_GREEN, HIGH);
  } else if (passwordLength >= 4) {
    // Şifre çok uzun, tüm LED'leri yanıp söndür
    for (int i = 0; i < 3; i++) {
      digitalWrite(LED_BLUE, HIGH);
      digitalWrite(LED_RED, HIGH);
      digitalWrite(LED_GREEN, HIGH);
      delay(200);
      digitalWrite(LED_BLUE, LOW);
      digitalWrite(LED_RED, LOW);
      digitalWrite(LED_GREEN, LOW);
      delay(200);
    }
  }
}

void resetLEDs() {
  digitalWrite(LED_RED, LOW);
  digitalWrite(LED_GREEN, LOW);
  digitalWrite(LED_BLUE, LOW);
}

void romanticEffects() {
  // Romantik LED efektleri
  static unsigned long lastEffect = 0;
  if (millis() - lastEffect > 1000) {
    // Kalp atışı efekti
    digitalWrite(LED_RED, HIGH);
    delay(100);
    digitalWrite(LED_RED, LOW);
    delay(100);
    digitalWrite(LED_RED, HIGH);
    delay(100);
    digitalWrite(LED_RED, LOW);
    
    lastEffect = millis();
  }
}

void startupAnimation() {
  Serial.println("🎬 Başlangıç animasyonu çalışıyor...");
  
  // LED'leri sırayla yak
  digitalWrite(LED_RED, HIGH);
  delay(300);
  digitalWrite(LED_RED, LOW);
  
  digitalWrite(LED_GREEN, HIGH);
  delay(300);
  digitalWrite(LED_GREEN, LOW);
  
  digitalWrite(LED_BLUE, HIGH);
  delay(300);
  digitalWrite(LED_BLUE, LOW);
  
  // Servo test
  myServo.write(90);
  delay(500);
  myServo.write(0);
  
  Serial.println("✅ Başlangıç animasyonu tamamlandı!");
}

/*
 * Kullanım Talimatları:
 * 
 * 1. 4x4 Keypad'i Arduino'ya bağlayın:
 *    - ROW1 -> Pin 2
 *    - ROW2 -> Pin 3  
 *    - ROW3 -> Pin 4
 *    - ROW4 -> Pin 5
 *    - COL1 -> Pin 6
 *    - COL2 -> Pin 7
 *    - COL3 -> Pin 8
 *    - COL4 -> Pin 9
 * 
 * 2. Servo motoru Pin 10'a bağlayın
 * 
 * 3. RGB LED'leri Pin 11, 12, 13'e bağlayın
 * 
 * 4. Şifre: 1995
 * 
 * 5. # tuşu ile şifreyi onaylayın
 *    * tuşu ile şifreyi temizleyin
 * 
 * 6. Doğru şifre girildiğinde servo döner!
 */
