<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;

class EventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Event::create([
            'event_date' => '2025-03-07',
            'category_id' => 1,
            'capacity' => 100,
            'money' => 1000,
            'status' => 1,
            'description' => 'sample_event1',
        ]);
        Event::create([
            'event_date' => '2025-03-07',
            'category_id' => 2,
            'capacity' => 4,
            'money' => 400,
            'status' => 0,
            'description' => 'sample_event2',
        ]);
        Event::create([
            'event_date' => '2025-03-07',
            'category_id' => 3,
            'capacity' => 20,
            'money' => 4000,
            'status' => 2,
            'description' => 'sample_event3',
        ]);
    }
}
