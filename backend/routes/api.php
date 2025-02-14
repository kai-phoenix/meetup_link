<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ユーザー登録
Route::post('/register',[AuthController::class,'register']);
// ログイン
Route::post('/login',[AuthController::class,'login']);
// Route::post('/logout',[AuthController::class,'logout'])->middleware('auth:sanctum');
Route::middleware(('auth:sanctum'))->group(function(){
    // 投稿イベント表示
    Route::get('/posts',[EventController::class,'index']);
    // プロフィール表示
    Route::get('/profile',[ProfileController::class,'show']);
    // ログアウト
    Route::post('/logout',[AuthController::class,'logout']);
});
