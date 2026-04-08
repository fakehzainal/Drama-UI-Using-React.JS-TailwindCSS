import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load pages for code splitting — reduces initial bundle size
const DramaIndex = lazy(() => import('./pages/DramaIndex'));
const DramaShow = lazy(() => import('./pages/DramaShow'));
const DramaStream = lazy(() => import('./pages/DramaStream'));
const DramaPopular = lazy(() => import('./pages/DramaPopular'));

function PageLoader() {
    return (
        <div className="bg-slate-900 text-slate-200 min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">Memuat...</p>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path="/" element={<DramaIndex />} />
                <Route path="/category/:category" element={<DramaIndex />} />
                <Route path="/drama/:id" element={<DramaShow />} />
                <Route path="/popular" element={<DramaPopular />} />
                <Route path="/watch/:dramaId/:streamingId" element={<DramaStream />} />
            </Routes>
        </Suspense>
    );
}
