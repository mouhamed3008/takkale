<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;


class ProductRepository extends BaseRepository
{
    //
    protected $fieldsSearchable = [
        'name',
        'active',
    ];

    public function getFieldsSearchable()
    {
        return $this->fieldsSearchable;
    }

    public function model()
    {
        return \App\Models\Product::class;
    }
}
