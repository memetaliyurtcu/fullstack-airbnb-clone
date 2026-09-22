const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //Veritabanı Yöneticisi
const Ilan = require('./models/Ilan');

const app = express();
require('dotenv').config();
const PORT = 8080;

app.use(cors({
    origin: 'http://localhost:3000'
}));

//Dışarıdan gelen veri paketlerini okuması için
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB Atlas'a başarıyla bağlanıldı."))
    .catch((hata) => console.log("MongoDB Bağlantı Hatası:", hata));

//Bütün ilanları veritabanından çek
app.get('/api/ilanlar', async (req, res) => {
    const tumIlanlar = await Ilan.find();
    res.json(tumIlanlar);
});

//Belirli kategoriyi filtrele
app.get('/api/ilanlar/kategori/:kategoriAd', async (req, res) => {
    const istenenKategori = req.params.kategoriAd.toLowerCase();
    const filtrelenmisIlanlar = await Ilan.find({ kategori: istenenKategori });
    res.json(filtrelenmisIlanlar);
});

// GİZLİ ROTA: Veritabanını ilk evlerle doldurmak için bunu SADECE BİR KERE çalıştıracağız
app.get('/api/veritabanini-doldur', async (req, res) => {
    const baslangicIlanlari = [
        { baslik: "Deniz Manzaralı Lüks Villa", konum: "Bodrum", fiyat: 4500, puan: 4.9, kategori: "villa", resim: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
        { baslik: "Modern Daire", konum: "Şişli", fiyat: 1200, puan: 4.5, kategori: "daire", resim: "https://images.unsplash.com/photo-1502672260266-1c1de2d96642?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
        { baslik: "Sessiz Kabin", konum: "Rize", fiyat: 850, puan: 4.8, kategori: "kabin", resim: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
        { baslik: "Özel Havuzlu Villa", konum: "Kaş", fiyat: 5500, puan: 5.0, kategori: "villa", resim: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" }
    ];

    await Ilan.insertMany(baslangicIlanlari);
    res.send("✅ Veritabanı başarıyla evlerle dolduruldu! Artık ana sayfaya dönebilirsin.");
});

//İlan getirme
app.get('/api/ilanlar/:id', async (req, res) => {
    try {
        const idSifresi = req.params.id;
        const tekIlan = await Ilan.findById(idSifresi);

        if (tekIlan) {
            res.json(tekIlan)
        } else {
            res.status(404).json({ mesaj: "Böyle bir ilan bulunamadı!" });
        }
    } catch (hata) {
        res.status(400).json({ mesaj: "Geçersiz ID formatı", detay: hata.message });
    }
});

//İlan ekleme
app.post('/api/ilanlar', async (req, res) => {
    try {
        const yeniEvVerisi = req.body;
        //MongoDB'ye kayıt
        const kaydedilenIlan = await Ilan.create(yeniEvVerisi);

        res.status(201).json(kaydedilenIlan);
    } catch (hata) {
        res.status(400).json({ mesaj: "İlan eklenirken hata oluştu", detay: hata.message })
    }
});

//Silme işlemi
app.delete('/api/ilanlar/:id', async (req, res) => {
    try {
        const idSifresi = req.params.id;
        const silinenIlan = await Ilan.findByIdAndDelete(idSifresi);

        if (silinenIlan) {
            res.json({ mesaj: "İlan başarıyla silindi" });
        } else {
            res.status(404).json({ mesaj: "Zaten silinmiş veya bulunamadı" });
        }
    } catch (hata) {
        res.status(400).json({ mesaj: "Geçersiz ID", detay: hata.message });
    }
});


app.listen(PORT, () => {
    console.log(`Airbnb API http://localhost:${PORT} adresinde hazır!`);
});