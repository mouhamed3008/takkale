<?php

namespace App\Models\Traits;

use Illuminate\Support\HtmlString;

trait Activable
{
    public function scopeActive($query, $active = true)
    {
        return $query->where($this->activeField(), $active);
    }

    public function scopeInactive($query)
    {
        return $this->scopeActive($query, false);
    }

    public function toggleActivation()
    {
        $newValue = ! $this->getAttribute($this->activeField());
        $this->update([$this->activeField() => $newValue]);
        return $newValue;
    }

    public function getActiveBadgeAttribute()
    {
        if ($this->{$this->activeField()}) return new HtmlString('<span class="badge badge-success">' . $this->activeLabel() . '</span>');
        return new HtmlString('<span class="badge badge-danger">' . $this->inactiveLabel() . '</span>');
    }

    public function activeField()
    {
        return 'active';
    }

    public function activeLabel()
    {
        return __('Active');
    }

    public function inactiveLabel()
    {
        return __('Inactive');
    }
}
