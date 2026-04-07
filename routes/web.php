<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DramaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [DramaController::class, 'index'])->name('drama.index');
Route::get('/category/{category}', [DramaController::class, 'index'])->name('drama.category');
Route::get('/drama/{id}', [DramaController::class, 'show'])->name('drama.show');
Route::get('/popular', [DramaController::class, 'popular'])->name('drama.popular');
Route::get('/watch/{drama_id}/{streaming_id}', [DramaController::class, 'watch'])->name('drama.watch');
