// Romantik Evlilik Teklifi Web Sitesi JavaScript

// Google Maps API Key'i güvenli bir şekilde yükle
async function loadGoogleMapsAPI() {
    try {
        // Önce server endpoint'ini dene (Node.js server için)
        let apiKey = null;
        
        try {
            const response = await fetch('/api/maps-key');
            if (response.ok) {
                const data = await response.json();
                apiKey = data.apiKey;
            }
        } catch (serverError) {
            console.log('Server endpoint mevcut değil, alternatif yöntem kullanılıyor...');
        }
        
        // Eğer server endpoint çalışmıyorsa (GitHub Pages gibi), environment variable'ı kontrol et
        if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
            // GitHub Pages için geçici bir demo key kullan veya placeholder bırak
            apiKey = 'demo_key_or_placeholder';
            console.warn('⚠️ API key ayarlanmamış. Harita çalışmayabilir.');
        }
        
        // Mevcut script tag'ini güncelle
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript && apiKey !== 'demo_key_or_placeholder') {
            const newSrc = existingScript.src.replace('YOUR_GOOGLE_MAPS_API_KEY', apiKey);
            existingScript.src = newSrc;
        }
    } catch (error) {
        console.error('Google Maps API key yüklenemedi:', error);
    }
}

// Sayfa yüklendiğinde API key'i yükle
document.addEventListener('DOMContentLoaded', loadGoogleMapsAPI);

class RomanticSurprise {
    constructor() {
        this.currentStage = 'stage1';
        this.targetLocation = null;
        this.currentLocation = null;
        this.videoFile = null;

        this.stage3Password = this.generateRandomPassword(); // Konum doğrulandığında verilen şifre
        this.customPassword = '1995'; // Kullanıcının bildiği sabit şifre
        this.adminPassword = 'MarryME'; // Yönetici giriş şifresi
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupEventListeners();
        this.addRomanticEffects();
        this.loadStoredData();
    }

    bindEvents() {
        // Üst yönetici butonu
        const adminSettingsBtn = document.getElementById('admin-settings-btn');
        if (adminSettingsBtn) {
            adminSettingsBtn.addEventListener('click', () => this.checkAdminPassword());
        }
        
        // Aşama 1'deki yönetici butonu
        const goToAdminBtn = document.getElementById('go-to-admin-btn');
        if (goToAdminBtn) {
            goToAdminBtn.addEventListener('click', () => this.checkAdminPassword());
        }
        
        // Ayarlar sayfası
        const videoInput = document.getElementById('video-input');
        if (videoInput) {
            videoInput.addEventListener('change', (e) => this.handleVideoUpload(e));
        }
        
        const startJourneyBtn = document.getElementById('start-journey-btn');
        if (startJourneyBtn) {
            startJourneyBtn.addEventListener('click', () => this.startJourney());
        }
        
        const customPasswordInput = document.getElementById('custom-password');
        if (customPasswordInput) {
            customPasswordInput.addEventListener('input', (e) => this.customPassword = e.target.value);
        }

        // Aşama 1
        const backToSettingsBtn = document.getElementById('back-to-settings');
        if (backToSettingsBtn) {
            backToSettingsBtn.addEventListener('click', () => this.showPage('settings'));
        }
        
        const checkLocationBtn = document.getElementById('check-location-btn');
        if (checkLocationBtn) {
            checkLocationBtn.addEventListener('click', () => this.checkLocation());
        }
        
        // Navigasyon butonları
        const openGoogleMapsBtn = document.getElementById('open-google-maps');
        if (openGoogleMapsBtn) {
            openGoogleMapsBtn.addEventListener('click', () => this.openGoogleMaps());
        }
        
        const openAppleMapsBtn = document.getElementById('open-apple-maps');
        if (openAppleMapsBtn) {
            openAppleMapsBtn.addEventListener('click', () => this.openAppleMaps());
        }
        
        const copyCoordinatesBtn = document.getElementById('copy-coordinates');
        if (copyCoordinatesBtn) {
            copyCoordinatesBtn.addEventListener('click', () => this.copyCoordinates());
        }

        // Aşama 2
        const backToStage1Btn = document.getElementById('back-to-stage1');
        if (backToStage1Btn) {
            backToStage1Btn.addEventListener('click', () => this.showPage('stage1'));
        }
        
        const proceedToStage3Btn = document.getElementById('proceed-to-stage3');
        if (proceedToStage3Btn) {
            proceedToStage3Btn.addEventListener('click', () => this.showPage('stage3'));
        }
        
        const copyPasswordBtn = document.getElementById('copy-password');
        if (copyPasswordBtn) {
            copyPasswordBtn.addEventListener('click', () => this.copyPassword());
        }

        // Aşama 3
        const backToStage2Btn = document.getElementById('back-to-stage2');
        if (backToStage2Btn) {
            backToStage2Btn.addEventListener('click', () => this.showPage('stage2'));
        }
        
        const unlockVideoBtn = document.getElementById('unlock-video-btn');
        if (unlockVideoBtn) {
            unlockVideoBtn.addEventListener('click', () => this.unlockVideo());
        }
        
        const sendArduinoSignalBtn = document.getElementById('send-arduino-signal');
        if (sendArduinoSignalBtn) {
            sendArduinoSignalBtn.addEventListener('click', () => this.sendArduinoSignal());
        }

        // Video events
        const romanticVideo = document.getElementById('romantic-video');
        if (romanticVideo) {
            romanticVideo.addEventListener('ended', () => this.onVideoEnded());
        }
    }

    checkStage1Data() {
        const locationDisplay = document.getElementById('location-display');
        const noDataMessage = document.getElementById('no-data-message');
        
        if (this.targetLocation && this.videoFile) {
            // Veriler var, konum göster
            locationDisplay.style.display = 'grid';
            noDataMessage.style.display = 'none';
            this.updateLocationDisplay();
        } else {
            // Veriler yok, uyarı göster
            locationDisplay.style.display = 'none';
            noDataMessage.style.display = 'block';
        }
    }

    checkAdminPassword() {
        const password = prompt('Yönetici şifresini girin:');
        if (password === this.adminPassword) {
            this.showPage('settings');
            this.showNotification('Yönetici erişimi onaylandı!', 'success');
            this.loadAdminData();
        } else if (password !== null) {
            this.showNotification('Yanlış şifre! Erişim reddedildi.', 'error');
        }
    }

