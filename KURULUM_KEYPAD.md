# 🔐 4x4 Keypad ile Arduino Kontrolü - Kurulum Rehberi

Bu çözüm, WiFi/Bluetooth olmadan sadece keypad ile Arduino'yu kontrol eder.

## ✨ **Avantajları**

- ✅ **Basit kurulum** - Sadece Arduino + Keypad
- ✅ **Güvenilir** - Kablolu bağlantı
- ✅ **Hızlı** - Anında tepki
- ✅ **Ek donanım gerekmez** - WiFi modülü yok

## 🔧 **Gereksinimler**

### Donanım
- Arduino Uno/Nano
- 4x4 Membran Keypad
- Servo motor (SG90 önerilir)
- RGB LED'ler (3 adet)
- Breadboard ve jumper kablolar

### Yazılım
- Arduino IDE
- Keypad kütüphanesi
- Servo kütüphanesi

## 📋 **Kurulum Adımları**

### 1. Arduino Kütüphaneleri Kurulumu

Arduino IDE'de:
1. **Araçlar > Kütüphane Yöneticisi**
2. **"Keypad"** arayın ve yükleyin
3. **"Servo"** kütüphanesi zaten yüklü

### 2. Donanım Bağlantıları

#### 4x4 Keypad Bağlantısı:
```
Keypad ROW1 -> Arduino Pin 2
Keypad ROW2 -> Arduino Pin 3
Keypad ROW3 -> Arduino Pin 4
Keypad ROW4 -> Arduino Pin 5
Keypad COL1 -> Arduino Pin 6
Keypad COL2 -> Arduino Pin 7
Keypad COL3 -> Arduino Pin 8
Keypad COL4 -> Arduino Pin 9
```

#### Servo Motor:
```
Servo Sinyal -> Arduino Pin 10
Servo VCC -> Arduino 5V
Servo GND -> Arduino GND
```

#### RGB LED'ler:
```
Kırmızı LED -> Arduino Pin 11 (PWM)
Yeşil LED -> Arduino Pin 12 (PWM)
Mavi LED -> Arduino Pin 13 (PWM)
LED GND -> Arduino GND
```

### 3. Arduino Kodu Yükleme

1. `arduino_keypad.ino` dosyasını Arduino IDE'de açın
2. Arduino'yu bilgisayara bağlayın
3. **Yükle** butonuna tıklayın

### 4. Test Etme

1. **Arduino'yu açın**
2. **Serial Monitor'u açın** (9600 baud)
3. **Şu mesajları görün:**
   ```
   🎉 Romantik Evlilik Teklifi Arduino Hazır!
   🔐 Keypad'den şifre bekleniyor...
   💡 Şifre: 1995
   ```

## 🔑 **Keypad Kullanımı**

### Tuş Düzeni:
```
1 2 3 A
4 5 6 B
7 8 9 C
* 0 # D
```

### Şifre Girişi:
1. **1995** şifresini girin
2. **#** tuşu ile onaylayın
3. **Servo motor dönecek!**

### Diğer Tuşlar:
- **\*** = Şifreyi temizle
- **A, B, C, D** = Kullanılmıyor

## 🎬 **Web Sitesi Kullanımı**

1. **Video oynatın**
2. **Video bittiğinde:**
   - "Romantik" yazısı belirir
   - Şifre ekranda gösterilir
   - Arduino talimatları görünür

## 🚨 **Sorun Giderme**

### Keypad Çalışmıyor
1. Pin bağlantılarını kontrol edin
2. Keypad kütüphanesinin yüklü olduğundan emin olun
3. Serial Monitor'da tuş basımlarını kontrol edin

### Servo Hareket Etmiyor
1. Pin 10 bağlantısını kontrol edin
2. Servo güç kaynağını kontrol edin
3. Arduino'yu yeniden başlatın

### LED'ler Yanmıyor
1. Pin 11, 12, 13 bağlantılarını kontrol edin
2. LED'lerin doğru yönde bağlandığından emin olun
3. PWM pinler olduğundan emin olun

## 📱 **Mobil Uyumluluk**

- Web sitesi mobil cihazlarda da çalışır
- Video oynatma mobil uyumlu
- Şifre gösterimi responsive tasarım

## 🔒 **Güvenlik**

- Şifre sabit: **1995**
- Şifreyi değiştirmek için Arduino kodunda `correctPassword` değişkenini güncelleyin
- Keypad sadece yerel olarak çalışır

## 🎯 **Özelleştirme**

### Şifre Değiştirme:
```cpp
String correctPassword = "YENI_SIFRE"; // Bu satırı değiştirin
```

### LED Renkleri:
```cpp
#define LED_RED 11    // Pin değiştirin
#define LED_GREEN 12  // Pin değiştirin  
#define LED_BLUE 13   // Pin değiştirin
```

### Servo Açısı:
```cpp
#define SERVO_START 0   // Başlangıç açısı
#define SERVO_END 180   // Bitiş açısı
```

---

**🎉 Artık WiFi/Bluetooth olmadan Arduino'nuzu keypad ile kontrol edebilirsiniz!**

**💡 İpucu:** Keypad'i güzel bir kutuya yerleştirip romantik bir görünüm verebilirsiniz.
