import styles from './page.module.css';
import SilButonu from '@/components/SilButonu';

export default async function IlanDetay({ params }: { params: Promise<{ id: string }> }) {

    const cozulenParams = await params;

    const cevap = await fetch(`http://localhost:8080/api/ilanlar/${cozulenParams.id}`, { cache: "no-store" });

    if (!cevap.ok) {
        return <div className={styles.hata}>Bu ilan bulunamadı veya silinmiş.</div>;
    }

    const ilan = await cevap.json();

    return (
        <main className={styles.anaKapsayici}>
            <h1 className={styles.baslik}>{ilan.baslik}</h1>

            <div className={styles.resimKapsayici}>
                {/* Artık devasa boyutlarda */}
                <img src={ilan.resim} alt={ilan.baslik} className={styles.devResim} />
            </div>
            <div className={styles.bilgiKapsayici}>
                <div className={styles.solBilgi}>
                    <h2>{ilan.konum} şehrinde harika bir {ilan.kategori}</h2>
                    <p className={styles.puan}>⭐ {ilan.puan} puan</p>
                    <div className={styles.aciklama}>
                        <p>Bu muhteşem evde konaklayarak unutulmaz bir tatil deneyimi yaşayın. Modern mimari, harika konum ve sınırsız konfor...</p>
                    </div>
                </div>
                <div className={styles.sagRezervasyon}>
                    <div className={styles.rezervasyonKutusu}>
                        <h3>Gecelik ₺{ilan.fiyat}</h3>
                        <button className={styles.rezervasyonButonu}>Rezerve Et</button>
                        <SilButonu id={ilan._id} />
                    </div>
                </div>
            </div>
        </main>
    );

}