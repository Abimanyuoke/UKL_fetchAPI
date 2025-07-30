"use client";

import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleChange = (e: { target: { name: any; value: any } }) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Login berhasil!');
                console.log('User data:', data);
                router.push('/playlist')
            } else {
                toast.error(`Login gagal: ${data.message}`);
            }
        } catch (err) {
            toast.error('Terjadi kesalahan saat login.');
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="w-1/2 hidden md:block">
                    <img
                        src="https://cdn.naratif.co.id/files/images/20240310-img20240309141848-scaled-e1709971981212.jpeg"
                        alt="Gedung"
                        className="object-cover h-full w-full"
                    />
                </div>

                <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-8 space-y-4">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <div className="flex flex-col gap-2">
                        <input
                            id="username"
                            name="username"
                            onChange={handleChange}
                            placeholder="Username"
                            className="border rounded px-4 py-2"
                        />
                        <div className="relative border rounded">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={handleChange}
                                placeholder="Password"
                                className="rounded w-full px-4 py-2"
                            />
                            <div
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded w-full font-semibold transition duration-200"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
