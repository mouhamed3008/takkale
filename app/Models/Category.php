<?php

namespace App\Models;

use App\Models\Traits\UploadProductImage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;

class Category extends Model
{
    use HasFactory;
    use SoftDeletes;
    use UploadProductImage;

    protected $with = ['user', 'company'];

    protected $appends = ['image_url'];

    protected $fillable = ['name', 'image', 'is_shop', 'user_id', 'company_id'];

    public const ABILITIES_LIST = [
        'Categories' => [
            ['name' => 'list_category', 'label' => 'Afficher toutes les catégories', 'key' => 'CATEGORY'],
            ['name' => 'create_category', 'label' => 'Créer une catégorie', 'key' => 'CATEGORY'],
            ['name' => 'read_category', 'label' => 'Voir les informations de la catégorie', 'key' => 'CATEGORY'],
            ['name' => 'update_category', 'label' => 'Modifier une catégorie', 'key' => 'CATEGORY'],
        ],
    ];

    protected function casts(): array
    {
        return [
            'is_shop' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Category $category) {
            if (Auth::check()) {
                $category->user_id = current_user()->id;
                $category->company_id = current_user()->company_id;
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function setImageAttribute($file): void
    {
        if ($file instanceof UploadedFile) {
            $this->attributes['image'] = $this->storeImage($file);
        } else {
            $this->attributes['image'] = $file;
        }
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? asset('storage/'.$this->image) : null;
    }
}
