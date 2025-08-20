# 🚀 GitHub Deployment Rehberi

Bu rehber, projenizi GitHub'da yayınlamak ve çalıştırmak için gerekli adımları içerir.

## 📋 Ön Gereksinimler

- [Git](https://git-scm.com/) yüklü
- [Node.js](https://nodejs.org/) v14 veya üzeri
- [npm](https://www.npmjs.com/) veya [yarn](https://yarnpkg.com/)
- GitHub hesabı

## 🔧 Yerel Kurulum

1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/kullaniciadi/proje-adi.git
   cd proje-adi
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Projeyi test edin:**
   ```bash
   npm start
   ```

4. **Tarayıcıda açın:**
   ```
   http://localhost:3000
   ```

## 🌐 GitHub'da Yayınlama

### 1. Yeni Repository Oluşturma

1. GitHub'da [yeni repository](https://github.com/new) oluşturun
2. Repository adını girin (örn: `romantic-surprise`)
3. Public veya Private seçin
4. README, .gitignore ve license eklemeyin (zaten mevcut)
5. "Create repository" butonuna tıklayın

### 2. Projeyi GitHub'a Yükleme

```bash
# Mevcut git repository'yi kaldırın (eğer varsa)
rm -rf .git

# Yeni git repository başlatın
git init

# Tüm dosyaları ekleyin
git add .

# İlk commit'i yapın
git commit -m "Initial commit: Romantik Evlilik Teklifi Projesi"

# Remote origin ekleyin (URL'yi kendi repository'nizle değiştirin)
git remote add origin https://github.com/kullaniciadi/proje-adi.git

# Main branch'e push yapın
git branch -M main
git push -u origin main
```

### 3. GitHub Pages ile Yayınlama

**Not:** Bu proje Node.js backend gerektirdiği için GitHub Pages'de tam olarak çalışmaz. Sadece statik dosyalar (HTML, CSS, JS) çalışır.

1. Repository Settings > Pages
2. Source: "Deploy from a branch" seçin
3. Branch: "main" seçin
4. Folder: "/ (root)" seçin
5. Save'e tıklayın

## 🚀 Canlı Deployment Seçenekleri

### Seçenek 1: Heroku (Ücretsiz)

1. [Heroku](https://heroku.com) hesabı oluşturun
2. Heroku CLI yükleyin
3. Proje klasöründe:
   ```bash
   heroku login
   heroku create proje-adi
   git push heroku main
   ```

### Seçenek 2: Vercel (Ücretsiz)

1. [Vercel](https://vercel.com) hesabı oluşturun
2. GitHub repository'nizi bağlayın
3. Otomatik deployment başlar

### Seçenek 3: Netlify (Ücretsiz)

1. [Netlify](https://netlify.com) hesabı oluşturun
2. GitHub repository'nizi bağlayın
3. Build command: `npm run build`
4. Publish directory: `.`

### Seçenek 4: Railway (Ücretsiz)

1. [Railway](https://railway.app) hesabı oluşturun
2. GitHub repository'nizi bağlayın
3. Otomatik Node.js deployment

## 🔄 Otomatik Deployment

GitHub Actions workflow dosyası (`.github/workflows/deploy.yml`) otomatik olarak:
- Her push'ta testleri çalıştırır
- Farklı Node.js versiyonlarında test eder
- Build işlemini gerçekleştirir

## 📱 Mobil Uyumluluk

Proje zaten responsive tasarıma sahip, ancak mobil cihazlarda:
- Touch events optimize edilmiştir
- Viewport meta tag eklenmiştir
- CSS media queries kullanılmıştır

## 🔒 Güvenlik Notları

- `data/` klasörü `.gitignore`'da (güvenlik için)
- Şifreler client-side'da saklanır
- Production'da environment variables kullanın

## 🐛 Sorun Giderme

### "npm install" Hatası
```bash
# Node.js versiyonunu kontrol edin
node --version

# npm cache'i temizleyin
npm cache clean --force

# node_modules'u silin ve tekrar deneyin
rm -rf node_modules package-lock.json
npm install
```

### Port Hatası
```bash
# Farklı port kullanın
PORT=3001 npm start
```

### Git Push Hatası
```bash
# Force push (dikkatli kullanın)
git push -f origin main
```

## 📚 Faydalı Linkler

- [GitHub Pages](https://pages.github.com/)
- [Heroku Deployment](https://devcenter.heroku.com/categories/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

## 🎯 Sonraki Adımlar

1. **Domain Name:** Kendi domain'inizi ekleyin
2. **SSL Certificate:** HTTPS için Let's Encrypt kullanın
3. **Database:** MongoDB veya PostgreSQL ekleyin
4. **Authentication:** JWT veya OAuth ekleyin
5. **Monitoring:** Uptime monitoring ekleyin

---

**Not:** Bu proje eğitim amaçlıdır. Production'da güvenlik önlemlerini almayı unutmayın.
