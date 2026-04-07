import React from 'react';

export function CardSkeleton() {
    return (
        <div className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50">
            <div className="relative aspect-[3/4.5] skeleton"></div>
            <div className="p-4 space-y-3">
                <div className="h-4 skeleton rounded w-3/4"></div>
                <div className="h-3 skeleton rounded w-1/2"></div>
            </div>
        </div>
    );
}

export function CardGridSkeleton({ count = 10 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    );
}

export function DetailSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-pulse">
            <div className="lg:col-span-1">
                <div className="aspect-[3/4.5] skeleton rounded-3xl"></div>
            </div>
            <div className="lg:col-span-2 space-y-6">
                <div className="h-10 skeleton rounded w-3/4"></div>
                <div className="h-1 skeleton rounded w-24"></div>
                <div className="space-y-3">
                    <div className="h-4 skeleton rounded w-full"></div>
                    <div className="h-4 skeleton rounded w-5/6"></div>
                    <div className="h-4 skeleton rounded w-2/3"></div>
                </div>
            </div>
        </div>
    );
}
