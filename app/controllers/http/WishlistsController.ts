import Wishlist from 'App/Models/Wishlist'

export default class WishlistsController {
  public async index (ctx: any) {
    const { auth } = ctx
    const user = auth.user!
    return Wishlist.query().where('user_id', user.id)
  }

  public static async index (ctx: any) {
    return new WishlistsController().index(ctx)
  }

  public async store (ctx: any) {
    const { auth, request } = ctx
    const user = auth.user!
    const { productName, productImage, productPrice } = request.only(['productName', 'productImage', 'productPrice'])
    const wishlist = await Wishlist.create({ userId: user.id, productName, productImage, productPrice })
    return wishlist
  }

  public static async store (ctx: any) {
    return new WishlistsController().store(ctx)
  }

  public async destroy (ctx: any) {
    const { auth, params } = ctx
    const user = auth.user!
    const wishlist = await Wishlist.findOrFail(params.id)
    if (wishlist.userId !== user.id) {
      return { error: 'Forbidden' }
    }
    await wishlist.delete()
    return { success: true }
  }

  public static async destroy (ctx: any) {
    return new WishlistsController().destroy(ctx)
  }
}