    loadAdminData() {
        // Mevcut verileri yükle
        if (this.targetLocation) {
            document.getElementById('location-input').value = this.targetLocation.displayName || this.targetLocation;
        }
        if (this.customPassword) {
            document.getElementById('custom-password').value = this.customPassword;
        }
        if (this.videoFile) {
            const videoInfo = document.getElementById('video-info');
            videoInfo.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <strong>${this.videoFile.name}</strong> yüklenmiş (${this.formatFileSize(this.videoFile.size)})
            `;
            videoInfo.style.background = 'linear-gradient(135deg, #d5f4e6, #a8e6cf)';
            videoInfo.style.color = '#27ae60';
            videoInfo.style.borderLeftColor = '#27ae60';
        }
        
        // Kaydet/Sil butonlarını göster
        this.showAdminButtons();
    }

    showAdminButtons() {
        const startBtn = document.getElementById('start-journey-btn');
        const hasData = this.targetLocation && this.videoFile && this.customPassword;
        
        if (hasData) {
            startBtn.innerHTML = '<i class="fas fa-save"></i> Verileri Güncelle';
            startBtn.onclick = () => this.updateData();
            
            // Sil butonu ekle
            if (!document.getElementById('delete-data-btn')) {
                const deleteBtn = document.createElement('button');
                deleteBtn.id = 'delete-data-btn';
                deleteBtn.className = 'btn btn-danger';
                deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Verileri Sil';
                deleteBtn.onclick = () => this.deleteData();
                startBtn.parentNode.insertBefore(deleteBtn, startBtn.nextSibling);
            }
        } else {
            startBtn.innerHTML = '<i class="fas fa-play"></i> Yolculuğa Başla';
            startBtn.onclick = () => this.startJourney();
            
            // Sil butonunu kaldır
            const deleteBtn = document.getElementById('delete-data-btn');
            if (deleteBtn) deleteBtn.remove();
        }
    }

    async updateData() {
        try {
            await this.saveData();
            this.showNotification('Veriler güncellendi!', 'success');
            this.showPage('stage1');
        } catch (error) {
            this.showNotification('Veri güncellenirken hata: ' + error.message, 'error');
        }
    }

    async deleteData() {
        if (confirm('Tüm verileri silmek istediğinizden emin misiniz?')) {
            try {
                this.targetLocation = null;
                this.videoFile = null;
                this.customPassword = null;
                
                // Dosyaları sil
                await this.deleteDataFiles();
                
                // Form alanlarını temizle
                document.getElementById('location-input').value = '';
                document.getElementById('custom-password').value = '';
                document.getElementById('video-input').value = '';
                
                const videoInfo = document.getElementById('video-info');
                videoInfo.innerHTML = `
                    <i class="fas fa-info-circle"></i>
                    <small>Video dosyası seçin (MP4 önerilir)</small>
                `;
                videoInfo.style.background = '';
                videoInfo.style.color = '';
                videoInfo.style.borderLeftColor = '';
                
                this.showNotification('Veriler silindi!', 'success');
                this.showAdminButtons();
                
            } catch (error) {
                this.showNotification('Veri silinirken hata: ' + error.message, 'error');
            }
        }
    }

    async deleteDataFiles() {
        try {
            // data klasöründeki dosyaları sil
            const response = await fetch('/delete-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete' })
            });
            
            if (!response.ok) {
                throw new Error('Dosya silinemedi');
            }
        } catch (error) {
            console.error('Dosya silme hatası:', error);
        }
    }

    addRomanticEffects() {
        // Kalp animasyonları ekle
        setInterval(() => {
            this.createFloatingHeart();
        }, 3000);

        // Başlık kalp atışı efekti
        const title = document.querySelector('.header h1');
        setInterval(() => {
            title.classList.add('heartbeat');
            setTimeout(() => {
                title.classList.remove('heartbeat');
            }, 1500);
        }, 5000);
    }

    createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.className = 'floating-hearts';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heart.style.opacity = '0';
        
        document.body.appendChild(heart);
        
        // Yumuşak giriş
        setTimeout(() => {
            heart.style.transition = 'opacity 0.5s ease-in';
            heart.style.opacity = '0.8';
        }, 100);
        
        setTimeout(() => {
            heart.style.transition = 'opacity 0.5s ease-out';
            heart.style.opacity = '0';
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 500);
        }, 5500);
    }

    async loadStoredData() {
        try {
            // GitHub Pages kontrolü
            const isGitHubPages = window.location.hostname.includes('github.io');
            
            if (isGitHubPages) {
                // GitHub Pages'de direkt config.json dosyasını oku
                await this.loadFromConfigFile();
            } else {
                // Node.js server endpoint'ini dene
                const response = await fetch('/load-data');
                if (response.ok) {
                    const data = await response.json();
                    this.targetLocation = data.targetLocation;
                    this.customPassword = data.customPassword;
                    
                    // Video dosyasını yükle
                    if (data.videoFileName) {
                        const videoResponse = await fetch(`/data/${data.videoFileName}`);
                        if (videoResponse.ok) {
                            const videoBlob = await videoResponse.blob();
                            this.videoFile = new File([videoBlob], data.videoFileName, { type: 'video/mp4' });
                        }
                    }
                    
                    this.showNotification('Veriler dosya sisteminden yüklendi!', 'success');
                } else {
                    // Fallback olarak localStorage kullan
                    this.loadFromLocalStorage();
                }
            }
        } catch (error) {
            console.error('Veri yükleme hatası:', error);
            this.loadFromLocalStorage();
        }
        
        // Aşama 1'de veri kontrolü yap
        this.checkStage1Data();
        
        // Yönetici veri kontrolü yap
        this.checkAdminData();
    }

    async loadFromConfigFile() {
        try {
            // GitHub Pages'de config.json dosyasını oku
            const response = await fetch('./data/config.json');
            if (response.ok) {
                const data = await response.json();
                this.targetLocation = data.targetLocation;
                this.customPassword = data.customPassword;
                
                // Video dosyasını yükle
                if (data.videoFileName) {
                    try {
                        const videoResponse = await fetch(`./data/${data.videoFileName}`);
                        if (videoResponse.ok) {
                            const videoBlob = await videoResponse.blob();
                            this.videoFile = new File([videoBlob], data.videoFileName, { type: 'video/mp4' });
                        }
                    } catch (videoError) {
                        console.warn('Video dosyası yüklenemedi:', videoError);
                        // Video olmadan devam et
                    }
                }
                
                console.log('✅ Veriler config.json dosyasından yüklendi!');
            } else {
                throw new Error('Config.json dosyası bulunamadı');
            }
        } catch (error) {
            console.error('Config dosyası yükleme hatası:', error);
            // Fallback olarak localStorage kullan
            this.loadFromLocalStorage();
        }
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem('romanticSurprise');
        if (stored) {
            const data = JSON.parse(stored);
            this.targetLocation = data.targetLocation;
            this.customPassword = data.customPassword;
            
            // Video dosyası local storage'da saklanamaz, sadece dosya adı
            if (data.videoFileName && data.videoFileName === 'dmask.mp4') {
                // Proje klasöründeki dmask.mp4 dosyasını kullan
                this.videoFile = new File([], 'dmask.mp4', { type: 'video/mp4' });
            }
        }
    }

    checkAdminData() {
        // Yönetici uyarısı kaldırıldı - sadece console'da bilgi ver
        const hasLocation = this.targetLocation && this.targetLocation.lat && this.targetLocation.lng;
        const hasVideo = this.videoFile;
        const hasPassword = this.customPassword;
        
        if (!hasLocation || !hasVideo || !hasPassword) {
            console.log('Yönetici bilgileri eksik:', {
                location: hasLocation,
                video: hasVideo,
                password: hasPassword
            });
        }
    }

    async saveData() {
        try {
            // Veri klasörüne kaydet
            const formData = new FormData();
            formData.append('targetLocation', JSON.stringify(this.targetLocation));
            formData.append('customPassword', this.customPassword);
            
            if (this.videoFile) {
                formData.append('videoFile', this.videoFile);
            }
            
            const response = await fetch('/save-data', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Veri kaydedilemedi');
            }
            
            this.showNotification('Veriler başarıyla kaydedildi!', 'success');
            
        } catch (error) {
            console.error('Veri kaydetme hatası:', error);
            // Fallback olarak localStorage kullan
            const data = {
                targetLocation: this.targetLocation,
                customPassword: this.customPassword,
                videoFileName: this.videoFile ? this.videoFile.name : null
            };
            localStorage.setItem('romanticSurprise', JSON.stringify(data));
            this.showNotification('Veriler local storage\'a kaydedildi (dosya sistemi hatası)', 'warning');
        }
    }

    handleVideoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            // Video dosya türünü kontrol et
            if (!file.type.startsWith('video/')) {
                this.showNotification('Lütfen geçerli bir video dosyası seçin', 'error');
                return;
            }
            
            // Dosya boyutunu kontrol et (100MB limit)
            const maxSize = 100 * 1024 * 1024; // 100MB
            if (file.size > maxSize) {
                this.showNotification('Video dosyası çok büyük. Maksimum 100MB olmalı.', 'error');
                return;
            }
            
            this.videoFile = file;
            
            // Video bilgisini güncelle
            const videoInfo = document.getElementById('video-info');
            videoInfo.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <strong>${file.name}</strong> başarıyla yüklendi (${this.formatFileSize(file.size)})
            `;
            videoInfo.style.background = 'linear-gradient(135deg, #d5f4e6, #a8e6cf)';
            videoInfo.style.color = '#27ae60';
            videoInfo.style.borderLeftColor = '#27ae60';
            
            // Video önizleme ekle
            this.addVideoPreview(file);
            
            this.showNotification('Video dosyası başarıyla yüklendi!', 'success');
        }
    }

