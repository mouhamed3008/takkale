<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    //

    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'address', 'logo', 'user_id'];

    public const ABILITIES_LIST = [
        'Company' => [
            ['name' => 'list_company', 'label' => 'Afficher les rôles', 'key' => 'COMPANY'],
            ['name' => 'create_company', 'label' => 'Créer un rôle', 'key' => 'COMPANY'],
            ['name' => 'read_company', 'label' => 'Voir un rôle', 'key' => 'COMPANY'],
            ['name' => 'update_company', 'label' => 'Modifier un rôle', 'key' => 'COMPANY'],
            ['name' => 'delete_company', 'label' => 'Supprimer un rôle', 'key' => 'COMPANY'],
        ]
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }
}
