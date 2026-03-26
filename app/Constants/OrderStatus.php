<?php

namespace App\Constants;

class OrderStatus
{
    public const NEW = 'new';
    public const CANCELLED = 'cancelled';
    public const TERMINATED = 'finished';

    public static function getStatuses(): array
    {
        return [
            self::NEW,
            self::CANCELLED,
            self::TERMINATED,
        ];
    }
}
