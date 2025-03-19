<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable=[
        'user_id',
        'category_id',
        'event_date',
        'capacity',
        'money',
        'status',
        'description',
        'image_path'
    ];
}
