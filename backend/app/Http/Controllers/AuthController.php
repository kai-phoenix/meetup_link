<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    // ユーザー登録
    public function register(Request $request)
    {
        // バリデーション(直書き)
        $validated_user=$request->validate([
            'name' => 'required|string',
            'email'=> 'required|email|unique:users',
            'password'=> 'required|min:8|confirmed',
        ]);
        // ユーザー作成
        $user = User::create([
            'name'=> $validated_user['name'],
            'email'=> $validated_user['email'],
            'password'=> bcrypt($validated_user['password']), #暗号化
        ]);
        // ログイン後にトークン発行
        $user_token=$user->createToken('access_token')->plainTextToken;
        return response()->json([
            'user'=> $user,
            'token'=>$user_token,
        ],201);
    }
    // ログイン処理
    public function login(Request $request)
    {
        // バリデーション(直書き)
        $validated_credentials = $request->validate([
            'email' => 'required|email',
            'password'=> 'required',
        ]);
        // ログイン状態を確認
        if(!Auth::attempt($validated_credentials)) {
            return response()->json(["message"=>"Invalid credentials"]);
        }
        // ログインできているとユーザー情報を取得
        $user=Auth::user();

        // トークン発行
        $user_token=$user->createToken('access_token')->plainTextToken;
        return response()->json([
            'user'=>$user,
            'token'=>$user_token,
        ],200);
    }
    // ログアウト処理
    public function logout(Request $request)
    {
        // トークン削除
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message'=>'Logout!'
        ],200);
    }
}
