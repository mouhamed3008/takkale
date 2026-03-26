<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\UploadProductImage;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    //
    use HasFactory;
    use UploadProductImage;

    protected $with = ['user', "company"];

    protected $appends = ['image_url'];

    protected $fillable = ['name', 'price', 'description', 'image', 'user_id', 'company_id'];

    public const ABILITIES_LIST = [
        'Products' => [
            ['name' => 'list_product', 'label' => 'Afficher tous les comptes utilisateurs', 'key' => 'PRODUCT'],
            ['name' => 'create_product', 'label' => 'Créer un compte utilisateur', 'key' => 'PRODUCT'],
            ['name' => 'read_product', 'label' => 'Voir les informations du compte', 'key' => 'PRODUCT'],
            ['name' => 'update_product', 'label' => 'Modifier les informations du compte utilisateur', 'key' => 'PRODUCT'],

        ]
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function setImageAttribute($file)
    {
        if ($file instanceof \Illuminate\Http\UploadedFile) {
            $this->attributes['image'] = $this->storeImage($file);
        } else {
            $this->attributes['image'] = $file;
        }
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_product')
            ->withPivot(['quantity', 'unit_price'])
            ->withTimestamps();
    }

    public function getQuantityAttribute()
    {
        return $this->pivot?->quantity ?? null;
    }

    public function getUnitPriceAttribute()
    {
        return $this->pivot?->unit_price ?? null;
    }
}
