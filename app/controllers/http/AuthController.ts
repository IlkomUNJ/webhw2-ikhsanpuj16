import User from 'App/Models/User'

export default class AuthController {
  public async register (ctx: any) {
    const { request, auth, response, session } = ctx
    const { fullName, email, password } = request.only(['fullName', 'email', 'password'])
    if (!email || !password) {
      session.flash({ error: 'Email and password are required' })
      return response.redirect('/register')
    }
    const existing = await User.findBy('email', email)
    if (existing) {
      session.flash({ error: 'Email already registered' })
      return response.redirect('/register')
    }
    const user = await User.create({ fullName, email, password })
    await auth.login(user)
    session.flash({ success: 'Registration successful' })
    return response.redirect('/')
  }

  public static async register (ctx: any) {
    return new AuthController().register(ctx)
  }

  public async login (ctx: any) {
    const { request, auth, response, session } = ctx
    const { email, password } = request.only(['email', 'password'])
    try {
      await auth.use('web').attempt(email, password)
      return response.redirect('/')
    } catch (e) {
      session.flash({ error: 'Invalid credentials' })
      return response.redirect('/login')
    }
  }

  public static async login (ctx: any) {
    return new AuthController().login(ctx)
  }

  public async logout (ctx: any) {
    const { auth, response, session } = ctx
    await auth.logout()
    session.flash({ success: 'Logged out' })
    return response.redirect('/')
  }

  public static async logout (ctx: any) {
    return new AuthController().logout(ctx)
  }
}
