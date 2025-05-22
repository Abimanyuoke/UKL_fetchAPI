"use client";
import { useEffect, useState } from 'react';

type Profil = {
    nama_pelanggan: string;
    alamat: string;
    gender: string;
    telepon: string;
    image?: string;
};

export default function ProfilPage() {
    const [profil, setProfil] = useState<Profil | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://learn.smktelkom-mlg.sch.id/ukl1/api/profil')
            .then(res => res.json())
            .then(data => {
                setProfil(data.data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-xl font-bold mb-4">Profil Pelanggan</h1>
            {profil ? (
                <>
                    <p><strong>Nama:</strong> {profil.nama_pelanggan}</p>
                    <p><strong>Alamat:</strong> {profil.alamat}</p>
                    <p><strong>Gender:</strong> {profil.gender}</p>
                    <p><strong>Telepon:</strong> {profil.telepon}</p>
                </>
            ) : (
                <p className="text-red-500">Profil tidak ditemukan.</p>
            )}
        </div>
    );
}
