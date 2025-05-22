'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';

type Comment = {
    comment_text: string;
    creator: string;
    createdAt: string;
};

type SongDetail = {
    uuid: string;
    title: string;
    artist: string;
    description: string;
    source: string;
    thumbnail: string;
    likes: number;
    comments: Comment[];
};

export default function SongDetailPage() {
    const { uuid } = useParams();
    const router = useRouter();
    const [song, setSong] = useState<SongDetail | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!uuid) return;

        const fetchSongDetail = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://learn.smktelkom-mlg.sch.id/ukl2/playlists/song/${uuid}`);
                const data = await res.json();
                setSong(data.data);
            } catch (err) {
                console.error("Error fetching song:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSongDetail();
    }, [uuid]);

    if (loading) {
        return <p className="text-center p-6 text-gray-500">Loading song details...</p>;
    }

    if (!song) {
        return <p className="text-center p-6 text-gray-500">Song not found.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto space-y-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-blue-600 hover:underline text-sm"
                >
                    <FaArrowLeft className="mr-1" /> Back
                </button>

                {/* Video Embed */}
                <div className="aspect-video w-full rounded-xl overflow-hidden">
                    <iframe
                        src={song.source.replace("youtu.be/", "www.youtube.com/embed/")}
                        title={song.title}
                        allowFullScreen
                        className="w-full h-full" 
                    />
                </div>

                {/* Info Lagu */}
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-gray-800">{song.title}</h1>
                    <p className="text-lg text-gray-600">by {song.artist}</p>
                    <p className="text-sm text-gray-500">{song.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
                        <FaHeart className="text-red-500" /> {song.likes} likes
                    </div>
                </div>

                {/* Komentar */}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">Comments</h2>
                    {song.comments.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No comments yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {song.comments.map((comment, idx) => (
                                <li key={idx} className="bg-white rounded-xl p-4 shadow">
                                    <p className="text-sm text-gray-800">"{comment.comment_text}"</p>
                                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                                        <span>By {comment.creator}</span>
                                        <span>{new Date(comment.createdAt).toLocaleString()}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
