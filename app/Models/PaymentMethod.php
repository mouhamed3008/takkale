<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PaymentMethod extends Model
{
    use HasFactory;

    //

    public const ABILITIES_LIST = [
        'Payment methods' => [
            ['name' => 'list_payment_method', 'label' => 'Afficher toutes les méthodes de paiement', 'key' => 'PAYMENT_METHOD'],
            ['name' => 'create_payment_method', 'label' => 'Ajouter une méthode de paiement', 'key' => 'PAYMENT_METHOD'],
            ['name' => 'read_payment_method', 'label' => 'Voir une méthode de paiement', 'key' => 'PAYMENT_METHOD'],
            ['name' => 'update_payment_method', 'label' => 'Modifier une méthode de paiement', 'key' => 'PAYMENT_METHOD'],
            ['name' => 'delete_payment_method', 'label' => 'Supprimer une méthode de paiement', 'key' => 'PAYMENT_METHOD'],
        ]
    ];

    protected $fillable = ['name', 'active'];

    public function scopeActive(Builder $query)
    {
        return $query->where('active', true);
    }
}
