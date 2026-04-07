import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DramaIndex from './pages/DramaIndex';
import DramaShow from './pages/DramaShow';
import DramaStream from './pages/DramaStream';
import DramaPopular from './pages/DramaPopular';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<DramaIndex />} />
            <Route path="/category/:category" element={<DramaIndex />} />
            <Route path="/drama/:id" element={<DramaShow />} />
            <Route path="/popular" element={<DramaPopular />} />
            <Route path="/watch/:dramaId/:streamingId" element={<DramaStream />} />
        </Routes>
    );
}
