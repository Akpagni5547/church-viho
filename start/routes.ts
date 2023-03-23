/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

//* Route guest
Route.group(() => {
  Route.get('/', 'AuthController.index')
  Route.get('/login', 'AuthController.loginPage')
  Route.post('/login', 'AuthController.login').as('auth.login')
}).middleware('guest')

//* Route protected

Route.group(() => {
  Route.get('/dashboard', 'DashboardController.index').as('dashboard')
  Route.get('/logout', 'AuthController.logout').as('auth.logout')
  Route.get('/make-present/:id', 'ListCallsController.makePresent').as('fideles.present')
  Route.get('/make-absent/:id', 'ListCallsController.makeAbsent').as('fideles.absent')
  Route.get('users/delete/:id', 'UsersController.destroy').as('users.destroy')
  Route.get('fideles/delete/:id', 'FidelesController.destroy').as('fideles.destroy')
  Route.resource('/users', 'UsersController')
    .only(['index', 'store', 'update', 'create', 'edit'])
    .as('users')
  Route.resource('/fideles', 'FidelesController')
    .only(['index', 'store', 'update', 'create', 'edit', 'show'])
    .as('fideles')
  Route.resource('/finances', 'FinancesController')
    .only(['index', 'store', 'create'])
    .as('finances')
  Route.resource('/profils', 'ProfilsController')
    .only(['index', 'update'])
    .middleware({
      '*': ['auth'],
    })
    .as('profils')
  Route.post('/profils', 'ProfilsController.updatePassword').middleware('auth').as('updatePassword')
}).middleware('auth')

Route.get('/server-error', async ({ view }) => {
  return view.render('errors/server-error')
})

Route.get('/not-found', async ({ view }) => {
  return view.render('errors/not-found')
})
