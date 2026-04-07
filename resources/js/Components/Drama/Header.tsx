import React from 'react';
import SearchBar from './SearchBar';

interface HeaderProps {
    searchTerm: string | null;
    currentCategory?: string;
}

export default function Header({ searchTerm, currentCategory }: HeaderProps) {
    return (
        <header className="flex flex-col items-center mb-16 space-y-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4 animate-in fade-in slide-in-from-top duration-1000">
                    Drama Korea Terbaru
                </h1>
                <p className="text-slate-400 text-lg">Temukan dan jelajahi drama favorit Anda</p>
            </div>

            <SearchBar searchTerm={searchTerm} currentCategory={currentCategory} />
        </header>
    );
}
