import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

interface NavbarProps {
    currentCategory?: string;
}

export default function Navbar({ currentCategory }: NavbarProps) {
    const { url } = usePage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const categories = [
        { id: 'korea', name: 'Korea' },
        { id: 'china', name: 'China' },
    ];

    const isActive = (path: string) => {
        if (path === '/' && url === '/') return true;
        if (path !== '/' && url.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className="w-full flex items-center justify-center mb-8 px-4 py-3 bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-2xl shadow-sm">
            <div className="flex items-center gap-6">
                <Link 
                    href={route('drama.index')}
                    className={`text-sm font-bold transition-all flex items-center gap-2 ${
                        isActive('/') && !url.includes('/category') ? 'text-blue-400' : 'text-slate-400 hover:text-white'
                    }`}
                >
                    🏠 Home
                </Link>
                <Link 
                    href={route('drama.popular')}
                    className={`text-sm font-bold transition-all flex items-center gap-2 ${
                        isActive('/popular') ? 'text-orange-400' : 'text-slate-400 hover:text-white'
                    }`}
                >
                    🔥 Populer
                </Link>
                <div className="relative">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`text-sm font-bold transition-all flex items-center gap-1 ${
                            isMenuOpen || url.includes('/category') ? 'text-white' : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        📂 Kategori
                        <svg className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isMenuOpen && (
                        <div className="absolute top-8 left-0 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in duration-150">
                            {categories.map((cat) => (
                                <Link 
                                    key={cat.id}
                                    href={route('drama.category', { category: cat.id })}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-4 py-2 text-sm rounded-lg transition-all ${
                                        currentCategory === cat.id ? 'bg-slate-800 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                    }`}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
