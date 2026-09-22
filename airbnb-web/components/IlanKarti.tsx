import { Ilan } from "@/types";
import styles from "./IlanKarti.module.css";
import Link from "next/link";


export default function IlanKarti({ ilan }: { ilan: Ilan }) {
    return (
        <Link href={`/ilan/${ilan._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className={styles.kart}>

                {/* Evin Resmi */}
                <img src={ilan.resim} alt={ilan.baslik} className={styles.resim} />

                {/* Evin Bilgileri */}
                <div className={styles.bilgi}>
                    <div className={styles.baslikSatiri}>
                        <h3 className={styles.baslik}>{ilan.baslik}</h3>
                        <span className={styles.puan}>★ {ilan.puan}</span>
                    </div>
                    <p className={styles.konum}>{ilan.konum}</p>
                    <p className={styles.fiyat}>
                        <span className={styles.kalinFiyat}>{ilan.fiyat} ₺</span> / gece
                    </p>
                </div>

            </div>
        </Link>
    );
}