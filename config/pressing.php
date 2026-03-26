<?php


return [

    'filters' => [
        'operators' => [
            '='           => 'Égale à (=)',
            '>'           => 'Supérieure à (>)',
            '<'           => 'Inférieure à (<)',
            '>='          => 'Supérieure ou égale à (>=)',
            '<='          => 'Inférieure ou égale à (<=)',
            'contains'    => 'Contient le texte',
            'starts_with' => 'Commence par',
            'ends_with'   => 'Finit par',
        ],
    ],

    'phone_number_validation' => [
        'enable' => true,
    ],

    // 'defaults' => [
    //     'password' => '$2y$10$xWiRCvFQIo.D04CRGYwRE.4IbfKO/K7EVzaaRKRF2jkRBoMLJrc9W',
    //     'password_min_length' => 9,
    //     'force_change_password' => (bool)env('FORCE_PASSWORD_CHANGE', true),
    //     'confirmation_token_duration' => env('CONFIRMATION_TOKEN_DURATION', 5),
    // ],




    // 'otp' => [
    //     'activate' => true,
    //     'expire_minutes' => 5,
    // ],

    // 'password_history' => [
    //     'activate' => true,
    //     'recent_passwords_tobe_checked' => 3,
    // ],

    // 'payment' => [
    //     'activation' => (bool)env('PAYMENT_ACTIVATION', false),
    // ],





    // 'encrypt_env' => [
    //     'prefix' => 'ENC!',
    // ],




    // 'sms' => [
    //     'endpoint' => env('SMS_ENDPOINT', 'https://talendtest.free.sn:8033/services/SendNotifications.aspx'),
    //     'sender' => env('SMS_SENDER', 'FIBRE FREE')
    // ],

    // 'mail' => [
    //     'infofibre_mail_address' => env('INFOFIBRE_MAIL_ADDRESS', 'infofibre@free.sn'),
    //     'send_to_infofibre_mail_address' => env('SEND_MAIL_TO_INFOFIBRE_MAIL_ADDRESS', true),
    //     'ops_free_mail_adress'   => env('OPS_FREE_MAIL_ADRESS', 'ops@free.sn'),
    // ],



    'permissions' => [
        'ADMIN'                    => 'GRANT_ALL_PRIVILEGES',


        'cache' => [
            'enabled'         => (bool) env('PERMISSION_CACHE_ENABLED', true),
            'expiration_time' => 30, // temps d'expiration en minutes
            'key'             => 'pressing_abilities',
        ],
    ],


    'security' => [
        'hidden_attributes' => [
            'old_password',
            'password_confirmation',
            'new_password_confirmation',
            'new_password',
            'password',
            'token',
            'otp',
            'pin',
            '_token',
            '_method',
        ],
    ],



    'percentage_to_apply' => env('PERCENTAGE_TO_APPLY', 10),
];
