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
        return(response()->json(['event'=>$event]));
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
        ]);
        // 更新
        $event->update($validated);
        return response() -> json(['event'=>$event],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function cancel(string $id)
    {
        //
    }
}
