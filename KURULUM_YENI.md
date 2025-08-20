# 🚀 Romantik Sürpriz - Yeni Sistem Kurulumu

## 📋 Sistem Gereksinimleri
- Node.js 14+ 
- npm veya yarn
- Modern web tarayıcısı (Chrome, Firefox, Safari, Edge)

## 🛠️ Kurulum Adımları

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. Sunucuyu Başlat
```bash
npm start
```

### 3. Tarayıcıda Aç
```
http://localhost:3000
```

## 🔐 Yönetici Girişi
- **Şifre:** `MarryME`
- Yönetici sayfasına giriş yapmadan veri eklenemez
- Güvenlik için şifre zorunlu

## 📁 Veri Yönetimi

### Veri Kaydetme
- Konum bilgisi
- Video dosyası (MP4 önerilir)
- Özel şifre (1995)
- Veriler `./data/` klasörüne kaydedilir

### Veri Silme
- Yönetici sayfasında "Verileri Sil" butonu
- Tüm veriler ve dosyalar silinir
- Tekrar kayıt edilebilir

## 🎯 Sistem Akışı

### Aşama 1: Konum Kontrolü
- Veriler varsa otomatik başlar
- Hedef konuma git
- Navigasyon butonları

### Aşama 2: Konum Doğrulama
- 5 km yakınında ol
- Aşama 3 şifresi al
- Manuel doğrulama seçeneği

### Aşama 3: Video İzleme
- **İki şifre gerekli:**
  - Aşama 3 şifresi (2. aşamadan)
  - Özel şifre (1995)
- Video otomatik açılır
- USB/Bluetooth beklemez

### Aşama 4: Romantik Final
- Video sonrası otomatik
- Romantik mesaj
- Özel şifre gösterimi
- Arduino keypad talimatları

## 🔧 Teknik Detaylar

### Dosya Yapısı
```
DM/
├── data/           # Veri klasörü
├── server.js       # Node.js sunucusu
├── package.json    # Bağımlılıklar
├── index.html      # Ana sayfa
├── script.js       # JavaScript kodu
├── styles.css      # CSS stilleri
└── dmask.mp4       # Video dosyası
```

### API Endpoint'leri
- `POST /save-data` - Veri kaydetme
- `GET /load-data` - Veri yükleme  
- `POST /delete-data` - Veri silme

## 🚨 Önemli Notlar

1. **Güvenlik:** Yönetici şifresi olmadan veri eklenemez
2. **Video:** MP4 formatı önerilir
3. **Konum:** Detaylı adres bulunamazsa şehir/ilçe yeterli
4. **Veri:** Local storage fallback ile çalışır
5. **Sunucu:** Port 3000'de çalışır

## 🆘 Sorun Giderme

### Video Açılmıyor
- Dosya formatını kontrol et
- Tarayıcı konsolunda hata var mı bak

### Veri Kaydedilmiyor
- Sunucu çalışıyor mu kontrol et
- data/ klasörü yazma izni var mı

### Konum Bulunamıyor
- Daha genel konum dene (örn: Gebze, Kocaeli)
- Koordinat formatını kontrol et

## 📞 Destek
Herhangi bir sorun yaşarsanız:
1. Tarayıcı konsolunu kontrol edin
2. Sunucu loglarını inceleyin
3. Dosya izinlerini kontrol edin
