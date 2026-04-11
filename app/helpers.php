<?php

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Facades\Log;
use libphonenumber\PhoneNumberUtil;
use Propaganistas\LaravelPhone\PhoneNumber;


if (! function_exists('current_user_can')) {
    function current_user_can($ability)
    {

        /** @var \App\Models\User */

        $user = current_user();

        return $user->can($ability);
    }
}

if (! function_exists('current_role')) {
    function current_role()
    {

        /** @var \App\Models\User */

        $user = current_user();

        return $user ? $user->roles()->pluck('name')->first() : null;
    }
}

if (! function_exists('current_user')) {
    function current_user($guard = 'web')
    {
        return auth($guard)->check() ? auth($guard)->user() : false;
    }
}


if (! function_exists('getIp')) {
    function getIp()
    {
        return $_SERVER['HTTP_X_CUSTOM_XFF'] ?? request()->ip();
    }
}


if (! function_exists('timezone_format')) {
    function timezone_format($date = null)
    {
        $date = is_null($date) ? now() : $date;
        return $date->toISOString();
    }
}

if (! function_exists('sanitizeStatus')) {
    function sanitizeStatus($name)
    {
        $status = Str::replace('EN_ATTENTE_DE_', '', $name);
        return Str::replace('_', ' ', $status);
    }
}



if (! function_exists('action_log')) {
    function action_log($message, $data = [], $channel = 'actions', $method = 'info')
    {

        $message = $message . '. [REQUEST PARAMETERS]: ' . request_to_log() . (request()->has('trx_id') ? ". [TRANSACTION ID]: " . request('trx_id') : '');

        $message = is_string($message) ? $message : json_encode($message);

        $authInstance = optional($channel === 'api_actions' ? auth('api') : auth());

        $defaultData = [
            'event_id'    => Str::random(20),
            'status'      => 'SUCCESS',
            'user_id'     => $authInstance->id(),
            'user_name'   => $authInstance->user()->name->full ?? '',
            'user_email'  => $authInstance->user()->email ?? '',
            'description' => $message,
            'comment'     => 'Sans commentaire',
            'date'        => timezone_format(),
            'url'         => Request::url(),
            'ip_address'  => getIp(),
        ];

        try {
            $data = array_merge($defaultData, $data);
            Log::channel($channel)->{$method}($message, $data);
        } catch (\Throwable $th) {
            Log::warning(__('error_writing_log_file'));
        }
    }
}

if (! function_exists('api_action_log')) {
    function api_action_log($message, $data = [])
    {
        action_log("API - " . $message, $data, 'api_actions');
    }
}


if (! function_exists('request_to_log')) {
    function request_to_log()
    {
        $hidden_attributes = config('pressing.security.hidden_attributes');

        $request = collect(request()->all());

        return json_encode($request->except($hidden_attributes)->all());
    }
}


if (! function_exists('v_asset')) {
    function v_asset($path, $secure = null)
    {
        return asset($path, $secure) . getAutoVersion($path);
    }
}
if (! function_exists('getAutoVersion')) {
    function getAutoVersion($path)
    {
        $fullPath = public_path($path);
        if (file_exists($fullPath)) {
            return '?v=' . filemtime($fullPath);
        }
        return '';
    }
}

if (! function_exists('html_list')) {
    function html_list(array $items, string $type = 'ul'): string
    {
        $htmlPart = array_map(fn($item) => new HtmlString("<li>{$item}</li>"), $items);

        $parts = [new HtmlString('<' . $type . '>'), ...$htmlPart, new HtmlString('</' . $type . '>')];

        return join('', $parts);
    }
}



if (! function_exists('is_valid_phone_number')) {
    function is_valid_phone_number($value, $countryCode = 'SN')
    {
        try {
            $value = trim($value);

            if (empty($value)) {
                return false;
            }

            $phoneUtil = PhoneNumberUtil::getInstance();

            return $phoneUtil->isValidNumber(
                $phoneUtil->parse($value, $countryCode)
            );
        } catch (\Exception $e) {
            return false;
        }
    }
}

if (! function_exists('format_phone_number')) {
    function format_phone_number($phoneNumber, $countryCode = 'SN', $prependPrefix = true)
    {
        if (! config('fttxonboarding.phone_number_validation.enable')) return;

        if ($phoneNumber === null) {
            return null;
        }

        $result = PhoneNumber::make($phoneNumber, $countryCode)->formatE164();

        if ($prependPrefix) {
            return prepend_with_prefix($result);
        }

        return $result;
    }
}
if (! function_exists('prepend_with_prefix')) {
    function prepend_with_prefix($phoneNumber)
    {
        $prefix = config('fttxonboarding.phone_number_validation.prefix');

        if ($prefix && ! Str::startsWith($phoneNumber, $prefix)) {
            return $prefix . ltrim($phoneNumber, '0');
        }

        return $phoneNumber;
    }
}
