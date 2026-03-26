import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Cart\CartController::add
* @see app/Http/Controllers/Cart/CartController.php:19
* @route '/cart/add'
*/
export const add = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: add.url(options),
    method: 'post',
})

add.definition = {
    methods: ["post"],
    url: '/cart/add',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Cart\CartController::add
* @see app/Http/Controllers/Cart/CartController.php:19
* @route '/cart/add'
*/
add.url = (options?: RouteQueryOptions) => {
    return add.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Cart\CartController::add
* @see app/Http/Controllers/Cart/CartController.php:19
* @route '/cart/add'
*/
add.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: add.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Cart\CartController::add
* @see app/Http/Controllers/Cart/CartController.php:19
* @route '/cart/add'
*/
const addForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: add.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Cart\CartController::add
* @see app/Http/Controllers/Cart/CartController.php:19
* @route '/cart/add'
*/
addForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: add.url(options),
    method: 'post',
})

add.form = addForm

/**
* @see \App\Http\Controllers\Cart\CartController::remove
* @see app/Http/Controllers/Cart/CartController.php:45
* @route '/cart/remove'
*/
export const remove = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: remove.url(options),
    method: 'post',
})

remove.definition = {
    methods: ["post"],
    url: '/cart/remove',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Cart\CartController::remove
* @see app/Http/Controllers/Cart/CartController.php:45
* @route '/cart/remove'
*/
remove.url = (options?: RouteQueryOptions) => {
    return remove.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Cart\CartController::remove
* @see app/Http/Controllers/Cart/CartController.php:45
* @route '/cart/remove'
*/
remove.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: remove.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Cart\CartController::remove
* @see app/Http/Controllers/Cart/CartController.php:45
* @route '/cart/remove'
*/
const removeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: remove.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Cart\CartController::remove
* @see app/Http/Controllers/Cart/CartController.php:45
* @route '/cart/remove'
*/
removeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: remove.url(options),
    method: 'post',
})

remove.form = removeForm

/**
* @see \App\Http\Controllers\Cart\CartController::clear
* @see app/Http/Controllers/Cart/CartController.php:59
* @route '/cart/clear'
*/
export const clear = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: clear.url(options),
    method: 'post',
})

clear.definition = {
    methods: ["post"],
    url: '/cart/clear',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Cart\CartController::clear
* @see app/Http/Controllers/Cart/CartController.php:59
* @route '/cart/clear'
*/
clear.url = (options?: RouteQueryOptions) => {
    return clear.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Cart\CartController::clear
* @see app/Http/Controllers/Cart/CartController.php:59
* @route '/cart/clear'
*/
clear.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: clear.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Cart\CartController::clear
* @see app/Http/Controllers/Cart/CartController.php:59
* @route '/cart/clear'
*/
const clearForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: clear.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Cart\CartController::clear
* @see app/Http/Controllers/Cart/CartController.php:59
* @route '/cart/clear'
*/
clearForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: clear.url(options),
    method: 'post',
})

clear.form = clearForm

/**
* @see \App\Http\Controllers\Cart\CartController::updatePrice
* @see app/Http/Controllers/Cart/CartController.php:67
* @route '/cart/update-price'
*/
export const updatePrice = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePrice.url(options),
    method: 'post',
})

updatePrice.definition = {
    methods: ["post"],
    url: '/cart/update-price',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Cart\CartController::updatePrice
* @see app/Http/Controllers/Cart/CartController.php:67
* @route '/cart/update-price'
*/
updatePrice.url = (options?: RouteQueryOptions) => {
    return updatePrice.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Cart\CartController::updatePrice
* @see app/Http/Controllers/Cart/CartController.php:67
* @route '/cart/update-price'
*/
updatePrice.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePrice.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Cart\CartController::updatePrice
* @see app/Http/Controllers/Cart/CartController.php:67
* @route '/cart/update-price'
*/
const updatePriceForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePrice.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Cart\CartController::updatePrice
* @see app/Http/Controllers/Cart/CartController.php:67
* @route '/cart/update-price'
*/
updatePriceForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePrice.url(options),
    method: 'post',
})

updatePrice.form = updatePriceForm

const CartController = { add, remove, clear, updatePrice }

export default CartController