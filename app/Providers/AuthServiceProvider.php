<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Cache;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::before(function (User $user, $ability) {
            if (config('pressing.permissions.cache.enabled')) {
                $abilities = $this->cacheAbilitiesFor($user);
            } else {
                $abilities = $user->abilities();
            }
            return $abilities->contains($ability) ? true : null;
        });
    }

    private function cacheAbilitiesFor(User $user)
    {
        return Cache::remember(
            config('pressing.permissions.cache.key'),
            now()->addMinutes(
                config('pressing.permissions.cache.expiration_time')
            ),
            fn() => $user->abilities()
        );
    }
}
