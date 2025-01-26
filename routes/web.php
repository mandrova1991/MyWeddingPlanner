<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/{any}', function () {
    return Inertia::render('AppRoot', []);
})->where('any', '.*');

require __DIR__.'/auth.php';
