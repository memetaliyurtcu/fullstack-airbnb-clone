const mongoose = require('mongoose');

//Veritabanındaki "İlan" verisinin şeması
const ilanSema = new mongoose.Schema({
    baslik: { type: String, required: true },
    konum: { type: String, required: true },
    fiyat: { type: Number, required: true },
    puan: { type: Number, required: true },
    kategori: { type: String, required: true },
    resim: { type: String, required: true }
});


//Ilan adında bir model oluştur ve dışarı aktar 
module.exports = mongoose.model('Ilan', ilanSema);