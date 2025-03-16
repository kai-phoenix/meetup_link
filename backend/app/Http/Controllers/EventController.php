<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Reservation;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $event=Event::create();
        $events = Event::all();
        return response()->json(['event' => $events]);
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
        //
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
        // バリデーション
        $validated = $request -> validate([
            'event_date' => 'required|date',
            'capacity' => 'required|integer',
            'money' => 'required|integer',
            'description' => 'required|string',
            'status' => 'required|integer',
            'image_path' => 'nullable|string|max:2048'
        ]);
        // 更新
        $event->update($validated);
        return response() -> json(['event'=>$event],200);
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
