import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchDramaInfo, fetchStreamInfo } from '@/lib/api';
import Navbar from '@/components/Navbar';
import BackgroundBlur from '@/components/BackgroundBlur';

interface StreamData {
    "360p"?: string;
    "480p"?: string;
    "720p"?: string;
    "360p_size"?: string;
    "480p_size"?: string;
    "720p_size"?: string;
}

interface Episode {
    episode_id: number;
    episode_label: string;
    streaming: string;
}

interface DramaInfo {
    id: number;
    title: string;
    image: string;
    data_episode?: Episode[];
}

export default function DramaStream() {
    const { dramaId, streamingId } = useParams<{ dramaId: string; streamingId: string }>();
    const [drama, setDrama] = useState<DramaInfo | null>(null);
    const [streamData, setStreamData] = useState<StreamData>({});
    const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
    const [quality, setQuality] = useState<"360p" | "480p" | "720p">("720p");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!dramaId || !streamingId) return;
        setLoading(true);

        Promise.all([
            fetchDramaInfo(dramaId),
            fetchStreamInfo(streamingId),
        ])
            .then(([dramaData, stream]) => {
                setDrama(dramaData);
                const data = stream.data_stream?.[0] || {};
                setStreamData(data);
                setQuality(data["720p"] ? "720p" : data["480p"] ? "480p" : "360p");

                const ep = (dramaData.data_episode || []).find(
                    (e: Episode) => e.streaming === streamingId
                );
                setCurrentEpisode(ep || null);

                document.title = ep
                    ? `${dramaData.title} - ${ep.episode_label}`
                    : `Menonton ${dramaData.title}`;
            })
            .catch(() => {
                setDrama(null);
            })
            .finally(() => setLoading(false));
    }, [dramaId, streamingId]);

    if (loading) {
        return (
            <div className="bg-slate-900 text-slate-200 min-h-screen font-sans flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-slate-500 font-bold tracking-widest uppercase text-sm">Memuat stream...</p>
                </div>
            </div>
        );
    }

    if (!drama) {
        return (
            <div className="bg-slate-900 text-slate-200 min-h-screen font-sans flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😥</div>
                    <p className="text-slate-500 text-xl">Stream tidak ditemukan</p>
                    <Link to="/" className="mt-6 inline-block text-blue-400 hover:text-blue-300 font-bold">← Kembali</Link>
                </div>
            </div>
        );
    }

    const videoUrl = streamData[quality];

    return (
        <div className="bg-slate-900 text-slate-200 min-h-screen font-sans pb-24 selection:bg-blue-500/30">
            <div className="max-w-7xl mx-auto p-6 md:p-12">
                <Navbar />

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-3 text-xs font-black uppercase tracking-tighter mt-12 mb-8">
                    <Link to="/" className="text-slate-500 hover:text-blue-500 transition-colors">HOME</Link>
                    <span className="text-slate-700">/</span>
                    <Link to={`/drama/${drama.id}`} className="text-slate-500 hover:text-blue-500 transition-colors truncate max-w-[150px]">{drama.title.split(' ').slice(0,3).join(' ')}...</Link>
                    <span className="text-slate-700">/</span>
                    <span className="text-blue-400">{currentEpisode?.episode_label?.toUpperCase() || `EPISODE ${streamingId}`}</span>
                </nav>

                <div className="grid grid-cols-1 gap-12">
                    {/* Video Player Section */}
                    <div className="space-y-8">
                        <div className="relative aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800 ring-1 ring-slate-700/50">
                            {videoUrl ? (
                                <video 
                                    key={videoUrl}
                                    controls 
                                    className="w-full h-full"
                                    autoPlay
                                    poster={drama.image}
                                >
                                    <source src={videoUrl} type="video/mp4" />
                                    Browser Anda tidak mendukung pemutar video.
                                </video>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                                    <div className="text-6xl animate-pulse">🚫</div>
                                    <p className="text-slate-500 font-black tracking-widest uppercase text-sm">Video tidak tersedia</p>
                                </div>
                            )}
                        </div>

                        {/* Controls & Nav */}
                        <div className="bg-slate-800/30 p-8 rounded-[2.5rem] border border-slate-700/50 backdrop-blur-3xl flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-2 flex-1">
                                <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-white leading-tight">
                                    {drama.title}
                                </h1>
                                <p className="text-blue-400 text-sm font-black tracking-widest uppercase flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                    NOW PLAYING: {currentEpisode?.episode_label || `Episode ${streamingId}`}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                {(["360p", "480p", "720p"] as const).map((q) => (
                                    streamData[q] && (
                                        <button
                                            key={q}
                                            onClick={() => setQuality(q)}
                                            className={`px-6 py-3 rounded-2xl text-[10px] font-black transition-all border ${
                                                quality === q 
                                                ? 'bg-blue-600 border-blue-400 text-white shadow-xl shadow-blue-600/30 active:scale-95' 
                                                : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500'
                                            }`}
                                        >
                                            {q.toUpperCase()}
                                            <span className="block text-[8px] opacity-60 font-medium mt-0.5">
                                                {streamData[`${q}_size` as keyof StreamData] || 'Unknown MB'}
                                            </span>
                                        </button>
                                    )
                                ))}
                            </div>
                        </div>

                        {/* Episode List Toggle (Horizontal Scroll) */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black tracking-[0.2em] text-slate-500 uppercase px-6">Episode Lainnya</h3>
                            <div className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
                                {drama.data_episode?.map((ep) => (
                                    <Link 
                                        key={ep.episode_id}
                                        to={`/watch/${drama.id}/${ep.streaming}`}
                                        className={`flex-shrink-0 px-8 py-4 rounded-2xl border text-sm font-bold transition-all ${
                                            ep.streaming === streamingId
                                            ? 'bg-blue-600/20 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-500/10'
                                            : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                                        }`}
                                    >
                                        {ep.episode_label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BackgroundBlur />
        </div>
    );
}
