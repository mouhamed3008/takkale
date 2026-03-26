import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\POS\PosController::index
* @see app/Http/Controllers/POS/PosController.php:36
* @route '/pos'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\POS\PosController::index
* @see app/Http/Controllers/POS/PosController.php:36
* @route '/pos'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POS\PosController::index
* @see app/Http/Controllers/POS/PosController.php:36
* @route '/pos'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POS\PosController::index
* @see app/Http/Controllers/POS/PosController.php:36
* @route '/pos'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\POS\PosController::index
* @see app/Http/Controllers/POS/PosController.php:36
* @route '/pos'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POS\PosController::index
* @see app/Http/Controllers/POS/PosController.php:36
* @route '/pos'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

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
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\POS\PosController::orders
* @see app/Http/Controllers/POS/PosController.php:58
* @route '/pos/orders'
*/
export const orders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})

orders.definition = {
    methods: ["get","head"],
    url: '/pos/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\POS\PosController::orders
* @see app/Http/Controllers/POS/PosController.php:58
* @route '/pos/orders'
*/
orders.url = (options?: RouteQueryOptions) => {
    return orders.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POS\PosController::orders
* @see app/Http/Controllers/POS/PosController.php:58
* @route '/pos/orders'
*/
orders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POS\PosController::orders
* @see app/Http/Controllers/POS/PosController.php:58
* @route '/pos/orders'
*/
orders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: orders.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\POS\PosController::orders
* @see app/Http/Controllers/POS/PosController.php:58
* @route '/pos/orders'
*/
const ordersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: orders.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POS\PosController::orders
* @see app/Http/Controllers/POS/PosController.php:58
* @route '/pos/orders'
*/
ordersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: orders.url(options),
    method: 'get',
})

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
        }
    }),
    method: 'get',
})

orders.form = ordersForm

/**
* @see \App\Http\Controllers\POS\PosController::showOrder
* @see app/Http/Controllers/POS/PosController.php:98
* @route '/pos/orders/{id}'
*/
export const showOrder = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showOrder.url(args, options),
    method: 'get',
})

showOrder.definition = {
    methods: ["get","head"],
    url: '/pos/orders/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\POS\PosController::showOrder
* @see app/Http/Controllers/POS/PosController.php:98
* @route '/pos/orders/{id}'
*/
showOrder.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return showOrder.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\POS\PosController::showOrder
* @see app/Http/Controllers/POS/PosController.php:98
* @route '/pos/orders/{id}'
*/
showOrder.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showOrder.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POS\PosController::showOrder
* @see app/Http/Controllers/POS/PosController.php:98
* @route '/pos/orders/{id}'
*/
showOrder.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showOrder.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\POS\PosController::showOrder
* @see app/Http/Controllers/POS/PosController.php:98
* @route '/pos/orders/{id}'
*/
const showOrderForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showOrder.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POS\PosController::showOrder
* @see app/Http/Controllers/POS/PosController.php:98
* @route '/pos/orders/{id}'
*/
showOrderForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showOrder.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POS\PosController::showOrder
* @see app/Http/Controllers/POS/PosController.php:98
* @route '/pos/orders/{id}'
*/
showOrderForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showOrder.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showOrder.form = showOrderForm

const PosController = { index, orders, showOrder }

export default PosController