<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'quantity',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}