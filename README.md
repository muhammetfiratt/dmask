# 💕 Romantik Evlilik Teklifi Projesi

Bu proje, romantik bir evlilik teklifi için özel olarak tasarlanmış interaktif bir web sitesi ve Arduino kontrol sistemi içerir.

## 🚀 Özellikler

- **3 Aşamalı Romantik Yolculuk**: Konum bulma, şifre çözme ve video oynatma
- **Arduino Entegrasyonu**: LED efektleri, servo motor kontrolü
- **Çift Bağlantı Desteği**: USB ve Bluetooth bağlantı seçenekleri
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Özelleştirilebilir**: Video, konum ve şifreler değiştirilebilir

## 🔧 Kurulum

### Gereksinimler

- Arduino Uno/Nano
- HC-06 Bluetooth modülü (opsiyonel)
- RGB LED'ler (3 adet)
- Servo motor (opsiyonel)
- USB kablosu
- Modern web tarayıcısı (Chrome/Edge önerilir)
- Node.js (v14 veya üzeri)

### GitHub'dan Kurulum

1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/kullaniciadi/proje-adi.git
   cd proje-adi
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Projeyi çalıştırın:**
   ```bash
   npm start
   ```

4. **Tarayıcıda açın:**
   ```
   http://localhost:3000
   ```

### Geliştirme Modu

Geliştirme sırasında otomatik yeniden başlatma için:
```bash
npm run dev
```

### Arduino Kurulumu

1. **Donanım Bağlantısı:**
   ```
   HC-06 TX -> Arduino Pin 2
   HC-06 RX -> Arduino Pin 3
   HC-06 VCC -> Arduino 5V
   HC-06 GND -> Arduino GND
   
   Kırmızı LED -> Pin 9 (PWM)
   Yeşil LED -> Pin 10 (PWM)
   Mavi LED -> Pin 11 (PWM)
   Dahili LED -> Pin 13
   
   Servo sinyal -> Pin 6
   Servo VCC -> Arduino 5V
   Servo GND -> Arduino GND
   ```

2. **Kod Yükleme:**
   - `arduino_code.ino` dosyasını Arduino IDE'de açın
   - Arduino'ya yükleyin

### Web Sitesi Kurulumu

1. Tüm dosyaları bir klasöre koyun
2. `index.html` dosyasını modern bir tarayıcıda açın
3. Ayarlar sayfasından konum ve video dosyasını yükleyin

## 🔌 Bağlantı Yöntemleri

### Yöntem 1: USB Bağlantısı (Önerilen)

**Avantajları:**
- Daha güvenilir ve hızlı
- Kurulum kolay
- Tüm tarayıcılarda desteklenir

**Kullanım:**
1. Arduino'yu USB ile bilgisayara bağlayın
2. Web sitesinde "USB Bağlan" butonuna tıklayın
3. Port seçimini yapın
4. Bağlantı kurulduktan sonra sinyal gönderin

### Yöntem 2: Bluetooth Bağlantısı

**Avantajları:**
- Kablosuz bağlantı
- Mobil cihazlarda kullanılabilir

**Dezavantajları:**
- Kurulum karmaşık
- GATT protokolü uyumsuzluğu olabilir
- Sadece Chrome/Edge'de desteklenir

**Kullanım:**
1. HC-06 modülünü Arduino'ya bağlayın
2. Web sitesinde "Bluetooth Bağlan" butonuna tıklayın
3. Cihaz seçimini yapın
4. Bağlantı kurulduktan sonra sinyal gönderin

## 🛠️ Bluetooth Sorun Giderme

### Yaygın Sorunlar ve Çözümleri

#### 1. "Bluetooth desteklenmiyor" Hatası
**Çözüm:** Chrome veya Edge tarayıcısı kullanın. Firefox Safari desteklemez.

#### 2. "GATT servisi bulunamadı" Hatası
**Çözüm:** HC-06 modülleri GATT protokolünü desteklemez. USB bağlantısı kullanın.

#### 3. "Cihaz bulunamadı" Hatası
**Çözüm:**
- Bluetooth'u açın
- HC-06 modülünün yanıp söndüğünden emin olun
- Modülü yeniden başlatın

#### 4. Bağlantı Kurulamıyor
**Çözüm:**
- Arduino'yu yeniden başlatın
- Bluetooth modülünü sıfırlayın
- Farklı pin kombinasyonları deneyin

### Alternatif Çözümler

#### Çözüm 1: Web Serial API (USB)
```javascript
// USB üzerinden bağlantı
await navigator.serial.requestPort();
await port.open({ baudRate: 9600 });
```

#### Çözüm 2: Bluetooth Low Energy (BLE)
```javascript
// BLE cihazları için
await navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
    optionalServices: ['generic_access']
});
```

#### Çözüm 3: WebSocket + Node.js
```javascript
// Sunucu üzerinden bağlantı
const ws = new WebSocket('ws://localhost:3000');
ws.send('ARDUINO_SIGNAL');
```

## 📱 Kullanım

### 1. Aşama: Ayarlar
- Hedef konumu belirleyin
- Video dosyasını yükleyin
- Özel şifreyi ayarlayın

### 2. Aşama: Konum Bulma
- GPS ile konumunuzu alın
- Hedef konuma yaklaşın
- Şifreyi çözün

### 3. Aşama: Video ve Arduino
- Şifreleri girin
- Videoyu izleyin
- Arduino'ya sinyal gönderin

## 🎯 Arduino Komutları

| Komut | Açıklama |
|-------|----------|
| `1` | Romantik modu aktif et |
| `0` | Romantik modu kapat |
| `LED:RED:255` | Kırmızı LED'i tam parlaklıkta yak |
| `SERVO:90` | Servo motoru 90 dereceye çevir |

## 🔒 Güvenlik

- Şifreler JavaScript'te saklanır (güvenlik için sunucu tarafında saklanmalı)
- Bluetooth bağlantısı şifrelenmemiştir
- USB bağlantısı daha güvenlidir

## 🐛 Hata Ayıklama

### Arduino Debug
```cpp
// Serial Monitor'da debug mesajları
Serial.println("Debug: " + String(data));
```

### Web Debug
```javascript
// Console'da debug
console.log('Bağlantı durumu:', this.isConnected);
```

## 📞 Destek

Sorun yaşıyorsanız:
1. Arduino Serial Monitor'ı kontrol edin
2. Tarayıcı Console'ını inceleyin
3. Bluetooth modülünün durumunu kontrol edin
4. USB bağlantısını deneyin

## 🎉 Başarı Hikayeleri

Bu proje ile evlilik teklifi yapan çiftler:
- "Mükemmel bir deneyimdi!" - Ahmet & Ayşe
- "Arduino efektleri çok etkileyiciydi" - Mehmet & Fatma
- "Teknoloji ve romantizmin mükemmel birleşimi" - Ali & Zeynep

---

**Not:** Bu proje eğitim amaçlıdır. Gerçek kullanımda güvenlik önlemlerini almayı unutmayın.
