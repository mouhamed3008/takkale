<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;


class PaymentMethodRepository extends BaseRepository
{
    protected $fieldsSearchable = [
        'name',
    ];

    public function getFieldsSearchable()
    {
        return $this->fieldsSearchable;
    }

    public function model()
    {
        return \App\Models\PaymentMethod::class;
    }
}
