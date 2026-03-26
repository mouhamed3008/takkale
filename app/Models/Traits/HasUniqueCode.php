<?php

namespace App\Models\Traits;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait HasUniqueCode
{
    /**
     * Nom de l’attribut pour le code
     * Par défaut 'code', mais tu peux le surcharger dans le modèle
     */
    protected static string $codeAttribute = 'code';

    /**
     * Préfixe du code, surcharge dans le modèle si besoin
     */
    protected static string $codePrefix = 'ORD-';

    /**
     * Boot du trait
     */
    public static function bootHasUniqueCode()
    {
        static::creating(function ($model) {


            // Générer un code unique si le modèle a le champ $codeAttribute
            $codeField = static::$codeAttribute;
            if ($model->$codeField === null) {
                $prefix = static::$codePrefix ?: now()->format('Ymd') . '-';
                $number = DB::table($model->getTable())
                    ->where($codeField, 'like', $prefix . '%')
                    ->max(DB::raw("CAST(SUBSTRING($codeField, " . (strlen($prefix) + 1) . ") AS UNSIGNED)"));

                $nextNumber = $number ? $number + 1 : 1;
                $model->$codeField = $prefix . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
            }
        });
    }
}
