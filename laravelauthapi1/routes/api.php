<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PasswordResetController;

// Public Routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/send-reset-password-email', [PasswordResetController::class, 'send_reset_password_email']);
Route::post('/reset-password/{token}', [PasswordResetController::class, 'reset']);


Route::post('/product', [ProductController::class, 'create']);
Route::get('/product/{id}', [ProductController::class, 'show']);
Route::get('/product', [ProductController::class, 'index']);
Route::put('/product/{id}', [ProductController::class, 'update']);
Route::delete('/product/{id}', [ProductController::class, 'destroy']);

Route::post('/client', [ClientController::class, 'create']);
Route::get('/client/{id}', [ClientController::class, 'show']);
Route::get('/client', [ClientController::class, 'index']);
Route::put('/client/{id}', [ClientController::class, 'update']);
Route::delete('/client/{id}', [ClientController::class, 'destroy']);





// Protected Routes
Route::middleware(['auth:sanctum'])->group(function(){
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/loggeduser', [UserController::class, 'logged_user']);
    Route::post('/changepassword', [UserController::class, 'change_password']);
});
