<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Role extends Model
{
    //
    use HasFactory;
    // use Sortable;

    public $sortable = [
        'name',
        'label',
    ];

    protected $dates = ['deleted_at'];

    protected $guarded = [];

    public const ABILITIES_LIST = [
        'Rôles' => [
            ['name' => 'list_role', 'label' => 'Afficher les rôles', 'key' => 'ROLE'],
            ['name' => 'create_role', 'label' => 'Créer un rôle', 'key' => 'ROLE'],
            ['name' => 'read_role', 'label' => 'Voir un rôle', 'key' => 'ROLE'],
            ['name' => 'update_role', 'label' => 'Modifier un rôle', 'key' => 'ROLE'],
            ['name' => 'delete_role', 'label' => 'Supprimer un rôle', 'key' => 'ROLE'],
        ]
    ];



    const LIST = [
        [
            'name'  => 'ADMIN',
            'label' => 'ADMIN',
        ],
        [
            'name'  => 'GESTIONNAIRE',
            'label' => 'GESTIONNAIRE',
        ],
    ];


    public function abilities()
    {
        return $this->belongsToMany(Ability::class)->withTimestamps();
    }

    public function allowTo($ability)
    {
        $this->abilities()->sync($ability);
    }

    public function syncPermissions($ability)
    {
        $this->abilities()->save($ability);
    }

    public function deleteAllPermissions()
    {
        return $this->abilities()->sync([]);
    }

    public static function ofType($name)
    {
        return static::where('name', $name)->pluck('id')->all();
    }

    public function isAdministrator()
    {
        return Str::contains(strtolower($this->name), 'admin');
    }

    public static function isAdmin($id)
    {
        $name = static::where('id', $id)->value('name');

        return $name && Str::contains(strtolower($name), 'admin');
    }

    public function allowAllAbilities()
    {
        return $this->allowTo(Ability::all());
    }
}
