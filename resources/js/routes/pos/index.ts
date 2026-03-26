import { queryParams, type RouteDefinition, type RouteFormDefinition, type RouteQueryOptions } from './../../wayfinder';
/**
 * @see \App\Http\Controllers\POS\PosController::index
 * @see app/Http/Controllers/POS/PosController.php:36
 * @route '/pos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});

index.definition = {
    methods: ['get', 'head'],
    url: '/pos',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\POS\PosController::index
 * @see app/Http/Controllers/POS/PosController.php:36
 * @route '/pos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\POS\PosController::index
 * @see app/Http/Controllers/POS/PosController.php:36
 * @route '/pos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\POS\PosController::index
 * @see app/Http/Controllers/POS/PosController.php:36
 * @route '/pos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\POS\PosController::index
 * @see app/Http/Controllers/POS/PosController.php:36
 * @route '/pos'
 */
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\POS\PosController::index
 * @see app/Http/Controllers/POS/PosController.php:36
 * @route '/pos'
 */
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\POS\PosController::index
 * @see app/Http/Controllers/POS/PosController.php:36
 * @route '/pos'
 */
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

index.form = indexForm;

/**
 * @see \App\Http\Controllers\POS\PosController::orders
 * @see app/Http/Controllers/POS/PosController.php:58
 * @route '/pos/orders'
 */
export const orders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
});

orders.definition = {
    methods: ['get', 'head'],
    url: '/pos/orders',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\POS\PosController::orders
 * @see app/Http/Controllers/POS/PosController.php:58
 * @route '/pos/orders'
 */
orders.url = (options?: RouteQueryOptions) => {
    return orders.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\POS\PosController::orders
 * @see app/Http/Controllers/POS/PosController.php:58
 * @route '/pos/orders'
 */
orders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\POS\PosController::orders
 * @see app/Http/Controllers/POS/PosController.php:58
 * @route '/pos/orders'
 */
orders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: orders.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\POS\PosController::orders
 * @see app/Http/Controllers/POS/PosController.php:58
 * @route '/pos/orders'
 */
const ordersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: orders.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\POS\PosController::orders
 * @see app/Http/Controllers/POS/PosController.php:58
 * @route '/pos/orders'
 */
ordersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: orders.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\POS\PosController::orders
 * @see app/Http/Controllers/POS/PosController.php:58
 * @route '/pos/orders'
 */
ordersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: orders.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

orders.form = ordersForm;

const pos = {
    index,
    orders,
};

export default pos;
