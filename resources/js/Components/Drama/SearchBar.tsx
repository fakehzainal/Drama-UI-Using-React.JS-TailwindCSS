import React, { useState } from 'react';
import { router } from '@inertiajs/react';

interface SearchBarProps {
    searchTerm: string | null;
    currentCategory?: string;
}

export default function SearchBar({ searchTerm, currentCategory }: SearchBarProps) {
    const [search, setSearch] = useState(searchTerm || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Always search from the main index (search API is category-agnostic)
        router.get(route('drama.index'), { search: search }, { 
            preserveState: true,
            replace: true
        });
    };

    return (
        <form onSubmit={handleSearch} className="w-full max-w-2xl px-4">
            <div className="relative group">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari judul drama..."
                    className="w-full bg-slate-800/50 border border-slate-700 text-slate-100 pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500 shadow-2xl backdrop-blur-xl group-hover:border-slate-600"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {search && (
                    <button 
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
                    >
                        Cari
                    </button>
                )}
            </div>
        </form>
    );
}
