"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function YeniEvEkle() {
    const router = useRouter();
    const [hata, setHata] = useState("");

    //Formdaki verileri anlık tutacağımız kutular
    const [formVerisi, setFormVerisi] = useState({
        baslik: "",
        konum: "",
        fiyat: "",
        puan: 5.0,
        kategori: "villa",
        resim: ""
    });

    const handleChange = (e: any) => {
        setFormVerisi({
            ...formVerisi,
            [e.target.name]: e.target.value
        });
    };

    //İlanı yayınla butonuna basıldığında çalışacak fonksiyon
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const cevap = await fetch("http://localhost:8080/api/ilanlar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formVerisi,
                    fiyat: Number(formVerisi.fiyat)
                })
            });
            if (cevap.ok) {
                router.push("/");
                router.refresh();
            } else {
                setHata("Eklenirken hata oluştu. Alanları doğru doldurduğunuzdan emin olun.")
            }
        } catch (error) {
            setHata("Sunucuya Bağlanılamadı.")
        }

    };
    return (
        <div className={styles.kapsayici}>
            <h1 className={styles.baslik}>Yeni Bir Ev (İlan) Ekle</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                {hata && <p className={styles.hata}>{hata}</p>}

                <div className={styles.satir}>
                    <label>İlan Başlığı</label>
                    <input name="baslik" value={formVerisi.baslik} onChange={handleChange} placeholder="Örn: Denize Sıfır Villa" required />
                </div>
                <div className={styles.satir}>
                    <label>Konum</label>
                    <input name="konum" value={formVerisi.konum} onChange={handleChange} placeholder="Örn: Bodrum, Muğla" required />
                </div>
                <div className={styles.satir}>
                    <label>Gecelik Fiyat (₺)</label>
                    <input type="number" name="fiyat" value={formVerisi.fiyat} onChange={handleChange} placeholder="1500" required />
                </div>
                <div className={styles.satir}>
                    <label>Kategori</label>
                    <select name="kategori" value={formVerisi.kategori} onChange={handleChange}>
                        <option value="villa">Villa</option>
                        <option value="daire">Daire</option>
                        <option value="kabin">Kabin</option>
                    </select>
                </div>
                <div className={styles.satir}>
                    <label>Resim Linki (URL)</label>
                    <input name="resim" value={formVerisi.resim} onChange={handleChange} placeholder="https://images.unsplash..." required />
                </div>
                <button type="submit" className={styles.kaydetButon}>İlanı Yayınla</button>
            </form>
        </div>
    );
}