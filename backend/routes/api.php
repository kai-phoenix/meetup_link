<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ユーザー登録
Route::post('/register', [AuthController::class,'register']);
// ログイン
Route::post('/login', [AuthController::class,'login']);
// Route::post('/logout',[AuthController::class,'logout'])->middleware('auth:sanctum');
Route::get('/health', function () {
    return response()->json(['status' => 'ok'], 200);
});
Route::middleware(('auth:sanctum'))->group(function () {
    // イベント表示
    Route::get('/events', [EventController::class,'index']);
    // イベント作成画面へ遷移
    Route::get('/events/create',[EventController::class,'create']);
    // イベント作成
    Route::post('/events',[EventController::class,'store']);
    // イベント詳細表示
    Route::get('/events/{id}/edit', [EventController::class,'show']);
    // イベント編集
    Route::put('/events/{id}', [EventController::class,'update']);
    // イベント削除
    Route::delete('/events/{id}', [EventController::class,'destroy']);
    // イベント予約
    Route::post('/events/{id}/reserve', [EventController::class,'reserve']);
    // イベント予約キャンセル
    Route::delete('/events/{id}/reserve', [EventController::class,'cancel']);
    // プロフィール表示
    Route::get('/profile', [ProfileController::class,'show']);
    // プロフィール編集
    Route::put('/profile', [ProfileController::class,'update']);
    // プロフィール削除
    Route::delete('/profile',[ProfileController::class,'destroy']);
    // ログアウト
    Route::post('/logout', [AuthController::class,'logout']);
});
