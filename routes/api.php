<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskCategoryController;
use App\Http\Controllers\TasksController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Auth Routes
Route::post('/register', [AuthController::class, 'register'])->name('api.auth.register');
Route::post('/login', [AuthController::class, 'login'])->name('api.auth.login')->middleware('web');
Route::post('/logout', [AuthController::class, 'logout'])->name('api.auth.logout')->middleware('auth:sanctum');
Route::get('/refresh_token', [AuthController::class, 'refresh_token'])->name('api.auth.refresh_token')->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {

    // All Task related Routes
    Route::get('{wedding}/tasks', [TasksController::class, 'index'])->name('tasks.index');
    Route::post('{wedding}/tasks/create', [TasksController::class, 'store'])->name('tasks.store');
    Route::put('{wedding}/tasks/update/{task}', [TasksController::class, 'update'])->name('tasks.update');
    Route::delete('{wedding}/tasks/destroy/{task}', [TasksController::class, 'destroy'])->name('tasks.destroy');

    // All TaskCategory related Routes
    Route::get('{wedding}/tasksCategory', [TaskCategoryController::class, 'index'])->name('tasks.index');
    Route::get('{wedding}/tasksCategory/{taskCategory}', [TaskCategoryController::class, 'show'])->name('tasksCategory.show');
    Route::post('{wedding}/tasksCategory/create', [TaskCategoryController::class, 'store'])->name('tasksCategory.create');
    Route::put('{wedding}/tasksCategory/{taskCategory}', [TaskCategoryController::class, 'update'])->name('tasksCategory.update');
    Route::delete('{wedding}/tasksCategory/{taskCategory}', [TaskCategoryController::class, 'destroy'])->name('tasksCategory.destroy');

});