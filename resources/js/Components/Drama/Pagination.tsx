import React from 'react';
import { Link } from '@inertiajs/react';

interface PaginationProps {
    currentPage: number;
    searchTerm: string | null;
    currentCategory?: string;
}

export default function Pagination({ currentPage, searchTerm, currentCategory }: PaginationProps) {
    const params = (page: number) => ({
        page,
        ...(searchTerm ? { search: searchTerm } : {})
    });

    const getRoute = (page: number) => {
        if (currentCategory && currentCategory !== 'korea') {
            return route('drama.category', { category: currentCategory, ...params(page) });
        }
        return route('drama.index', params(page));
    };

    return (
        <nav className="mt-16 flex flex-wrap justify-center items-center gap-4">
            {currentPage > 1 && (
                <Link 
                    href={getRoute(currentPage - 1)} 
                    className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all border border-slate-700 shadow-xl active:scale-95"
                >
                    Sebelumnya
                </Link>
            )}
            <span className="text-slate-400 font-mono px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700/50 backdrop-blur">
                HALAMAN {currentPage}
            </span>
            <Link 
                href={getRoute(currentPage + 1)} 
                className="px-5 py-2 rounded-xl bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white transition-all border border-blue-500/20 shadow-xl group active:scale-95"
            >
                Selanjutnya <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </Link>
        </nav>
    );
}
