<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Repositories\RoleRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    //

    protected $userRepository;
    protected $roleRepository;

    public function __construct(
        UserRepository $userRepository,
        RoleRepository $roleRepository,

    ) {
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
    }
    public function index()
    {
        $this->authorize('list_user');
        $users = $this->userRepository->allQuery()->where(['company_id' => current_user()->company_id])->paginate(10);
        $roles            = $this->roleRepository->allQuery()->where(['company_id' => current_user()->company_id])->orderBy('name')->pluck('name', 'id')->toArray();
        return Inertia::render('users/index', [
            'users' => $users,
            'roles' => $roles,
            'open' => true,
            'flash' => session()->get('success'),
        ]);
    }

    public function create()
    {
        $this->authorize('create_user');
        $roles = $this->roleRepository->allQuery()->orderBy('name')->pluck('name', 'id')->toArray();
        return Inertia::render('users/create', [
            'roles' => $roles,
        ]);
    }
}
