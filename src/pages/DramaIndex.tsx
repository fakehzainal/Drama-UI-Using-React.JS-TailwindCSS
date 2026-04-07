import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchDramaList, searchDrama } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import DramaCard from '@/components/DramaCard';
import Pagination from '@/components/Pagination';
import BackgroundBlur from '@/components/BackgroundBlur';
import { CardGridSkeleton } from '@/components/Skeletons';

interface Drama {
    id: string;
    title: string;
    image: string;
    category: string;
    hits: string;
}

export default function DramaIndex() {
    const { category } = useParams<{ category?: string }>();
    const [searchParams] = useSearchParams();
    const currentCategory = category || 'korea';
    const currentPage = parseInt(searchParams.get('page') || '1');
    const searchTerm = searchParams.get('search') || null;

    const [dramas, setDramas] = useState<Drama[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = searchTerm 
            ? `Pencarian: ${searchTerm} - Drama Korea`
            : currentCategory !== 'korea'
                ? `Drama ${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}`
                : 'Drama Korea Terbaru';

        setLoading(true);
        const load = async () => {
            try {
                let data;
                if (searchTerm) {
                    data = await searchDrama(searchTerm, currentPage);
                } else {
                    data = await fetchDramaList(currentCategory, currentPage);
                }
                setDramas(data?.data || []);
            } catch {
                setDramas([]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [currentCategory, currentPage, searchTerm]);

    return (
        <div className="bg-slate-900 text-slate-200 min-h-screen font-sans p-6 md:p-12 pb-24 selection:bg-blue-500/30">
            <div className="max-w-7xl mx-auto">
                <Navbar currentCategory={currentCategory} />
                <Header searchTerm={searchTerm} currentCategory={currentCategory} />
                
                {loading ? (
                    <CardGridSkeleton />
                ) : (
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
                )}

                {!loading && dramas.length > 0 && (
                    <Pagination currentPage={currentPage} searchTerm={searchTerm} currentCategory={currentCategory} />
                )}
            </div>
            
            <BackgroundBlur />
        </div>
    );
}
