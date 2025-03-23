<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Reservation;

class ReservationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Reservation::create([
            'user_id'=>1,
            'event_id'=>1,
            'quantity'=>1,
            'status' => 0,
        ]);
        Reservation::create([
            'user_id'=>1,
            'event_id'=>1,
            'quantity'=>4,
            'status' => 0,
        ]);
        Reservation::create([
            'user_id'=>2,
            'event_id'=>2,
            'quantity'=>1,
            'status' => 0,
        ]);
        Reservation::create([
            'user_id'=>2,
            'event_id'=>3,
            'quantity'=>1,
            'status' => 0,
        ]);
        Reservation::create([
            'user_id'=>1,
            'event_id'=>2,
            'quantity'=>4,
            'status' => 0,
        ]);
    }
}
