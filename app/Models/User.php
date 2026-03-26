<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Traits\HasRoles;
use App\Models\Traits\Activable;
// use Laravel\Sanctum\HasApiTokens;
use App\Models\Traits\HasMutators;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    // use HasApiTokens;
    use HasFactory, Notifiable;
    use HasRoles, HasMutators, Activable;


    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public const ABILITIES_LIST = [
        'Utilisateurs' => [
            ['name' => 'list_user', 'label' => 'Afficher tous les comptes utilisateurs', 'key' => 'USER'],
            ['name' => 'create_user', 'label' => 'Créer un compte utilisateur', 'key' => 'USER'],
            ['name' => 'read_user', 'label' => 'Voir les informations du compte', 'key' => 'USER'],
            ['name' => 'update_user', 'label' => 'Modifier les informations du compte utilisateur', 'key' => 'USER'],
            ['name' => 'disable_user', 'label' => 'Activer/Désactiver un compte utilisateur', 'key' => 'USER'],
            ['name' => 'assign_role', 'label' => 'Assigner un rôle à un compte utilisateur', 'key' => 'USER'],
        ]
    ];


    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = ['role', "company"];

    protected $appends = ['name', 'fullname', 'active_badge'];


    public function company()
    {
        return $this->hasOne(Company::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function assignAllAbilities()
    {
        $all_abilities = Ability::all();

        $this->roles()->get()->each(function ($role) use ($all_abilities) {
            $role->allowTo($all_abilities);
        });
    }

    public function isMe(): bool
    {
        return current_user()->id == $this->id;
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeInactive($query)
    {
        return $query->where('active', false);
    }
}
