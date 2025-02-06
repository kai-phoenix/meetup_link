<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ユーザー登録
Route::post('/register',[AuthController::class,'register']);
// ログイン
Route::post('/login',[AuthController::class,'login']);
// ログアウト
Route::post('/logout',[AuthController::class,'logout']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
