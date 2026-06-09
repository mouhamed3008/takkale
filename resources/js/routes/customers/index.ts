import { applyUrlDefaults, queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\CustomerController::index
* @see app/Http/Controllers/Customer/CustomerController.php:20
* @route '/customers'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/customers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\CustomerController::index
* @see app/Http/Controllers/Customer/CustomerController.php:20
* @route '/customers'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CustomerController::index
* @see app/Http/Controllers/Customer/CustomerController.php:20
* @route '/customers'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\CustomerController::index
* @see app/Http/Controllers/Customer/CustomerController.php:20
* @route '/customers'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\CustomerController::index
* @see app/Http/Controllers/Customer/CustomerController.php:20
* @route '/customers'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\CustomerController::index
* @see app/Http/Controllers/Customer/CustomerController.php:20
* @route '/customers'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\CustomerController::index
* @see app/Http/Controllers/Customer/CustomerController.php:20
* @route '/customers'
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
* @see \App\Http\Controllers\Customer\CustomerController::store
* @see app/Http/Controllers/Customer/CustomerController.php:30
* @route '/customers'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/customers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\CustomerController::store
* @see app/Http/Controllers/Customer/CustomerController.php:30
* @route '/customers'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CustomerController::store
* @see app/Http/Controllers/Customer/CustomerController.php:30
* @route '/customers'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CustomerController::store
* @see app/Http/Controllers/Customer/CustomerController.php:30
* @route '/customers'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CustomerController::store
* @see app/Http/Controllers/Customer/CustomerController.php:30
* @route '/customers'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Customer\CustomerController::update
* @see app/Http/Controllers/Customer/CustomerController.php:65
* @route '/customers/{customer}'
*/
export const update = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/customers/{customer}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Customer\CustomerController::update
* @see app/Http/Controllers/Customer/CustomerController.php:65
* @route '/customers/{customer}'
*/
update.url = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { customer: args }
    }

    if (Array.isArray(args)) {
        args = {
            customer: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customer: args.customer,
    }

    return update.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CustomerController::update
* @see app/Http/Controllers/Customer/CustomerController.php:65
* @route '/customers/{customer}'
*/
update.put = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Customer\CustomerController::update
* @see app/Http/Controllers/Customer/CustomerController.php:65
* @route '/customers/{customer}'
*/
update.patch = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Customer\CustomerController::update
* @see app/Http/Controllers/Customer/CustomerController.php:65
* @route '/customers/{customer}'
*/
const updateForm = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CustomerController::update
* @see app/Http/Controllers/Customer/CustomerController.php:65
* @route '/customers/{customer}'
*/
updateForm.put = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CustomerController::update
* @see app/Http/Controllers/Customer/CustomerController.php:65
* @route '/customers/{customer}'
*/
updateForm.patch = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Customer\CustomerController::destroy
* @see app/Http/Controllers/Customer/CustomerController.php:82
* @route '/customers/{customer}'
*/
export const destroy = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/customers/{customer}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Customer\CustomerController::destroy
* @see app/Http/Controllers/Customer/CustomerController.php:82
* @route '/customers/{customer}'
*/
destroy.url = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { customer: args }
    }

    if (Array.isArray(args)) {
        args = {
            customer: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customer: args.customer,
    }

    return destroy.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CustomerController::destroy
* @see app/Http/Controllers/Customer/CustomerController.php:82
* @route '/customers/{customer}'
*/
destroy.delete = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Customer\CustomerController::destroy
* @see app/Http/Controllers/Customer/CustomerController.php:82
* @route '/customers/{customer}'
*/
const destroyForm = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CustomerController::destroy
* @see app/Http/Controllers/Customer/CustomerController.php:82
* @route '/customers/{customer}'
*/
destroyForm.delete = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const customers = {
    index,
    store,
    update,
    destroy,
}

export default customers
