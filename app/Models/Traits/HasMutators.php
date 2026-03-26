<?php

namespace App\Models\Traits;

use Watson\Nameable\Name;
use Illuminate\Support\Str;


trait HasMutators
{

    public function setPhonenumberAttribute($phonenumber)
    {
        $this->attributes['phone'] = empty(trim($phonenumber)) ? null : $phonenumber;
    }

    public function getAvatarUrlAttribute()
    {
        if ($this->avatar) return sprintf("/storage/%s", $this->avatar);

        $name = trim(collect(explode(' ', $this->fullname))
            ->map(fn($segment) => mb_substr($segment, 0, 1))
            ->join(' '));

        $colorPrimary = str_replace('#', '', config('theme.color_primary'));
        $colorPrimaryContrast = str_replace('#', '', config('theme.color_primary_contrast'));

        return v_asset('img/default-avatar.jpeg');

        return 'https://ui-avatars.com/api/?name=' . urlencode($name) . '&color=' . $colorPrimaryContrast . '&background=' . $colorPrimary;
    }

    public function getFullnameAttribute()
    {
        return sprintf("%s", $this->attributes['name']);
    }

    public function getNameAttribute()
    {
        return $this->attributes['name'];
    }
}
