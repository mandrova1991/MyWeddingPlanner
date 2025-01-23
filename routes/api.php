<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\TaskCategoryController;
use App\Http\Controllers\TasksController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/auth/user', function (Request $request) {
    return response()->json($request->user());
})->middleware('auth:sanctum')->name('api.auth.user');

// Auth Routes
Route::post('/register', [AuthController::class, 'register'])->name('api.auth.register');
Route::post('/login', [AuthController::class, 'login'])->name('api.auth.login');
Route::post('/logout', [AuthController::class, 'logout'])->name('api.auth.logout')->middleware('auth:sanctum');
Route::get('/refresh_token', [AuthController::class, 'refresh_token'])->name('api.auth.refresh_token')->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    // Permissions
    Route::get('wedding/{wedding}/permissions', [\App\Http\Controllers\PermissionController::class, 'index'])->name('api.wedding.auth.permissions');

    // All Wedding related Routes
    Route::get('wedding/{wedding}', [\App\Http\Controllers\WeddingController::class, 'show'])->name('api.wedding.show');
    Route::get('wedding/{wedding}/users', [\App\Http\Controllers\UserController::class, 'weddingUsers'])->name('api.wedding.users');
    Route::get('user/first-wedding', [\App\Http\Controllers\WeddingController::class, 'first'])->name('api.wedding.first');

    // All Task related Routes
    Route::get('wedding/{wedding}/tasks', [TasksController::class, 'index'])->name('api.tasks.index');
    Route::get('{wedding}/tasks/{task}', [TasksController::class, 'show'])->name('tasks.show');
    Route::post('{wedding}/tasks/create', [TasksController::class, 'store'])->name('tasks.store');
    Route::put('{wedding}/tasks/update/{task}', [TasksController::class, 'update'])->name('tasks.update');
    Route::delete('{wedding}/tasks/destroy/{task}', [TasksController::class, 'destroy'])->name('tasks.destroy');

    // All TaskCategory related Routes
    Route::get('wedding/{wedding}/tasksCategory', [TaskCategoryController::class, 'index'])->name('api.taskcategory.index');
    Route::get('{wedding}/tasksCategory/{taskCategory}', [TaskCategoryController::class, 'show'])->name('tasksCategory.show');
    Route::post('{wedding}/tasksCategory/create', [TaskCategoryController::class, 'store'])->name('tasksCategory.create');
    Route::put('{wedding}/tasksCategory/{taskCategory}', [TaskCategoryController::class, 'update'])->name('tasksCategory.update');
    Route::delete('{wedding}/tasksCategory/{taskCategory}', [TaskCategoryController::class, 'destroy'])->name('tasksCategory.destroy');

});