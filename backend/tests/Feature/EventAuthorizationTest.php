<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class EventAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_event_owner_is_taken_from_authenticated_user_and_other_users_cannot_delete_it(): void
    {
        DB::table('categories')->insert([
            'id' => 1,
            'name' => 'Meetup',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $owner = User::factory()->create(['authority' => 0]);
        $otherUser = User::factory()->create(['authority' => 0]);

        Sanctum::actingAs($owner);

        $response = $this->postJson('/api/events', [
            'user_id' => $otherUser->id,
            'event_date' => now()->addDay()->toDateString(),
            'capacity' => 5,
            'money' => 0,
            'description' => 'Authorization test event',
        ]);

        $response->assertCreated();
        $eventId = $response->json('event.id');
        $this->assertDatabaseHas('events', [
            'id' => $eventId,
            'user_id' => $owner->id,
        ]);

        Sanctum::actingAs($otherUser);
        $this->deleteJson("/api/events/{$eventId}")->assertNotFound();
        $this->assertDatabaseHas('events', ['id' => $eventId]);

        Sanctum::actingAs($owner);
        $this->deleteJson("/api/events/{$eventId}")->assertOk();
        $this->assertDatabaseMissing('events', ['id' => $eventId]);
    }
}
