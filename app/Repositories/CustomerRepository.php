<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;


class CustomerRepository extends BaseRepository
{
    //
    protected $fieldsSearchable = [
        'fullname',
        'phone',
        'email',
    ];

    public function getFieldsSearchable()
    {
        return $this->fieldsSearchable;
    }

    public function model()
    {
        return \App\Models\Customer::class;
    }
}
