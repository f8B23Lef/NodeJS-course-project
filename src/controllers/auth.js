import AuthService from '../services/auth.js';

export default class AuthController {
  static async onLogin(req, res, next) {
    res.json(await AuthService.login(req.body));
    next();
  }
}
