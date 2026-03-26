<?php

namespace App\Constants;

class CommandeType
{
    const SIMPLE = 'Simple';
    const PESER = 'Peser';

    public static function getTypes(): array
    {
        return [
            self::SIMPLE,
            self::PESER,
        ];
    }
}
