import React from 'react';
import { Link } from '@inertiajs/react';

interface Drama {
    id: string;
    title: string;
    image: string;
    category: string;
    hits: string;
}

export default function DramaCard({ drama }: { drama: Drama }) {
    return (
        <Link href={route('drama.show', { id: drama.id })} className="block">
            <article className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="relative aspect-[3/4.5] overflow-hidden">
                    <img 
                        src={drama.image} 
                        alt={drama.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                        loading="lazy" 
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent p-4">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-blue-400/90 line-clamp-1">
                            {drama.category}
                        </span>
                    </div>
                </div>
                
                <div className="p-4">
                    <h3 className="font-semibold text-sm md:text-base leading-snug group-hover:text-blue-300 transition-colors line-clamp-2 min-h-[3rem]">
                        {drama.title}
                    </h3>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
                            {parseInt(drama.hits).toLocaleString()}
                        </span>
                        <span className="bg-slate-700/50 px-2 py-0.5 rounded text-[10px]">HD</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
