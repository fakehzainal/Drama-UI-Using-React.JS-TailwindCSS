import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Drama/Navbar';
import DramaCard from '@/Components/Drama/DramaCard';

interface Drama {
    id: string;
    title: string;
    image: string;
    category: string;
    hits: string;
}

interface Props {
    dramas: Drama[];
    currentPage: number;
    totalCount: number;
}

export default function Popular({ dramas, currentPage, totalCount }: Props) {
    return (
        <div className="bg-slate-900 text-slate-200 min-h-screen font-sans pb-24 selection:bg-blue-500/30">
            <Head title="Drama Terpopuler" />

            <div className="max-w-7xl mx-auto p-6 md:p-12">
                <Navbar />

                {/* Popular Header */}
                <header className="mt-12 mb-16 text-center space-y-4">
                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent uppercase leading-tight">
                        DRAMA TERPOPULER
                    </h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
                        Koleksi drama pilihan dengan jumlah penayangan terbanyak minggu ini.
                    </p>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                    {dramas.length > 0 ? (
                        dramas.map((drama, idx) => (
                            <div key={drama.id} className="relative group">
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center font-black text-xl shadow-xl z-10 group-hover:bg-orange-500 group-hover:text-white transition-all transform group-hover:scale-110">
                                    {((currentPage - 1) * dramas.length) + idx + 1}
                                </div>
                                <DramaCard drama={drama} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="text-6xl mb-4">🔇</div>
                            <p className="text-slate-500 text-xl">Sedang memuat data terpopuler...</p>
                        </div>
                    )}
                </div>


            </div>

            {/* Background Decorative Blur */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[30%] left-[-10%] w-[50%] h-[50%] bg-orange-500/5 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 blur-[150px] rounded-full"></div>
            </div>
        </div>
    );
}
