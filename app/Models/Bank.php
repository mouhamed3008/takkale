<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Bank extends Model
{
    //
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_id',
        'amount',
        'user_id',
        'company_id',
        'method',
        'payment_method_id'
    ];
    protected static function booted()
    {
        static::creating(function ($product) {
            if (Auth::check()) {
                $product->user_id = current_user()->id;
                $product->company_id = current_user()->company_id;
            }
        });
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
