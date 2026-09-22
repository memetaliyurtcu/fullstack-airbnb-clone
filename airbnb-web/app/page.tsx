import { Ilan } from "@/types";
import IlanKarti from "@/components/IlanKarti";
import styles from "./page.module.css";
import Link from "next/link";

export default async function AnaSayfa({ searchParams, }: { searchParams: Promise<{ kategori?: string }>; }) {
  const parametreler = await searchParams;
  const aktifKategori = parametreler.kategori || "tumu";

  let apiUrl = "http://localhost:8080/api/ilanlar"

  if (aktifKategori !== "tumu") {
    apiUrl = `http://localhost:8080/api/ilanlar/kategori/${aktifKategori}`;
  }

  //Veriyi Çekme
  const cevap = await fetch(apiUrl, { cache: "no-store" });
  const ilanlar: Ilan[] = await cevap.json();

  return (
    <main className={styles.anaKapsayici}>

      {/* ÜST FİLTRELEME MENÜSÜ */}
      <nav className={styles.filtreMenusu}>
        <Link href="/" className={`${styles.filtreButon} ${aktifKategori === "tumu" ? styles.aktif : ""}`}>
          Tüm Evler
        </Link>
        <Link href="/?kategori=villa" className={`${styles.filtreButon} ${aktifKategori === "villa" ? styles.aktif : ""}`}>
          Villalar
        </Link>
        <Link href="/?kategori=daire" className={`${styles.filtreButon} ${aktifKategori === "daire" ? styles.aktif : ""}`}>
          Daireler
        </Link>
        <Link href="/?kategori=kabin" className={`${styles.filtreButon} ${aktifKategori === "kabin" ? styles.aktif : ""}`}>
          Kabinler
        </Link>
      </nav>
      {/* İLANLAR GRID (IZGARA) ALANI */}
      <div className={styles.gridKapsayici}>
        {/* API'den gelen listeyi dönüyoruz ve her biri için IlanKarti bileşenimizi basıyoruz */}
        {ilanlar.map((ilan) => (
          <IlanKarti key={ilan._id} ilan={ilan} />
        ))}
      </div>
    </main>
  );
}