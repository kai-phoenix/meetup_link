<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;
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
        $now_reservations = Reservation::all();
        // 取り出した予約情報からイベントidごとの人数を配列にする
        $event_id_lists = [];
        $reservation_count = [];
        foreach($now_reservations as $now_reservation) {
            if(empty($now_reservation->quantity)) {
                $now_reservation->quantity = 0;
            }
            if(!in_array($now_reservation->event_id,$event_id_lists)) {
                array_push($event_id_lists,$now_reservation->event_id);
                $reservation_count[$now_reservation->event_id] = $now_reservation->quantity;
            }
            else {
                $reservation_count[$now_reservation->event_id] += $now_reservation->quantity;
            }
        }
        
        return response()->json(['event' => $events,'reservation'=>$reservation_count],201);
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
        $event=Event::with('reservations.user')->findOrFail($id);
        return response()->json([
            'event'=>$event,
        ]);
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
        $user=Auth::user();

        // バリデーション
        $validated = $request->validate([
            'party' => 'required|integer',
        ]);
        
        //定員チェック
        $currentCount=0;
        $reservations=Reservation::where('event_id',$event->id)->get();
        foreach($reservations as $reservation)
        {
            $currentCount+=$reservation->quantity;
        }

        $currentCount+=$request->party;
        if($currentCount>$event->capacity)
        {
            return response()->json([
                "message"=>"上限人数を超えたため新規予約は失敗しました。"
            ],400);
        }

        // 予約レコードを作成(外部キーを設定)
        $new_reservation = new Reservation();
        $new_reservation->user_id =$user->id;
        $new_reservation->event_id =$event->id;
        $new_reservation->quantity =$validated['party'];
        $new_reservation->status = 0;
        $new_reservation->save();

        return response()->json([
            "message"=>"新規予約できました！",
            "reservation"=>$new_reservation,
        ],201);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function cancel(Request $request,$event_id)
    {
        // ユーザー情報取得
        $user=$request->user();
        // リクエストボディから予約IDを取得
        $reservation_id= $request->input('reservation_id');
        // Log::info('Reservationid:'.$reservation_id);
        // Log::info('Userid:'.$user->id);
        // Log::info('Eventid:'.$event_id);
        //キャンセル対象の予約情報を取得
        $reservation = Reservation::where('id',$reservation_id)->where('user_id',$user->id)->where('event_id',$event_id)->firstOrFail();
        $reservation->delete();

        return response()->json([
            "message"=>"予約を取り消しました。"
        ],200);
    }
}
