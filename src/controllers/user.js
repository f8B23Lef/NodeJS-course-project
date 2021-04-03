import UserService from '../services/user.js';

export default class UserController {
  static async onAddUser(req, res) {
    res.json(await UserService.addUser(req.body));
  }

  static async onUpdateUser(req, res) {
    await UserService.updateUser(req.params.id, req.body);
    res
      .status(200)
      .json({ message: `User with id = ${req.params.id} is updated` });
  }

  static async onGetUser(req, res) {
    const user = await UserService.getUser(req.params.id);

    if (user) {
      res.json(user);
    } else {
      res
        .status(404)
        .json({ message: `User with id = ${req.params.id} not found` });
    }
  }

  static async onDeleteUser(req, res) {
    await UserService.deleteUser(req.params.id);
    res
      .status(200)
      .json({ message: `User with id = ${req.params.id} is deleted` });
  }

  static async onGetAutosuggestedUsers(req, res) {
    res.json(await UserService.getAutoSuggestUsers(req.query));
  }
}
