const express = require('express');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basit statik dosya servisi
app.use(express.static('.'));
app.use('/data', express.static('data'));

// Multer konfigürasyonu - Heroku uyumlu
const storage = multer.memoryStorage(); // Dosyaları memory'de tut (Heroku için)

const upload = multer({ storage: storage });

// Veri kaydetme endpoint'i - Heroku uyumlu
app.post('/save-data', upload.single('videoFile'), async (req, res) => {
    try {
        const { targetLocation, customPassword } = req.body;
        
        // Veri dosyasını kaydet (Heroku'da memory'de tut)
        const dataToSave = {
            targetLocation: JSON.parse(targetLocation),
            customPassword: customPassword,
            videoFileName: req.file ? req.file.originalname : null,
            videoData: req.file ? req.file.buffer.toString('base64') : null, // Base64 olarak sakla
            timestamp: new Date().toISOString()
        };
        
        // Heroku'da dosya sistemi geçici olduğu için config'i memory'de tut
        global.appConfig = dataToSave;
        
        res.json({ success: true, message: 'Veriler kaydedildi' });
    } catch (error) {
        console.error('Veri kaydetme hatası:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Veri yükleme endpoint'i - Heroku uyumlu
app.get('/load-data', async (req, res) => {
    try {
        // Heroku'da memory'de saklanan config'i kullan
        if (global.appConfig) {
            res.json(global.appConfig);
        } else {
            res.status(404).json({ success: false, message: 'Veri bulunamadı' });
        }
    } catch (error) {
        console.error('Veri yükleme hatası:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Veri silme endpoint'i - Heroku uyumlu
app.post('/delete-data', async (req, res) => {
    try {
        // Heroku'da memory'de saklanan config'i temizle
        global.appConfig = null;
        
        res.json({ success: true, message: 'Veriler silindi' });
    } catch (error) {
        console.error('Veri silme hatası:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Google Maps API Key endpoint'i
app.get('/api/maps-key', (req, res) => {
    // Environment variable'dan API key'i al
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';
    res.json({ apiKey: apiKey });
});

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
    console.log('Veri klasörü: ./data/');
});
