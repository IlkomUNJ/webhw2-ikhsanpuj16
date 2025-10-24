/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from 'App/Controllers/Http/AuthController'
import WishlistsController from 'App/Controllers/Http/WishlistsController'

router.on('/').render('pages/home')
router.on('/about').render('pages/about')
router.on('/contact').render('pages/contact')
router.on('/products').render('pages/products')

// Auth routes (simple register/login pages)
router.get('/register', async (ctx: any) => ctx.view.render('auth/register'))
router.get('/login', async (ctx: any) => ctx.view.render('auth/login'))

// Auth actions
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)

// Wishlist UI (render page) and API (requires auth)
router.get('/wishlist', async (ctx: any) => {
	try {
		await ctx.auth.authenticate()
	} catch (e) {
		return ctx.response.redirect('/login')
	}

	// fetch wishlist items for server-side rendering
	const items = await (await import('App/Controllers/Http/WishlistsController')).default.index(ctx)
	return ctx.view.render('pages/wishlist', { items })
})
router.get('/api/wishlist', WishlistsController.index).middleware(['auth'] as any)
router.post('/api/wishlist', WishlistsController.store).middleware(['auth'] as any)
router.delete('/api/wishlist/:id', WishlistsController.destroy).middleware(['auth'] as any)
