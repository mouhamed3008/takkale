<?php

namespace App\Models;

use App\Models\Traits\HasUniqueCode;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;
    use HasUniqueCode;

    protected $guarded = [];

    protected static function booted()
    {
        static::creating(function ($product) {
            if (Auth::check()) {
                $product->user_id = current_user()->id;
                $product->company_id = current_user()->company_id;
            }
        });
    }



    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_product')
            ->withPivot(['quantity', 'unit_price'])
            ->withTimestamps();
    }

    public function payments()
    {
        return $this->hasMany(Bank::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function payment_method()
    {
        return $this->belongsTo(PaymentMethod::class);
    }
}
