import React, { useEffect, useState } from 'react';
import { fetchDramaList } from '@/lib/api';
import Navbar from '@/components/Navbar';
import DramaCard from '@/components/DramaCard';
import BackgroundBlur from '@/components/BackgroundBlur';
import { CardGridSkeleton } from '@/components/Skeletons';

interface Drama {
    id: string;
    title: string;
    image: string;
    category: string;
    hits: string;
}

export default function DramaPopular() {
    const [dramas, setDramas] = useState<Drama[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Drama Terpopuler - Drama Korea';
        setLoading(true);

        const load = async () => {
            try {
                const [page1, page2] = await Promise.all([
                    fetchDramaList('korea', 1),
                    fetchDramaList('korea', 2),
                ]);
                const all = [...(page1?.data || []), ...(page2?.data || [])];
                const sorted = all
                    .sort((a: Drama, b: Drama) => parseInt(b.hits || '0') - parseInt(a.hits || '0'))
                    .slice(0, 20);
                setDramas(sorted);
            } catch {
                setDramas([]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <main className="bg-slate-900 text-slate-200 min-h-screen font-sans pb-24 selection:bg-blue-500/30">
            <div className="max-w-7xl mx-auto p-6 md:p-12">
                <Navbar />

                {/* Popular Header */}
                <header className="mt-12 mb-16 text-center space-y-4">
                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent uppercase leading-tight">
                        DRAMA TERPOPULER
                    </h1>
                    <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
                        Koleksi drama pilihan dengan jumlah penayangan terbanyak minggu ini.
                    </p>
                </header>

                {loading ? (
                    <CardGridSkeleton />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                        {dramas.length > 0 ? (
                            dramas.map((drama, idx) => (
                                <div key={drama.id} className="relative group">
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center font-black text-xl shadow-xl z-10 group-hover:bg-orange-500 group-hover:text-white transition-all transform group-hover:scale-110">
                                        {idx + 1}
                                    </div>
                                    <DramaCard drama={drama} priority={idx < 5} />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <div className="text-6xl mb-4">🔇</div>
                                <p className="text-slate-400 text-xl">Sedang memuat data terpopuler...</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <BackgroundBlur />
        </main>
    );
}