    addVideoPreview(file) {
        const videoInfo = document.getElementById('video-info');
        
        // Video önizleme container'ı oluştur
        const previewContainer = document.createElement('div');
        previewContainer.className = 'video-preview-container';
        previewContainer.style.cssText = `
            margin-top: 15px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        
        // Video önizleme elementi
        const video = document.createElement('video');
        video.style.cssText = `
            width: 100%;
            max-width: 300px;
            height: auto;
            border-radius: 8px;
            margin-bottom: 10px;
        `;
        video.controls = true;
        video.muted = true;
        
        // Video source'u ayarla
        const source = document.createElement('source');
        source.src = URL.createObjectURL(file);
        source.type = file.type;
        video.appendChild(source);
        
        // Video yükleme hatası kontrolü
        video.onerror = () => {
            this.showNotification('Video yüklenirken hata oluştu', 'error');
        };
        
        // Video yüklendiğinde
        video.onloadeddata = () => {
            previewContainer.appendChild(video);
        };
        
        // Video bilgileri
        const videoDetails = document.createElement('div');
        videoDetails.style.cssText = `
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.8);
            text-align: center;
        `;
        videoDetails.innerHTML = `
            <p><strong>Dosya Adı:</strong> ${file.name}</p>
            <p><strong>Boyut:</strong> ${this.formatFileSize(file.size)}</p>
            <p><strong>Tür:</strong> ${file.type}</p>
        `;
        
        previewContainer.appendChild(videoDetails);
        videoInfo.appendChild(previewContainer);
    }



    async getCurrentLocation() {
        try {
            this.showNotification('Konum alınıyor...', 'info');
            
            const position = await this.getCurrentPosition();
            const address = await this.reverseGeocode(position.coords.latitude, position.coords.longitude);
            
            document.getElementById('location-input').value = address;
            this.showNotification('Mevcut konum alındı: ' + address, 'success');
            
        } catch (error) {
            this.showNotification('Konum alınamadı: ' + error.message, 'error');
        }
    }

    async useCoordinates() {
        const lat = parseFloat(document.getElementById('latitude-input').value);
        const lng = parseFloat(document.getElementById('longitude-input').value);
        
        if (isNaN(lat) || isNaN(lng)) {
            this.showNotification('Lütfen geçerli koordinatlar girin', 'error');
            return;
        }
        
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            this.showNotification('Koordinatlar geçerli aralıkta değil', 'error');
            return;
        }
        
        try {
            this.showNotification('Koordinatlar işleniyor...', 'info');
            
            // Koordinatlardan adres bul
            const address = await this.reverseGeocode(lat, lng);
            
            // Hedef konumu ayarla
            this.targetLocation = {
                lat: lat,
                lng: lng,
                displayName: address
            };
            
            // Input alanını güncelle
            document.getElementById('location-input').value = address;
            
            // Koordinat girişlerini gizle
            this.toggleCoordinateInputs();
            
            // Verileri kaydet
            await this.saveData();
            
            this.showNotification(`Koordinatlar başarıyla işlendi! 📍\nEnlem: ${lat.toFixed(6)}\nBoylam: ${lng.toFixed(6)}\nAdres: ${address}`, 'success');
            
        } catch (error) {
            this.showNotification('Koordinat işleme hatası: ' + error.message, 'error');
        }
    }

    getGeolocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation desteklenmiyor'));
                return;
            }

            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            });
        });
    }

    async reverseGeocode(lat, lng) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
            const data = await response.json();
            return data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        } catch (error) {
            return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        }
    }

    async geocodeAddress(address) {
        try {
            // Önce Google Maps Geocoding API ile dene
            if (window.google && window.google.maps) {
                const geocoder = new google.maps.Geocoder();
                
                return new Promise((resolve, reject) => {
                    geocoder.geocode({ address: address + ', Turkey' }, (results, status) => {
                        if (status === 'OK' && results[0]) {
                            const location = results[0].geometry.location;
                            resolve({
                                lat: location.lat(),
                                lng: location.lng(),
                                displayName: results[0].formatted_address
                            });
                        } else {
                            // Google Maps başarısız olursa OpenStreetMap ile dene
                            this.fallbackGeocoding(address).then(resolve).catch(reject);
                        }
                    });
                });
            } else {
                // Google Maps yüklenmemişse OpenStreetMap ile dene
                return await this.fallbackGeocoding(address);
            }
        } catch (error) {
            throw new Error('Geocoding hatası: ' + error.message);
        }
    }

    async fallbackGeocoding(address) {
        try {
            // OpenStreetMap ile geocoding
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', Turkey')}&limit=1&countrycodes=tr&addressdetails=1`);
            const data = await response.json();
            
            if (data.length > 0) {
                return {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon),
                    displayName: data[0].display_name
                };
            }
            
            // Daha genel arama
            const generalResponse = await fetch(`https://nominatim.openstreetMap.org/search?format=json&q=${encodeURIComponent(address.split(',')[0] + ', Turkey')}&limit=1&countrycodes=tr`);
            const generalData = await generalResponse.json();
            
            if (generalData.length > 0) {
                return {
                    lat: parseFloat(generalData[0].lat),
                    lng: parseFloat(generalData[0].lon),
                    displayName: generalData[0].display_name + ' (Yaklaşık konum)'
                };
            }
            
            // Son çare: Gebze, Kocaeli
            const gebzeResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=Gebze,Kocaeli,Turkey&limit=1&countrycodes=tr`);
            const gebzeData = await gebzeResponse.json();
            
            if (gebzeData.length > 0) {
                return {
                    lat: parseFloat(gebzeData[0].lat),
                    lng: parseFloat(gebzeData[0].lon),
                    displayName: 'Gebze, Kocaeli (Genel konum - ' + address + ')'
                };
            }
            
            throw new Error('Adres bulunamadı. Lütfen daha genel bir konum girin (örn: Gebze, Kocaeli)');
        } catch (error) {
            throw new Error('Fallback geocoding hatası: ' + error.message);
            }
        }



    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    async startJourney() {
        const locationInput = document.getElementById('location-input').value.trim();
        const customPassword = document.getElementById('custom-password').value.trim();
        
        if (!locationInput) {
            this.showNotification('Lütfen hedef konumu girin', 'error');
            return;
        }
        
        if (!this.videoFile) {
            this.showNotification('Lütfen video dosyası seçin', 'error');
            return;
        }
        
        if (!customPassword) {
            this.showNotification('Lütfen özel şifreyi girin', 'error');
            return;
        }

        try {
            this.showNotification('Konum işleniyor...', 'info');
            
            // Eğer targetLocation zaten koordinat ile ayarlandıysa, sadece customPassword'u güncelle
            if (!this.targetLocation || this.targetLocation.displayName !== locationInput) {
                // Konum geocoding
                const locationData = await this.geocodeAddress(locationInput);
                this.targetLocation = locationData;
            }
            
            this.customPassword = customPassword;
            
            await this.saveData();
            this.showNotification('Yolculuk ayarları tamamlandı! Aşama 1\'e yönlendiriliyorsunuz...', 'success');
            setTimeout(() => {
                this.showPage('stage1');
                this.checkStage1Data();
            }, 1500);
            
        } catch (error) {
            console.error('Konum işleme hatası:', error);
            this.showNotification('Konum işlenirken hata: ' + error.message, 'error');
            
            // Kullanıcıya alternatif öneriler sun
            if (error.message.includes('bulunamadı')) {
                setTimeout(() => {
                    this.showNotification('İpucu: Sadece "Gebze, Kocaeli" yazmayı deneyin', 'info');
                }, 2000);
            }
        }
    }

    updateLocationDisplay() {
        if (this.targetLocation) {
            document.getElementById('target-location-display').textContent = this.targetLocation.displayName;
            this.updateDistance();
            this.loadMap();
        }
    }

    loadMap() {
        const mapContainer = document.getElementById('map');
        const mapLoading = document.getElementById('map-loading');
        const mapError = document.getElementById('map-error');
        
        // Harita yükleniyor göster
        mapLoading.style.display = 'block';
        mapError.style.display = 'none';
        
        // Platform kontrolü
        const platform = this.detectPlatform();
        console.log('Platform tespit edildi:', platform);
        
        // Google Maps API yüklendi mi kontrol et
        if (window.google && window.google.maps) {
            this.loadGoogleMaps(mapContainer, mapLoading);
        } else {
            // Google Maps yüklenmemişse OpenStreetMap ile başla
            setTimeout(() => {
                if (!window.google) {
                    this.loadOpenStreetMap(mapContainer, mapLoading, mapError);
                }
            }, 2000);
        }
    }

    detectPlatform() {
        const userAgent = navigator.userAgent.toLowerCase();
        let platform = 'Unknown';
        let icon = 'fas fa-desktop';
        
        if (/android/.test(userAgent)) {
            platform = 'Android';
            icon = 'fab fa-android';
        } else if (/iphone|ipad|ipod/.test(userAgent)) {
            platform = 'iOS';
            icon = 'fab fa-apple';
        } else if (/windows/.test(userAgent)) {
            platform = 'Windows';
            icon = 'fab fa-windows';
        } else if (/macintosh|mac os x/.test(userAgent)) {
            platform = 'macOS';
            icon = 'fab fa-apple';
        } else if (/linux/.test(userAgent)) {
            platform = 'Linux';
            icon = 'fab fa-linux';
        }
        
        // Platform bilgisini UI'da göster
        this.updatePlatformInfo(platform, icon);
        
        return platform;
    }

    updatePlatformInfo(platform, icon) {
        const platformInfo = document.getElementById('platform-info');
        const platformText = document.getElementById('platform-text');
        
        if (platformInfo && platformText) {
            platformInfo.innerHTML = `
                <i class="${icon}"></i>
                <span>${platform} - Tam Uyumlu ✅</span>
            `;
            
            // Platform'a göre renk ayarla
            if (platform === 'Android' || platform === 'iOS') {
                platformInfo.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            } else if (platform === 'Windows' || platform === 'macOS') {
                platformInfo.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
            } else {
                platformInfo.style.background = 'linear-gradient(135deg, #9b59b6, #8e44ad)';
            }
        }
    }

    loadGoogleMaps(mapContainer, mapLoading) {
        try {
            // Harita oluştur
            const map = new google.maps.Map(mapContainer, {
                zoom: 15,
                center: { lat: this.targetLocation.lat, lng: this.targetLocation.lng },
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: this.getMapStyles(),
                gestureHandling: 'cooperative', // Mobil uyumlu
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: true
            });
            
            // Hedef konum marker'ı
            new google.maps.Marker({
                position: { lat: this.targetLocation.lat, lng: this.targetLocation.lng },
                map: map,
                title: 'Hedef Konum',
                icon: {
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="18" fill="#e74c3c" stroke="#fff" stroke-width="2"/>
                            <circle cx="20" cy="20" r="8" fill="#fff"/>
                            <path d="M20 8 L20 32 M8 20 L32 20" stroke="#e74c3c" stroke-width="2"/>
                        </svg>
                    `),
                    scaledSize: new google.maps.Size(40, 40)
                }
            });
            
            // Harita yüklendi
            mapLoading.style.display = 'none';
            mapContainer.style.background = 'none';
            mapContainer.innerHTML = '';
            mapContainer.appendChild(map.getDiv());
            
            // Harita referansını sakla
            this._currentMap = map;
            this._mapType = 'google';
            
            this.showNotification('Google Maps haritası yüklendi! 🗺️', 'success');
            
        } catch (error) {
            console.error('Google Maps yükleme hatası:', error);
            this.loadOpenStreetMap(mapContainer, mapLoading, document.getElementById('map-error'));
        }
    }

    loadOpenStreetMap(mapContainer, mapLoading, mapError) {
        try {
            // OpenStreetMap ile harita oluştur
            const mapDiv = document.createElement('div');
            mapDiv.style.width = '100%';
            mapDiv.style.height = '300px';
            mapDiv.style.borderRadius = '15px';
            mapDiv.style.overflow = 'hidden';
            
            // Leaflet CSS ve JS yükle (eğer yoksa)
            this.loadLeafletResources().then(() => {
                // Harita oluştur
                const map = L.map(mapDiv).setView([this.targetLocation.lat, this.targetLocation.lng], 15);
                
                // OpenStreetMap tile layer
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors',
                    maxZoom: 19
                }).addTo(map);
                
                // Hedef konum marker'ı
                const customIcon = L.divIcon({
                    html: '<div style="background: #e74c3c; width: 40px; height: 40px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">📍</div>',
                    className: 'custom-marker',
                    iconSize: [40, 40],
                    iconAnchor: [20, 40]
                });
                
                L.marker([this.targetLocation.lat, this.targetLocation.lng], { icon: customIcon })
                    .addTo(map)
                    .bindPopup('<b>Hedef Konum</b><br>' + this.targetLocation.displayName);
                
                // Harita yüklendi
                mapLoading.style.display = 'none';
                mapContainer.style.background = 'none';
                mapContainer.innerHTML = '';
                mapContainer.appendChild(mapDiv);
                
                // Harita referansını sakla
                this._currentMap = map;
                this._mapType = 'leaflet';
                
                // Harita boyutunu düzelt
                setTimeout(() => {
                    map.invalidateSize();
                    map.setView([this.targetLocation.lat, this.targetLocation.lng], 15, { animate: false });
                }, 100);
                
                this.showNotification('OpenStreetMap haritası yüklendi! 🗺️', 'success');
                
            }).catch(error => {
                console.error('Leaflet yükleme hatası:', error);
                this.showSimpleMap(mapContainer, mapLoading, mapError);
            });
            
        } catch (error) {
            console.error('OpenStreetMap yükleme hatası:', error);
            this.showSimpleMap(mapContainer, mapLoading, mapError);
        }
    }

    async loadLeafletResources() {
        return new Promise((resolve, reject) => {
            // Leaflet CSS yükle
            if (!document.querySelector('link[href*="leaflet"]')) {
                const leafletCSS = document.createElement('link');
                leafletCSS.rel = 'stylesheet';
                leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                leafletCSS.onload = () => {
                    // Leaflet JS yükle
                    if (!window.L) {
                        const leafletJS = document.createElement('script');
                        leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                        leafletJS.onload = resolve;
                        leafletJS.onerror = reject;
                        document.head.appendChild(leafletJS);
                    } else {
                        resolve();
                    }
                };
                leafletCSS.onerror = reject;
                document.head.appendChild(leafletCSS);
            } else {
                resolve();
            }
        });
    }

    showSimpleMap(mapContainer, mapLoading, mapError) {
        mapLoading.style.display = 'none';
        mapError.style.display = 'block';
        
        // Basit harita gösterimi
        mapContainer.innerHTML = `
            <div class="simple-map">
                <div class="map-info">
                    <h4><i class="fas fa-map-marker-alt"></i> Hedef Konum</h4>
                    <p><strong>${this.targetLocation.displayName}</strong></p>
                    <p><small>Koordinatlar: ${this.targetLocation.lat.toFixed(6)}, ${this.targetLocation.lng.toFixed(6)}</small></p>
                </div>
                <div class="map-actions">
                    <button onclick="window.open('https://www.google.com/maps?q=${this.targetLocation.lat},${this.targetLocation.lng}', '_blank')" class="btn btn-small">
                        <i class="fab fa-google"></i> Google Maps'te Aç
                    </button>
                    <button onclick="window.open('https://www.openstreetmap.org/?mlat=${this.targetLocation.lat}&mlon=${this.targetLocation.lng}&zoom=15', '_blank')" class="btn btn-small">
                        <i class="fas fa-map"></i> OpenStreetMap'te Aç
                    </button>
                </div>
            </div>
        `;
        
        this.showNotification('Basit harita gösterimi kullanılıyor', 'info');
    }



    getMapStyles() {
        return [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            },
            {
                featureType: 'transit',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ];
    }

    updateDistance() {
        if (this.currentLocation && this.targetLocation) {
            console.log('Mesafe güncelleniyor...');
            console.log('Mevcut konum:', this.currentLocation);
            console.log('Hedef konum:', this.targetLocation);
            
            const distance = this.calculateDistance(
                this.currentLocation.lat, this.currentLocation.lng,
                this.targetLocation.lat, this.targetLocation.lng
            );
            
            document.getElementById('current-distance').textContent = 
                `${distance.toFixed(2)} km uzaklıkta`;
                
            // Eğer mesafe çok büyükse uyarı ver
            if (distance > 100) {
                document.getElementById('current-distance').innerHTML = 
                    `<span style="color: #e74c3c;">${distance.toFixed(2)} km uzaklıkta (Koordinat hatası olabilir)</span>`;
            }
            
            // Navigasyon butonlarını göster
            document.getElementById('navigation-actions').style.display = 'block';
        } else {
            // Konum bilgisi yoksa da navigasyon butonlarını göster (sadece hedef konum varsa)
            if (this.targetLocation) {
                document.getElementById('navigation-actions').style.display = 'block';
            }
        }
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        // Koordinatları kontrol et
        if (!lat1 || !lon1 || !lat2 || !lon2) {
            console.error('Geçersiz koordinatlar:', { lat1, lon1, lat2, lon2 });
            return 999; // Çok büyük mesafe döndür
        }
        
        // Koordinatları sayıya çevir
        lat1 = parseFloat(lat1);
        lon1 = parseFloat(lon1);
        lat2 = parseFloat(lat2);
        lon2 = parseFloat(lon2);
        
        // Koordinat aralıklarını kontrol et
        if (lat1 < -90 || lat1 > 90 || lat2 < -90 || lat2 > 90 ||
            lon1 < -180 || lon1 > 180 || lon2 < -180 || lon2 > 180) {
            console.error('Koordinat aralığı dışında:', { lat1, lon1, lat2, lon2 });
            return 999;
        }
        
        const R = 6371; // Dünya'nın yarıçapı (km)
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        
        console.log('Mesafe hesaplama detayları:', {
            lat1, lon1, lat2, lon2,
            dLat: dLat * (180/Math.PI),
            dLon: dLon * (180/Math.PI),
            distance
        });
        
        return distance;
    }

    deg2rad(deg) {
        return deg * (Math.PI/180);
    }

    openGoogleMaps() {
        if (this.targetLocation) {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${this.targetLocation.lat},${this.targetLocation.lng}&travelmode=driving`;
            window.open(url, '_blank');
            this.showNotification('Google Maps açılıyor...', 'info');
        }
    }

    openAppleMaps() {
        if (this.targetLocation) {
            const url = `http://maps.apple.com/?daddr=${this.targetLocation.lat},${this.targetLocation.lng}&dirflg=d`;
            window.open(url, '_blank');
            this.showNotification('Apple Maps açılıyor...', 'info');
        }
    }

    copyCoordinates() {
        if (this.targetLocation) {
            const coordinates = `${this.targetLocation.lat}, ${this.targetLocation.lng}`;
            navigator.clipboard.writeText(coordinates).then(() => {
                this.showNotification('Koordinatlar kopyalandı!', 'success');
            }).catch(() => {
                this.showNotification('Koordinatlar kopyalanamadı', 'error');
            });
        }
    }

    generateRandomPassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    async checkLocation() {
        if (!this.currentLocation) {
            try {
                const position = await this.getGeolocation();
                this.currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                console.log('Yeni konum alındı:', this.currentLocation);
            } catch (error) {
                this.showNotification('Mevcut konum alınamadı', 'error');
                return;
            }
        }

        // Konum bilgilerini kontrol et
        if (!this.targetLocation || !this.targetLocation.lat || !this.targetLocation.lng) {
            this.showNotification('Hedef konum bilgisi eksik. Lütfen ayarlar sayfasına geri dönün.', 'error');
            return;
        }

        console.log('Konum kontrolü başlatılıyor...');
        console.log('Mevcut konum:', this.currentLocation);
        console.log('Hedef konum:', this.targetLocation);

        this.showPage('stage2');
        this.startLocationVerification();
    }

    async startLocationVerification() {
        const spinner = document.getElementById('verification-spinner');
        const result = document.getElementById('verification-result');
        
        // Debug bilgileri
        console.log('Mevcut konum:', this.currentLocation);
        console.log('Hedef konum:', this.targetLocation);
        
        // Konum doğrulama başlat
        try {
            // GPS hassasiyetini kontrol et
            const accuracy = await this.checkGPSAccuracy();
            
            if (accuracy > 100) {
                // GPS hassasiyeti düşük, uyarı ver
                this.showNotification('GPS hassasiyeti düşük. Daha iyi sinyal için açık alanda bekleyin.', 'warning');
            }
            
            // Konum doğrulama süreci
            await this.delay(2000);
            
            const distance = this.calculateDistance(
                this.currentLocation.lat, this.currentLocation.lng,
                this.targetLocation.lat, this.targetLocation.lng
            );

            console.log('Hesaplanan mesafe:', distance, 'km');
            console.log('GPS hassasiyeti:', accuracy, 'metre');

            spinner.style.display = 'none';
            result.style.display = 'block';

            if (distance <= 5) {
                // Başarılı - şifreyi göster
                this.showSuccessVerification();
            } else {
                // Başarısız - detaylı bilgi göster
                this.showFailedVerification(distance, accuracy);
            }
            
        } catch (error) {
            console.error('Konum doğrulama hatası:', error);
            this.showVerificationError(error);
        }
    }

    async checkGPSAccuracy() {
        return new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => resolve(position.coords.accuracy || 50),
                    () => resolve(100), // Hata durumunda varsayılan değer
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                );
            } else {
                resolve(100);
            }
        });
    }

    showSuccessVerification() {
        const result = document.getElementById('verification-result');
        result.innerHTML = `
            <div class="result-icon">
                <i class="fas fa-check-circle success-icon"></i>
            </div>
            <h3>Konum Doğrulandı! 🎉</h3>
            <p>Hedef konumun 5 km yakınındasınız.</p>
            <div class="verification-details">
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Hedef: ${this.targetLocation.displayName}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-ruler"></i>
                    <span>Mesafe: ${this.calculateDistance(
                        this.currentLocation.lat, this.currentLocation.lng,
                        this.targetLocation.lat, this.targetLocation.lng
                    ).toFixed(2)} km</span>
                </div>
            </div>
            <div class="password-reveal">
                <h4>Aşama 3 Şifresi:</h4>
                <div class="password-box">
                    <span id="stage3-password">${this.stage3Password}</span>
                    <button id="copy-password" class="btn btn-small">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Şifre kopyalama butonunu ekle
        document.getElementById('copy-password').addEventListener('click', () => this.copyPassword());
        
        document.getElementById('proceed-to-stage3').style.display = 'inline-flex';
        this.showNotification('Konum doğrulandı! Aşama 3 şifresi verildi.', 'success');
    }

    showFailedVerification(distance, accuracy) {
        const result = document.getElementById('verification-result');
        result.innerHTML = `
            <div class="result-icon">
                <i class="fas fa-times-circle" style="color: #e74c3c; font-size: 4rem;"></i>
            </div>
            <h3>Konum Doğrulanamadı</h3>
            <p>Hedef konumdan <strong>${distance.toFixed(2)} km</strong> uzaktasınız.</p>
            <p>5 km yakınına gelmeniz gerekiyor.</p>
            
            <div class="verification-details">
                <div class="detail-item">
                    <i class="fas fa-crosshairs"></i>
                    <span>GPS Hassasiyeti: ${accuracy.toFixed(0)} metre</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Hedef: ${this.targetLocation.displayName}</span>
                </div>
            </div>
            
            <div class="debug-info" style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 15px; font-size: 0.9rem; text-align: left;">
                <strong>Detaylı Bilgiler:</strong><br>
                <strong>Mevcut Konum:</strong> ${this.currentLocation.lat.toFixed(6)}, ${this.currentLocation.lng.toFixed(6)}<br>
                <strong>Hedef Konum:</strong> ${this.targetLocation.lat.toFixed(6)}, ${this.targetLocation.lng.toFixed(6)}<br>
                <strong>Hesaplanan Mesafe:</strong> ${distance.toFixed(2)} km<br>
                <strong>GPS Hassasiyeti:</strong> ${accuracy.toFixed(0)} metre
            </div>
            
            <div class="verification-actions" style="margin-top: 20px;">
                <button id="manual-verify" class="btn btn-primary">
                    <i class="fas fa-check"></i> Manuel Doğrula
                </button>
                <button id="retry-location" class="btn btn-secondary" style="margin-left: 10px;">
                    <i class="fas fa-redo"></i> Konumu Tekrar Al
                </button>
            </div>
        `;
        
        // Manuel doğrulama butonu ekle
        document.getElementById('manual-verify').addEventListener('click', () => this.manualVerification());
        
        // Konumu tekrar al butonu ekle
        document.getElementById('retry-location').addEventListener('click', () => this.retryLocation());
        
        document.getElementById('proceed-to-stage3').style.display = 'none';
    }

    showVerificationError(error) {
        const result = document.getElementById('verification-result');
        result.innerHTML = `
            <div class="result-icon">
                <i class="fas fa-exclamation-triangle" style="color: #f39c12; font-size: 4rem;"></i>
            </div>
            <h3>Konum Doğrulama Hatası</h3>
            <p>Konum kontrol edilirken bir hata oluştu.</p>
            <div class="error-details">
                <p><strong>Hata:</strong> ${error.message}</p>
            </div>
            <div class="verification-actions" style="margin-top: 20px;">
                <button id="manual-verify" class="btn btn-primary">
                    <i class="fas fa-check"></i> Manuel Doğrula
                </button>
                <button id="retry-verification" class="btn btn-secondary" style="margin-left: 10px;">
                    <i class="fas fa-redo"></i> Tekrar Dene
                </button>
            </div>
        `;
        
        // Manuel doğrulama butonu ekle
        document.getElementById('manual-verify').addEventListener('click', () => this.manualVerification());
        
        // Tekrar dene butonu ekle
        document.getElementById('retry-verification').addEventListener('click', () => this.startLocationVerification());
        
        document.getElementById('proceed-to-stage3').style.display = 'none';
    }

    async retryLocation() {
        try {
            this.showNotification('Konum yeniden alınıyor...', 'info');
            const position = await this.getGeolocation();
            this.currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            this.showNotification('Yeni konum alındı!', 'success');
            this.startLocationVerification();
            
        } catch (error) {
            this.showNotification('Konum alınamadı: ' + error.message, 'error');
        }
    }

    unlockVideo() {
        const stage3Password = document.getElementById('stage3-password-input').value;
        const customPassword = document.getElementById('custom-password-input').value;

        if (stage3Password === this.stage3Password && customPassword === this.customPassword) {
            // Her iki şifre de doğru, videoyu aç
            this.openVideo();
        } else {
            this.showNotification('Şifreler yanlış!', 'error');
        }
    }

    showRomanticIntroMessage() {
        // Şifre formunu gizle
        document.querySelector('.password-form').style.display = 'none';
        
        // Romantik giriş mesajı göster
        const romanticIntro = document.createElement('div');
        romanticIntro.className = 'romantic-intro-message';
        romanticIntro.innerHTML = `
            <div class="romantic-intro-content">
                <div class="romantic-heart">
                    <i class="fas fa-heart"></i>
                </div>
                <h2>Hayatımın Aşkı</h2>
                <p class="romantic-text">
                    Seninle geçirdiğim her an, hayatımın en değerli hazinesi. 
                    Bugün, yeni bir başlangıç için özel bir an yaşayacağız.
                </p>
                <p class="romantic-text">
                    <strong>Yeni hayatınıza bağlamak için özel şifreyi kutuya giriniz:</strong>
                </p>
                <div class="system-password-display">
                    <h3>Sistemdeki Özel Şifre:</h3>
                    <div class="password-box-large">
                        <span id="system-password">${this.customPassword}</span>
                        <button id="copy-system-password" class="btn btn-small">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
                <button id="continue-to-video" class="btn btn-primary btn-large">
                    <i class="fas fa-play"></i> Videoyu İzle
                </button>
            </div>
        `;
        
        document.querySelector('.page-content').appendChild(romanticIntro);
        
        // Kopyalama butonunu ekle
        document.getElementById('copy-system-password').addEventListener('click', () => {
            navigator.clipboard.writeText(this.customPassword).then(() => {
                this.showNotification('Şifre kopyalandı!', 'success');
            });
        });
        
        // Videoyu izle butonunu ekle
        document.getElementById('continue-to-video').addEventListener('click', () => {
            romanticIntro.remove();
            this.openVideo();
        });
    }

    // Bluetooth kontrolü artık gerekli değil - video doğrudan açılıyor
    // checkBluetoothBeforeVideo() {
    //     // Bluetooth destekleniyor mu kontrol et
    //     if (!navigator.bluetooth) {
    //         this.showNotification('Bluetooth desteklenmiyor. Video açılıyor ama Arduino sinyali gönderilemeyecek.', 'warning');
    //         this.openVideo();
    //         return;
    //     }

    //     // Bluetooth açık mı kontrol et
    //     navigator.bluetooth.getAvailability().then(available => {
    //         if (available) {
    //         this.showNotification('Bluetooth hazır! Video açılıyor...', 'success');
    //         this.openVideo();
    //         } else {
    //         this.showNotification('Bluetooth kapalı! Lütfen Bluetooth\'u açın.', 'error');
    //         this.showBluetoothWarning();
    //         }
    //     }).catch(() => {
    //         this.showNotification('Bluetooth durumu kontrol edilemiyor. Video açılıyor...', 'warning');
    //         this.openVideo();
    //         });
    // }

    // Bluetooth uyarısı artık gerekli değil
    // showBluetoothWarning() {
    //     const warningDiv = document.createElement('div');
    //     warningDiv.className = 'bluetooth-warning';
    //     warningDiv.innerHTML = `
    //         <div style="background: #fff3cd; color: #856404; padding: 20px; border-radius: 12px; border: 2px solid #ffeaa7; margin: 20px 0; text-align: center;">
    //             <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 15px;"></i>
    //             <h4>Bluetooth Gerekli!</h4>
    //             <p>Video oynatıldıktan sonra Arduino'ya sinyal gönderilecek. Lütfen Bluetooth'u açın.</p>
    //             <button id="retry-bluetooth" class="btn btn-primary" style="margin-top: 15px;">
    //             <i class="fas fa-bluetooth"></i> Bluetooth Kontrol Et
    //             </button>
    //             <button id="continue-without-bluetooth" class="btn btn-secondary" style="margin-top: 15px; margin-left: 10px;">
    //             <i class="fas fa-play"></i> Videoyu Aç
    //             </button>
    //         </div>
    //     `;
        
    //     document.querySelector('.password-form').appendChild(warningDiv);
        
    //     // Event listener'ları ekle
    //     document.getElementById('retry-bluetooth').addEventListener('click', () => {
    //         warningDiv.remove();
    //         this.checkBluetoothBeforeVideo();
    //         });
        
    //     document.getElementById('continue-without-bluetooth').addEventListener('click', () => {
    //         warningDiv.remove();
    //         this.openVideo();
    //         });
    // }

    openVideo() {
        // Video container'ı göster
        document.getElementById('video-container').style.display = 'block';
        
        // Video source'u ayarla
        const videoSource = document.getElementById('video-source');
        const video = document.getElementById('romantic-video');
        
        if (this.videoFile) {
            // Yüklenen video dosyasını kullan
            const videoUrl = URL.createObjectURL(this.videoFile);
            videoSource.src = videoUrl;
            video.load();
            
            this.showNotification('Video başarıyla açıldı!', 'success');
            
            // Video kontrollerini basitleştir
            this.updateVideoControls();
        }
    }

    updateVideoControls() {
        const videoControls = document.querySelector('.video-controls');
        
        // Sadece video bilgisi göster, buton yok
        videoControls.innerHTML = `
            <div class="video-info">
                <i class="fas fa-play"></i> Video oynatılıyor...
            </div>
        `;
    }

    // Bluetooth durumu kontrolü artık gerekli değil
    // updateVideoBluetoothStatus() {
    //     const videoControls = document.querySelector('.video-controls');
        
    //     if (this.isConnected) {
    //         // Bağlantı var
    //         let connectionInfo = '';
    //         if (this.bluetoothDevice) {
    //         connectionInfo = `Bluetooth: ${this.bluetoothDevice.name}`;
    //         } else if (this.serialPort) {
    //         connectionInfo = `USB: Arduino`;
    //         }
            
    //         // Bağlantı türüne göre CSS sınıfı belirle
    //         let connectionClass = '';
    //         if (this.bluetoothDevice) {
    //         connectionClass = 'connection-bluetooth';
    //         } else if (this.serialPort) {
    //         connectionClass = 'connection-usb';
    //         }
            
    //         videoControls.innerHTML = `
    //         <div class="bluetooth-status-video ${connectionClass}">
    //             <i class="fas fa-link"></i> Bağlı: ${connectionInfo}
    //         </div>
    //         <button id="send-arduino-signal" class="btn btn-success">
    //             <i class="fas fa-paper-plane"></i> Arduino'ya Sinyal Gönder
    //         </button>
    //         `;
    //         } else {
    //         // Bağlantı yok
    //         videoControls.innerHTML = `
    //         <div class="bluetooth-status-video connection-waiting">
    //             <i class="ls fa-exclamation-triangle"></i> Bağlantı bekleniyor...
    //         </div>
    //         <button id="send-arduino-signal" class="btn btn-success" style="display: none;">
    //             <i class="fas fa-paper-plane"></i> Arduino'ya Sinyal Gönder
    //         </button>
    //         <button id="connect-bluetooth-video" class="btn btn-primary">
    //             <i class="fas fa-bluetooth"></i> Bluetooth Bağlan
    //         </button>
    //         <button id="connect-serial-video" class="btn btn-success">
    //             <i class         <button id="connect-serial-video" class="btn btn-success">
    //             <i class="fas fa-usb"></i> USB Bağlan
    //         </button>
    //         `;
            
    //         // Video sayfasındaki bağlantı butonlarını ekle
    //         const bluetoothBtn = document.getElementById('connect-bluetooth-video');
    //         const serialBtn = document.getElementById('connect-serial-video');
            
    //         if (bluetoothBtn) {
    //         bluetoothBtn.addEventListener('click', () => this.connectBluetooth());
    //         }
    //         if (serialBtn) {
    //         bluetoothBtn.addEventListener('click', () => this.connectBluetooth());
    //         }
    //         if (serialBtn) {
    //         serialBtn.addEventListener('click', () => this.connectSerial());
    //         }
    //         }
        
    //         // Arduino sinyali gönder butonunu ekle
    //         const sendSignalBtn = document.getElementById('send-arduino-signal');
    //         if (sendSignalBtn) {
    //         sendSignalBtn.addEventListener('click', () => this.sendArduinoSignal());
    //         }
    //         }
    // }

    onVideoEnded() {
        // Video bittiğinde 4. aşamaya geç
        this.showPage('stage4');
        this.setupStage4();
    }

    setupStage4() {
        // Final şifreyi göster
        document.getElementById('final-password-display').textContent = this.customPassword;
        
        // Kopyalama butonunu ekle
        document.getElementById('copy-final-password-btn').addEventListener('click', () => {
            navigator.clipboard.writeText(this.customPassword).then(() => {
                this.showNotification('Şifre kopyalandı!', 'success');
            });
        });
        
        // Geri butonunu ekle
        document.getElementById('back-to-stage3').addEventListener('click', () => {
            this.showPage('stage3');
        });
    }
    
    showRomanticMessage() {
        // Video container'ı gizle
        document.getElementById('video-container').style.display = 'none';
        
        // Romantik mesaj container'ı oluştur
        const romanticContainer = document.createElement('div');
        romanticContainer.className = 'romantic-message-container';
        romanticContainer.innerHTML = `
            <div class="romantic-content">
                <div class="romantic-title">
                    <i class="fas fa-heart"></i>
                    <h2>Romantik</h2>
                </div>
                
                <div class="password-display">
                    <h3>Yeni bir başlangıç için şifreyi giriniz:</h3>
                    <div class="password-box">
                        <span id="final-password">${this.customPassword}</span>
                        <button id="copy-final-password" class="btn btn-small">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
                
                <div class="arduino-instructions">
                    <h4>Arduino Keypad Talimatları:</h4>
                    <ul>
                        <li>4x4 Keypad'den <strong>${this.customPassword}</strong> şifresini girin</li>
                        <li><strong>#</strong> tuşu ile onaylayın</li>
                        <li><strong>*</strong> tuşu ile temizleyin</li>
                        <li>Doğru şifre girildiğinde servo motor dönecek!</li>
                    </ul>
                </div>
                
                <div class="arduino-status">
                    <i class="fas fa-microchip"></i>
                    <span>Arduino keypad bağlantısı bekleniyor...</span>
                </div>
            </div>
        `;
        
        // Container'ı sayfaya ekle
        document.querySelector('.page-content').appendChild(romanticContainer);
        
        // Şifre kopyalama butonunu ekle
        document.getElementById('copy-final-password').addEventListener('click', () => {
            navigator.clipboard.writeText(this.customPassword).then(() => {
                this.showNotification('Şifre kopyalandı!', 'success');
            }).catch(() => {
                this.showNotification('Şifre kopyalanamadı', 'error');
            });
        });
        
        // Romantik animasyonları başlat
        this.startRomanticAnimations();
        
        this.showNotification('Video tamamlandı! Şifre hazır 💕', 'success');
    }
    
    startRomanticAnimations() {
        // Kalp animasyonları
        setInterval(() => {
            this.createFloatingHeart();
        }, 2000);
        
        // Başlık kalp atışı
        const title = document.querySelector('.romantic-title h2');
        if (title) {
            setInterval(() => {
                title.classList.add('heartbeat');
                setTimeout(() => {
                    title.classList.remove('heartbeat');
                }, 1500);
            }, 3000);
        }
    }





    // Web Serial API ile USB bağlantısı
    async connectSerial() {
        try {
            if (!navigator.serial) {
                throw new Error('Web Serial API desteklenmiyor. Chrome/Edge kullanın.');
            }

            // Port seçimi
            this.serialPort = await navigator.serial.requestPort();
            
            // Port ayarları (Arduino ile uyumlu)
            await this.serialPort.open({ 
                baudRate: 9600,
                dataBits: 8,
                stopBits: 1,
                parity: 'none',
                flowControl: 'none'
            });

            // Reader ve Writer oluştur
            this.serialReader = this.serialPort.readable.getReader();
            this.serialWriter = this.serialPort.writable.getWriter();

            this.isConnected = true;
            document.getElementById('send-arduino-signal').style.display = 'block';
            this.updateBluetoothStatus('USB Bağlı: ' + this.serialPort.getInfo().usbProductId);
            this.showNotification('USB bağlantısı başarılı!', 'success');
            
            // Eğer video sayfasındaysak, durumu güncelle
            if (this.currentStage === 'stage3') {
                this.updateVideoBluetoothStatus();
            }

            // Veri okuma döngüsü başlat
            this.readSerialData();

        } catch (error) {
            if (error.name === 'NotFoundError') {
                this.showNotification('Port seçimi iptal edildi', 'warning');
            } else {
                this.showNotification('USB bağlantı hatası: ' + error.message, 'error');
            }
        }
    }

    // Serial veri okuma
    async readSerialData() {
        try {
            while (this.serialPort && this.serialReader) {
                const { value, done } = await this.serialReader.read();
                if (done) break;
                
                // Gelen veriyi işle
                const data = new TextDecoder().decode(value);
                console.log('Arduino\'dan gelen:', data);
                
                // Romantik mod mesajı geldi mi kontrol et
                if (data.includes('ROMANTIK_MODE_ACTIVE')) {
                    this.showNotification('Arduino romantik modu aktif etti! 💕', 'success');
                }
            }
        } catch (error) {
            console.error('Serial okuma hatası:', error);
        }
    }

    // USB üzerinden Arduino'ya sinyal gönder
    async sendArduinoSignalUSB() {
        if (!this.isConnected || !this.serialWriter) {
            this.showNotification('Önce USB bağlantısı kurun', 'error');
            return;
        }

        try {
            // Arduino'ya "1" gönder
            const data = new TextEncoder().encode('1\n');
            await this.serialWriter.write(data);
            
            this.showNotification('Arduino sinyali USB üzerinden gönderildi! 💕', 'success');
            
        } catch (error) {
            this.showNotification('Sinyal gönderilemedi: ' + error.message, 'error');
        }
    }

    // Arduino'ya sinyal gönder (WebSocket öncelikli)
    // Arduino'ya sinyal gönder (artık gerekli değil - keypad kullanılıyor)
    async sendArduinoSignal() {
        this.showNotification('Şifreyi Arduino keypad\'den girin!', 'info');
    }

    // Bluetooth üzerinden sinyal gönder (eski yöntem)
    async sendArduinoSignalBluetooth() {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode('1');
            
            const server = await this.bluetoothDevice.gatt.connect();
            const service = await server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb');
            const characteristic = await service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb');
            
            await characteristic.writeValue(data);
            
            this.showNotification('Arduino sinyali Bluetooth ile gönderildi!', 'success');
            
        } catch (error) {
            this.showNotification('Bluetooth sinyal hatası: ' + error.message, 'error');
        }
    }

    async disconnectBluetooth() {
        if (this.bluetoothDevice && this.isConnected) {
            this.bluetoothDevice.gatt.disconnect();
            this.isConnected = false;
            this.bluetoothDevice = null;
            this.updateBluetoothStatus('Bağlantı kesildi');
            document.getElementById('send-arduino-signal').style.display = 'none';
            this.showNotification('Bluetooth bağlantısı kesildi', 'info');
            
            // Eğer video sayfasındaysak, Bluetooth durumunu güncelle
            if (this.currentStage === 'stage3') {
                this.updateVideoBluetoothStatus();
            }
        }
        
        // USB bağlantısını da kes
        if (this.serialPort && this.isConnected) {
            try {
                if (this.serialReader) {
                    this.serialReader.releaseLock();
                    this.serialReader = null;
                }
                if (this.serialWriter) {
                    this.serialWriter.releaseLock();
                    this.serialWriter = null;
                }
                await this.serialPort.close();
                this.serialPort = null;
                this.isConnected = false;
                this.updateBluetoothStatus('USB bağlantısı kesildi');
                document.getElementById('send-arduino-signal').style.display = 'none';
                this.showNotification('USB bağlantısı kesildi', 'info');
                
                if (this.currentStage === 'stage3') {
                    this.updateVideoBluetoothStatus();
                }
            } catch (error) {
                console.error('USB bağlantısı kesme hatası:', error);
            }
        }
    }

    updateBluetoothStatus(status) {
        document.getElementById('connection-status').textContent = status;
    }

    copyPassword() {
        navigator.clipboard.writeText(this.stage3Password).then(() => {
            this.showNotification('Şifre kopyalandı!', 'success');
        }).catch(() => {
            this.showNotification('Şifre kopyalanamadı', 'error');
        });
    }

    showPage(pageName) {
        // Tüm sayfaları gizle
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // İstenen sayfayı göster
        document.getElementById(pageName + '-page').classList.add('active');
        this.currentStage = pageName;
        
        // Sayfa değişiminde güncellemeler
        if (pageName === 'stage1') {
            this.updateLocationDisplay();
            // Harita boyutunu düzeltmek için gecikmeli tetikleyiciler
            setTimeout(() => this.ensureMapResized(), 50);
            setTimeout(() => this.ensureMapResized(), 250);
            setTimeout(() => this.ensureMapResized(), 600);
        }
    }

    closeModal() {
        document.getElementById('bluetooth-modal').style.display = 'none';
    }

    showNotification(message, type = 'info') {
        // Basit notification sistemi
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // CSS stilleri ekle
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // 3 saniye sonra kaldır
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'times-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };
        return colors[type] || '#3498db';
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    manualVerification() {
        // Manuel doğrulama - kullanıcı konumda olduğunu onaylıyor
        const result = document.getElementById('verification-result');
        
        result.innerHTML = `
            <div class="result-icon">
                <i class="fas fa-check-circle success-icon"></i>
            </div>
            <h3>Manuel Doğrulama Başarılı!</h3>
            <p>Konumunuz manuel olarak doğrulandı.</p>
            <div class="password-reveal">
                <h4>Aşama 3 Şifresi:</h4>
                <div class="password-box">
                    <span id="stage3-password">${this.stage3Password}</span>
                    <button id="copy-password" class="btn btn-small">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Şifre kopyalama butonunu tekrar ekle
        document.getElementById('copy-password').addEventListener('click', () => this.copyPassword());
        
        // Aşama 3'e geç butonunu göster
        document.getElementById('proceed-to-stage3').style.display = 'inline-flex';
        
        this.showNotification('Manuel doğrulama başarılı! Aşama 3 şifresi verildi.', 'success');
    }

    // WebSocket bağlantısı
    connectWebSocket() {
        try {
            // WebSocket bağlantısı kur
            this.webSocket = new WebSocket('ws://localhost:3000');
            
            this.webSocket.onopen = () => {
                console.log('✅ WebSocket bağlantısı kuruldu');
                this.serverConnected = true;
                this.showNotification('Sunucu bağlantısı kuruldu!', 'success');
                this.updateConnectionStatus();
            };
            
            this.webSocket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.handleWebSocketMessage(data);
                } catch (error) {
                    console.error('WebSocket mesaj parse hatası:', error);
                }
            };
            
            this.webSocket.onclose = () => {
                console.log('❌ WebSocket bağlantısı kesildi');
                this.serverConnected = false;
                this.showNotification('Sunucu bağlantısı kesildi', 'warning');
                this.updateConnectionStatus();
                
                // 5 saniye sonra yeniden bağlan
                setTimeout(() => {
                    if (!this.serverConnected) {
                        this.connectWebSocket();
                    }
                }, 5000);
            };
            
            this.webSocket.onerror = (error) => {
                console.error('WebSocket hatası:', error);
                this.showNotification('Sunucu bağlantı hatası', 'error');
            };
            
        } catch (error) {
            console.error('WebSocket bağlantı hatası:', error);
            this.showNotification('WebSocket desteklenmiyor', 'error');
        }
    }
    
    // WebSocket mesajlarını işle
    handleWebSocketMessage(data) {
        console.log('📨 WebSocket mesajı:', data);
        
        if (data.type === 'arduino_connected') {
            this.showNotification('Arduino bağlandı! 🎉', 'success');
            this.isConnected = true;
            this.updateConnectionStatus();
            this.showArduinoStatus(true);
        } else if (data.type === 'status') {
            if (data.message === 'ROMANTIK_MODE_ACTIVE') {
                this.showNotification('Arduino romantik modu aktif etti! 💕', 'success');
            }
        }
    }
    
    // Arduino durumunu göster/gizle
    showArduinoStatus(show) {
        const arduinoStatus = document.getElementById('arduino-status');
        if (arduinoStatus) {
            arduinoStatus.style.display = show ? 'flex' : 'none';
        }
    }
    
    // Bağlantı durumunu güncelle
    updateConnectionStatus() {
        const statusElement = document.getElementById('connection-status');
        const serverStatus = document.querySelector('.server-status');
        
        if (statusElement && serverStatus) {
            if (this.serverConnected) {
                statusElement.textContent = 'Sunucu bağlı';
                serverStatus.className = 'server-status connected';
            } else {
                statusElement.textContent = 'Sunucu bağlantısı bekleniyor...';
                serverStatus.className = 'server-status disconnected';
            }
        }
    }

    ensureMapResized() {
        try {
            if (!this._currentMap || !this.targetLocation) return;
            const lat = this.targetLocation.lat;
            const lng = this.targetLocation.lng;
            
            if (this._mapType === 'google' && window.google && google.maps) {
                google.maps.event.trigger(this._currentMap, 'resize');
                this._currentMap.setCenter({ lat, lng });
            } else if (this._mapType === 'leaflet' && window.L) {
                this._currentMap.invalidateSize();
                this._currentMap.setView([lat, lng], this._currentMap.getZoom() || 15, { animate: false });
            }
        } catch (e) {
            // yoksay
        }
    }

    setupEventListeners() {
        // Sadece mevcut olan elementlere event listener ekle
        const startJourneyBtn = document.getElementById('start-journey-btn');
        if (startJourneyBtn) {
            startJourneyBtn.addEventListener('click', () => this.startJourney());
        }
        
        const coordinateToggle = document.getElementById('coordinate-toggle');
        if (coordinateToggle) {
            coordinateToggle.addEventListener('click', () => this.toggleCoordinateInputs());
        }
        
        const currentLocationBtn = document.getElementById('current-location-btn');
        if (currentLocationBtn) {
            currentLocationBtn.addEventListener('click', () => this.getCurrentLocation());
        }
        
        const useCoordinatesBtn = document.getElementById('use-coordinates');
        if (useCoordinatesBtn) {
            useCoordinatesBtn.addEventListener('click', () => this.useCoordinates());
        }
        
        // Video event listener'ları
        const video = document.getElementById('romantic-video');
        if (video) {
            video.addEventListener('ended', () => this.onVideoEnded());
        }
        
        // Video yükleme alanı drag & drop desteği
        this.setupVideoDragAndDrop();
    }

    setupVideoDragAndDrop() {
        const uploadArea = document.getElementById('video-upload-area');
        const fileInput = document.getElementById('video-input');
        
        // Drag & drop event listener'ları
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                if (file.type.startsWith('video/')) {
                    // Dosya input'unu güncelle
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    fileInput.files = dataTransfer.files;
                    
                    // Video yükleme işlemini tetikle
                    this.handleVideoUpload({ target: { files: [file] } });
                } else {
                    this.showNotification('Lütfen geçerli bir video dosyası sürükleyin', 'error');
                }
            }
        });
        
        // Tıklama ile dosya seçimi
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
    }

    toggleCoordinateInputs() {
        const coordinateInputs = document.getElementById('coordinate-inputs');
        const coordinateToggle = document.getElementById('coordinate-toggle');
        
        if (coordinateInputs.style.display === 'none') {
            coordinateInputs.style.display = 'block';
            coordinateToggle.innerHTML = '<i class="fas fa-times"></i> Koordinat Gizle';
            coordinateToggle.classList.add('active');
        } else {
            coordinateInputs.style.display = 'none';
            coordinateToggle.innerHTML = '<i class="fas fa-crosshairs"></i> Koordinat Gir';
            coordinateToggle.classList.remove('active');
        }
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation desteklenmiyor'));
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                }
            );
        });
    }
}

// CSS animasyonları ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Google Maps API callback fonksiyonu
window.initMap = function() {
    console.log('✅ Google Maps API yüklendi');
    // Harita yüklendiğinde mevcut konumu güncelle
    if (window.romanticSurprise && window.romanticSurprise.targetLocation) {
        window.romanticSurprise.loadMap();
    }
};

// Sayfa yüklendiğinde uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    window.romanticSurprise = new RomanticSurprise();
});
