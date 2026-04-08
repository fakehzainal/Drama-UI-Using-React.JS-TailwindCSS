import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { optimizeImageUrl } from '@/lib/api';

interface Drama {
    id: string;
    title: string;
    image: string;
    category: string;
    hits: string;
}

export default function DramaCard({ drama, priority = false }: { drama: Drama; priority?: boolean }) {
    const [loaded, setLoaded] = useState(false);
    const optimizedSrc = optimizeImageUrl(drama.image, 300);

    return (
        <Link to={`/drama/${drama.id}`} className="block">
            <article className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="relative aspect-[3/4.5] overflow-hidden bg-slate-800">
                    {/* Low-quality shimmer placeholder until image loads */}
                    {!loaded && <div className="absolute inset-0 skeleton" />}
                    <img 
                        src={optimizedSrc}
                        alt={drama.title} 
                        className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                        loading={priority ? "eager" : "lazy"}
                        decoding="async"
                        width={300}
                        height={450}
                        onLoad={() => setLoaded(true)}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent p-4">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-blue-400/90 line-clamp-1">
                            {drama.category}
                        </span>
                    </div>
                </div>
                
                <div className="p-4">
                    <h2 className="font-semibold text-sm md:text-base leading-snug group-hover:text-blue-300 transition-colors line-clamp-2 min-h-[3rem]">
                        {drama.title}
                    </h2>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-medium">
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
