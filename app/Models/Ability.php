<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ability extends Model
{
    //
    use HasFactory;
    use SoftDeletes;


    // protected $table = 'abilities';

    protected $dates = ['deleted_at'];

    protected $guarded = [];

    public const LIST = [
        'Permissions' => [
            ['name' => 'list_permission', 'label' => 'Afficher les permissions', 'key' => 'ABILITY'],
            ['name' => 'create_permission', 'label' => 'Créer une permission', 'key' => 'ABILITY'],
            ['name' => 'read_permission', 'label' => 'Voir une permission', 'key' => 'ABILITY'],
            ['name' => 'update_permission', 'label' => 'Modifier une permission', 'key' => 'ABILITY'],
            ['name' => 'delete_permission', 'label' => 'Supprimer une permission', 'key' => 'ABILITY'],
        ],
        'Journalisation' => [
            ['name' => 'list_log', 'label' => 'Afficher les logs', 'key' => 'LOG'],
            ['name' => 'read_log', 'label' => "Voir détail d'un log", 'key' => 'LOG'],
            ['name' => 'download_log', 'label' => "Télécharger le fichier des logs", 'key' => 'LOG'],
        ],


    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class)->withTimestamps();
    }

    // public function newCollection(array $models = [])
    // {
    //     // return new AbilityCollection($models);
    // }

    public static function getId($name)
    {
        return self::whereName($name)->value('id');
    }

    public function getAbilitiesWithIds()
    {
        return collect(self::LIST)
            ->values()
            ->collapse()
            ->reduce(
                fn($carry, $ability) => $carry + [$ability['name'] => self::getId($ability['name'])],
                []
            );
    }
}
