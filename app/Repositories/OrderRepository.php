<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;


class OrderRepository extends BaseRepository
{
    //
    protected $fieldsSearchable = [
        'code',
        'status',
        'type',
        'delivery_at',
        'payment_status',
    ];

    public function getFieldsSearchable()
    {
        return $this->fieldsSearchable;
    }

    public function model()
    {
        return \App\Models\Order::class;
    }
}
