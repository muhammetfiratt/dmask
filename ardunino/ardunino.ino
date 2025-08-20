/*
 * Romantik Evlilik Teklifi Arduino Kodu
 * 4x4 Membran Keypad + Servo Motor Kontrolü
 */

#include <Servo.h>

// Keypad ayarları
const int ROW_PINS[4] = {2, 3, 4, 5};
const int COL_PINS[4] = {6, 7, 8, 9};

char keys[4][4] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};

// Servo motor
Servo myServo;
#define SERVO_PIN 10

// LED'ler
#define LED_RED 11
#define LED_GREEN 12
#define LED_BLUE 13

// Şifre ayarları
String correctPassword = "1995";
String enteredPassword = "";
bool isPasswordCorrect = false;

// Servo durumu
bool servoAt180 = false; // Servo 180° pozisyonunda mı?

void setup() {
  Serial.begin(9600);
  
  // Pin modlarını ayarla
  for (int i = 0; i < 4; i++) {
    pinMode(ROW_PINS[i], OUTPUT);
    pinMode(COL_PINS[i], INPUT_PULLUP);
  }
  
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_BLUE, OUTPUT);
  
  // Servo motor başlat
  myServo.attach(SERVO_PIN);
  myServo.write(0); // Başlangıç pozisyonu
  
  resetLEDs();
  
  Serial.println("🎉 Romantik Evlilik Teklifi Arduino Hazır!");
  Serial.println("🔐 Keypad'den şifre bekleniyor...");
  Serial.println("�� Şifre: " + correctPassword);
  Serial.println("📝 * = Şifreyi temizle, # = Onayla, D = Aç (180° sonra)");
  
  startupAnimation();
}

void loop() {
  // Keypad tarama
  char pressedKey = scanKeypad();
  
  if (pressedKey != '\0') {
    handleKeyPress(pressedKey);
    delay(200); // Tuş sıçrama önleme
  }
  
  // Romantik efektler (şifre doğruysa)
  if (isPasswordCorrect) {
    romanticEffects();
  }
}

char scanKeypad() {
  for (int row = 0; row < 4; row++) {
    // Tüm satırları HIGH yap
    for (int r = 0; r < 4; r++) {
      digitalWrite(ROW_PINS[r], HIGH);
    }
    
    // Sadece mevcut satırı LOW yap
    digitalWrite(ROW_PINS[row], LOW);
    
    // Sütunları kontrol et
    for (int col = 0; col < 4; col++) {
      if (digitalRead(COL_PINS[col]) == LOW) {
        delay(50); // Debounce
        if (digitalRead(COL_PINS[col]) == LOW) {
          return keys[row][col];
        }
      }
    }
  }
  return '\0';
}

void handleKeyPress(char key) {
  Serial.print("�� Basılan tuş: ");
  Serial.println(key);
  
  if (key == '#') {
    // Şifre onayla
    checkPassword();
  } else if (key == '*') {
    // Şifreyi temizle
    enteredPassword = "";
    Serial.println("🗑️ Şifre temizlendi");
    resetLEDs();
  } else if (key == 'D') {
    // D tuşu - Servo 180° sonra aç
    if (servoAt180) {
      openServo();
    } else {
      Serial.println("⚠️ Önce servo 180° pozisyonuna gelmeli!");
    }
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
    
    // Servo motoru 180°'ye döndür
    moveServoTo180();
    
    Serial.println("STATUS:ROMANTIK_MODE_ACTIVE");
    
  } else {
    Serial.println("❌ Yanlış şifre! Tekrar deneyin.");
    
    // Hata LED'i
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_GREEN, LOW);
    digitalWrite(LED_BLUE, LOW);
    
    delay(2000);
    resetLEDs();
  }
  
  // Şifreyi temizle
  enteredPassword = "";
}

void moveServoTo180() {
  Serial.println("🔄 Servo motor 180°'ye döndürülüyor...");
  
  // 0° -> 180° (yavaş)
  for (int pos = 0; pos <= 180; pos += 5) {
    myServo.write(pos);
    delay(100);
    Serial.print("Servo pozisyon: ");
    Serial.println(pos);
  }
  
  servoAt180 = true; // Servo 180° pozisyonunda
  Serial.println("✅ Servo 180° pozisyonunda! D tuşuna basarak açabilirsiniz.");
}

void openServo() {
  Serial.println("🚪 Servo açılıyor...");
  
  // 180° -> 0° (aç)
  for (int pos = 180; pos >= 0; pos -= 5) {
    myServo.write(pos);
    delay(100);
    Serial.print("Servo pozisyon: ");
    Serial.println(pos);
  }
  
  servoAt180 = false; // Servo artık 0° pozisyonunda
  Serial.println("✅ Servo açıldı! (0° pozisyonunda)");
  
  // Başarı LED'i
  digitalWrite(LED_GREEN, HIGH);
  delay(1000);
  resetLEDs();
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
  
  Serial.println("✅ Başlangıç animasyonu tamamlandı!");
}

/*
 * Kullanım Talimatları:
 * 
 * 1. 4x4 Keypad'i Arduino'ya bağlayın
 * 2. Servo motoru Pin 10'a bağlayın
 * 3. RGB LED'leri Pin 11, 12, 13'e bağlayın
 * 4. Şifre: 1995
 * 5. * tuşu = Şifreyi temizle
 * 6. # tuşu = Şifreyi onayla
 * 7. D tuşu = Servo 180° sonra aç
 * 
 * Sıra:
 * 1. 1995 gir + # (servo 180°'ye gider)
 * 2. D tuşuna bas (servo açılır)
 */
