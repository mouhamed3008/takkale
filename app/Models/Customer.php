<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    //
    use HasFactory;
    use SoftDeletes;
    // protected $dates = ['deleted_at'];

    protected $guarded = [];
    public const ABILITIES_LIST = [
        'Customers' => [
            ['name' => 'list_customer', 'label' => 'Afficher tous les comptes utilisateurs', 'key' => 'CUSTOMER'],
            ['name' => 'create_customer', 'label' => 'Créer un compte utilisateur', 'key' => 'CUSTOMER'],
            ['name' => 'read_customer', 'label' => 'Voir les informations du compte', 'key' => 'CUSTOMER'],
            ['name' => 'update_customer', 'label' => 'Modifier les informations du compte utilisateur', 'key' => 'CUSTOMER'],

        ]
    ];
}
