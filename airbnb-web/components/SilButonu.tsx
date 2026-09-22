"use client";

import { useRouter } from "next/navigation";

export default function SilButonu({ id }: { id: string }) {
    const router = useRouter();

    const silmeyiOnayla = async () => {
        const onay = window.confirm("Bu ilanı tamamen silmek istediğinize emin misiniz? Bu işlem geri alınamaz.");

        if (onay) {
            try {
                const cevap = await fetch(`http://localhost:8080/api/ilanlar/${id}`, {
                    method: "DELETE"
                });
                if (cevap.ok) {
                    router.push("/");
                    router.refresh();
                }
                else {
                    alert("Silinirken bir hata oluştu!");
                }
            } catch (hata) {
                alert("Sunucuya bağlınalamdı");
            }
        }
    };

    return (
        <button
            onClick={silmeyiOnayla}
            style={{
                width: '100%',
                backgroundColor: '#ffe5e5',
                color: '#ff3b30',
                padding: '1.5vh',
                fontSize: 'var(--font-sm)',
                fontWeight: '600',
                border: '1px solid #ff3b30',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '1.5vh',
                transition: 'all 0.2s'
            }}>
            🗑️ Bu İlanı Sil
        </button>
    );
}