import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Drama/Header';
import DramaCard from '@/Components/Drama/DramaCard';
import Pagination from '@/Components/Drama/Pagination';
import Navbar from '@/Components/Drama/Navbar';

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
    searchTerm: string | null;
    currentCategory: string;
}

export default function DramaIndex({ dramas, currentPage, searchTerm, currentCategory }: Props) {
    const pageTitle = currentCategory !== 'korea' 
        ? `Drama ${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}`
        : 'Drama Korea Terbaru';

    return (
        <div className="bg-slate-900 text-slate-200 min-h-screen font-sans p-6 md:p-12 pb-24 selection:bg-blue-500/30">
            <Head title={pageTitle} />

            <div className="max-w-7xl mx-auto">
                <Navbar currentCategory={currentCategory} />
                <Header searchTerm={searchTerm} currentCategory={currentCategory} />
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                    {dramas.length > 0 ? (
                        dramas.map((drama) => (
                            <DramaCard key={drama.id} drama={drama} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="text-6xl mb-4">📺</div>
                            <p className="text-slate-500 text-xl">Tidak ada drama yang ditemukan.</p>
                        </div>
                    )}
                </div>

                {dramas.length > 0 && <Pagination currentPage={currentPage} searchTerm={searchTerm} currentCategory={currentCategory} />}
            </div>
            
            {/* Background Decorative Blur */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full"></div>
            </div>
        </div>
    );
}
