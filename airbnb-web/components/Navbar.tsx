import Link from "next/link";
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            {/* Sol Kısım: Logo */}
            <div className={styles.logoKismi}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.kirmizi}>airbnb</span> klonu
                </Link>
            </div>

            {/* Orta Kısım: Airbnb Tarzı Oval Arama Kutusu */}
            <div className={styles.aramaKismi}>
                <div className={styles.aramaKutusu}>
                    <span>Herhangi bir yer</span>
                    <span className={styles.dikeyCizgi}></span>
                    <span>Herhangi bir hafta</span>
                    <span className={styles.dikeyCizgi}></span>
                    <span className={styles.solukMetin}>Misafir ekleyin</span>
                    <div className={styles.aramaIkonu}>🔍</div>
                </div>
            </div>
            {/* Sağ Kısım: Butonlar */}
            <div className={styles.sagKisim}>
                {/* Bizim sihirli butonumuz: */}
                <Link href="/ekle" className={styles.ekleButonu}>
                    Evinizi taşıyın
                </Link>

                <div className={styles.profilButonu}>
                    <span>☰</span>
                    <div className={styles.profilIkonu}>👤</div>
                </div>
            </div>
        </nav>
    );
}