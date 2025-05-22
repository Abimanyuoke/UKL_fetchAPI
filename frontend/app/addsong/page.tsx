"use client";

import { useState } from 'react';
import { toast } from 'sonner';

export default function RegisterPage() {
    const [form, setForm] = useState({
        title: '', artist: '', description: '', source: '',
    });
    const [loading, setLoading] = useState(false);
    const [foto, setFoto] = useState<File | null>(null);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFoto(e.target.files[0]);
        }
    }; 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("artist", form.artist);
        formData.append("description", form.description);
        formData.append("source", form.source);

        if (foto) {
            if (!["image/png", "image/jpeg", "image/jpg"].includes(foto.type)) {
                alert("File harus berupa PNG, JPG, atau JPEG.");
                setLoading(false);
                return;
            }

            if (foto.size > 2 * 1024 * 1024) {
                alert("Ukuran file maksimal 2MB.");
                setLoading(false);
                return;
            }

            formData.append("thumbnail", foto);
        }

        try {
            const res = await fetch("https://learn.smktelkom-mlg.sch.id/ukl2/playlists/song", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Song has been added!');
                console.log('Song add:', data);
            } else {
                toast.error(`Song not created ${data.message}`);
            }
        } catch (err) {
            console.error("Network Error:", err);
            alert("Terjadi kesalahan jaringan.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="flex w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="w-1/2 hidden md:block">
                    <img
                        src="https://5.imimg.com/data5/LN/WD/MY-32279312/clear-ohp-transparency-500x500.jpg"
                        alt="Ilustrasi Bank"
                        className="object-cover h-full w-full"
                    />
                </div>
                <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-8 space-y-4">
                    <h1 className="text-2xl font-bold text-center text-orange-600">ADD NEW SONG</h1>

                    <input
                        id='title'
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Judul Lagu"
                        className="border rounded px-4 py-2 w-full"
                        required
                    />

                    <input
                        id='artist'
                        name="artist"
                        value={form.artist}
                        onChange={handleChange}
                        placeholder="Artis"
                        className="border rounded px-4 py-2 w-full"
                        required
                    />

                    <input
                        id='description'
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Deskripsi"
                        className="border rounded px-4 py-2 w-full"
                        required
                    />

                    <input
                        id='source'
                        name="source"
                        value={form.source}
                        onChange={handleChange}
                        placeholder="source link"
                        className="border rounded px-4 py-2 w-full"
                        required
                    />

                    <input
                        type="file"
                        id="tumbnail"
                        name="tumbnail"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="border rounded px-4 py-2 w-full" />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded w-full font-semibold transition duration-200"
                    >
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
}
