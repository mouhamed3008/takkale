<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Logging extends Model
{
    //
    use HasFactory;

    public const ABILITIES_LIST = [];

    protected $fillable = ['operation', 'user_id', 'additionnal_info'];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
