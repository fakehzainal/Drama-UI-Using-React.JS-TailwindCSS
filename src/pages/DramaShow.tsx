import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchDramaInfo, optimizeImageUrlHQ } from '@/lib/api';
import Navbar from '@/components/Navbar';
import BackgroundBlur from '@/components/BackgroundBlur';
import { DetailSkeleton } from '@/components/Skeletons';

interface Episode {
    episode_id: number;
    episode_label: string;
    episode_number: number;
    episode_image?: string;
    streaming?: string;
}

interface DramaDetail {
    id: number;
    title: string;
    image: string;
    synopsis_clean?: string;
    total_episode: number;
    hits: string;
    category: string;
    meta_time: string;
    data_episode: Episode[];
}

export default function DramaShow() {
    const { id } = useParams<{ id: string }>();
    const [drama, setDrama] = useState<DramaDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetchDramaInfo(id)
            .then((data) => {
                setDrama(data);
                document.title = `${data.title} - Drama Korea`;
            })
            .catch(() => setDrama(null))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <main className="bg-slate-900 text-slate-200 min-h-screen font-sans pb-24">
                <div className="max-w-7xl mx-auto p-6 md:p-12">
                    <Navbar />
                    <div className="mt-12"><DetailSkeleton /></div>
                </div>
                <BackgroundBlur />
            </main>
        );
    }

    if (!drama) {
        return (
            <div className="bg-slate-900 text-slate-200 min-h-screen font-sans flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😥</div>
                    <p className="text-slate-400 text-xl">Drama tidak ditemukan</p>
                    <Link to="/" className="mt-6 inline-block text-blue-400 hover:text-blue-300 font-bold">← Kembali</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-slate-900 text-slate-200 min-h-screen font-sans pb-24 selection:bg-blue-500/30">
            <div className="max-w-7xl mx-auto p-6 md:p-12">
                <Navbar />

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-3 text-xs font-black uppercase tracking-tighter mt-12 mb-6">
                    <Link to="/" className="text-slate-400 hover:text-blue-500 transition-colors">HOME</Link>
                    <span className="text-slate-700">/</span>
                    <span className="text-slate-400">DRAMA</span>
                    <span className="text-slate-700">/</span>
                    <span className="text-blue-400 truncate max-w-[200px]">{drama.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Poster & Quick Info */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-12 space-y-8">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/80 group">
                                <img 
                                    src={optimizeImageUrlHQ(drama.image, 600)} 
                                    alt={drama.title} 
                                    className="w-full h-auto aspect-[3/4.5] object-cover transform group-hover:scale-105 transition-transform duration-1000" 
                                    decoding="async"
                                    fetchPriority="high"
                                    width={600}
                                    height={900}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                <div className="absolute top-4 right-4 bg-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest shadow-xl border border-blue-400/30 uppercase">
                                    {drama.total_episode} EPISODES
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center">
                                <span className="bg-slate-800/80 border border-slate-700/50 px-4 py-1.5 rounded-xl text-xs font-medium text-blue-400">
                                    #{drama.category}
                                </span>
                                <span className="bg-slate-800/80 border border-slate-700/50 px-4 py-1.5 rounded-xl text-xs font-medium text-slate-300">
                                    Dilihat {parseInt(drama.hits).toLocaleString()} kali
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content Detail */}
                    <div className="lg:col-span-2 space-y-12">
                        <header>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-slate-500 bg-clip-text text-transparent mb-6 uppercase leading-tight">
                                {drama.title}
                            </h1>
                            <div className="h-1 w-24 bg-blue-600 rounded-full mb-8"></div>
                        </header>

                        <section className="bg-slate-800/30 p-8 rounded-[2.5rem] border border-slate-700/50 backdrop-blur-3xl relative overflow-hidden">
                            <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-100">
                                <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm shadow-lg shadow-blue-600/30">📝</span>
                                SINOPSIS
                            </h2>
                            <p className="text-slate-400 leading-relaxed text-lg font-medium selection:bg-blue-500/50">
                                {drama.synopsis_clean || 'Tidak ada deskripsi tersedia untuk drama ini.'}
                            </p>
                            <div className="absolute top-0 right-0 p-8 text-slate-800 pointer-events-none opacity-20">
                                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H5.017C4.46472 8 4.017 8.44772 4.017 9V15C4.017 15.5523 4.46472 16 5.017 16H8.017C9.12157 16 10.017 16.8954 10.017 18L10.017 21H14.017Z" /></svg>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-xl font-black flex items-center gap-2 text-slate-100 uppercase tracking-widest">
                                <span className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-sm shadow-lg shadow-purple-600/30">🎬</span>
                                DAFTAR EPISODE
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {drama.data_episode?.length > 0 ? (
                                    drama.data_episode.map((ep, idx) => (
                                        ep.streaming ? (
                                        <Link 
                                            key={ep.episode_id}
                                            to={`/watch/${drama.id}/${ep.streaming}`}
                                            className="group flex items-center justify-between p-5 bg-slate-800/50 border border-slate-700/50 rounded-2xl hover:bg-slate-700/50 hover:border-blue-500/50 transition-all active:scale-95 duration-500"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12 flex-shrink-0">
                                                    <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-blue-500 z-10">{idx + 1}</span>
                                                    <div className="w-full h-full bg-slate-900 rounded-lg border border-slate-700 group-hover:border-blue-500/50 transition-colors"></div>
                                                </div>
                                                <span className="font-bold text-slate-300 group-hover:text-white transition-colors truncate max-w-[150px]">
                                                    {ep.episode_label}
                                                </span>
                                            </div>
                                            <span className="bg-blue-600/10 text-blue-400 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                PLAY
                                            </span>
                                        </Link>
                                        ) : null
                                    ))
                                ) : (
                                    <div className="col-span-full py-12 text-center bg-slate-800/20 rounded-2xl border border-dashed border-slate-700">
                                        <p className="text-slate-400 italic uppercase tracking-widest text-xs">Belum ada episode yang tersedia</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <BackgroundBlur />
        </main>
    );
}
