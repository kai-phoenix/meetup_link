<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 2件作成
        User::create([
            'name' => 'sample_user1',
            'email' => 'sample_user1@example.com',
            'password' => bcrypt('asdf1234'),
            'authority' => 1,
        ]);
        User::create([
            'name' => 'sample_user2',
            'email' => 'sample_user2@example.com',
            'password' => bcrypt('asdf1234'),
            'authority' => 0,
        ]);
    }
}
