<?php

use Illuminate\Support\Facades\Route;

// Mengarahkan semua akses URL ke app.blade.php
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '.*');

// Di dalam routes/web.php
require __DIR__ . '/auth.php';
