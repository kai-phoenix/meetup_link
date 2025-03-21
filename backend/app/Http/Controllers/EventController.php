<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Reservation;
use Illuminate\Support\Facades\Log;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $event=Event::create();
        $events = Event::all();
        return response()->json(['event' => $events],201);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // FormDataからの値を整数値に
        $request->merge([
            'user_id' => (int)$request->input('user_id'),
            'capacity' => (int)$request->input('capacity'),
            'money' => (int)$request->input('money'),
        ]);
        // バリデーション
        $validated = $request -> validate([
            'user_id' => 'required|integer',
            'event_date' => 'required|date',
            'capacity' => 'required|integer',
            'money' => 'required|integer',
            'description' => 'required|string',
            // 'status' => 'required|integer',
            'image' => 'nullable|image|max:2048',
            'existing_image_path' => 'nullable|string'
        ]);
        // Log::info($request->file('image'));
        // ファイルアップロード
        if($request->hasFile('image'))
        {
            $path=$request->file('image')->store('event_images','public');
            $validated['image_path'] = basename($path);
            // Log::info('画像パス:'.$validated['image_path']);
        }
        else
        {
            $validated['image_path'] = $request->input('existing_image_path');
        }
        // 状態イベント初期入力
        $validated['category_id'] = 1;
        $validated['status'] = 0;
        $event = Event::create($validated);
        return response()->json(['event'=> $event],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $event=Event::findOrFail($id);
        return response()->json(['event'=>$event]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $event=Event::findOrFail($id);
        // FormDataからの値を整数値に
        $request->merge([
            'user_id' => (int)$request->input('user_id'),
            'capacity' => (int)$request->input('capacity'),
            'money' => (int)$request->input('money'),
        ]);
        // バリデーション
        $validated = $request -> validate([
            'event_date' => 'required|date',
            'capacity' => 'required|integer',
            'money' => 'required|integer',
            'description' => 'required|string',
            // 'status' => 'required|integer',
            'image_path' => 'nullable|string|max:2048'
        ]);
        // 状態イベント初期入力
        $validated['category_id'] = 1;
        $validated['status'] =0 ;
        if($request->hasFile('image'))
        {
            $path=$request->file('image')->store('event_images','public');
            $validated['image_path'] = basename($path);
        }
        // 更新
        $event->update($validated);
        return response() -> json(['event'=>$event],200);
    }
    public function destroy(string $id)
    {
        $event=Event::findOrFail($id);
        $event->delete();
        return response()->json([
            'message'=>'イベントを削除しました。'
        ]);
    }
    public function reserve(Request $request,string $id)
    {
        // イベント、ユーザー情報取得
        $event=Event::findOrFail($id);
        $user=$request->user();

        //定員チェック
        $currentCount=0;
        $reservations=Reservation::where('event_id',$event->id);
        foreach($reservations as $reservation)
        {
            $currentCount+=$reservation->quantity;
        }
        if($currentCount>$event->capacity)
        {
            return response()->json([
                "message"=>"上限人数を超えたため新規予約は失敗しました。"
            ],400);
        }
        // 予約レコードを作成
        $new_reservation = new Reservation();
        $new_reservation->user_id=$user->id;
        $new_reservation->event_id=$event->id;
        $new_reservation->party=$request->input('party');

        return response()->json([
            "message"=>"新規予約できました！",
            "reservation"=>$new_reservation,
        ],201);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function cancel(Request $request,string $id)
    {
        //キャンセル対象イベント
        $event=Event::findOrFail($id);
        $user=$request->user();

        $reservation=Reservation::where('user_id',$user->id)->where('event_id',$event->id);
        // イベント削除
        $reservation->delete();
        return response()->json([
            "message"=>"予約を取り消しました。"
        ],200);
    }
}
