import UserController from '../user.js';
import UserService from '../../services/user.js';
import MockUtils from '../../tests/mockUtils.js';

describe('UserController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = MockUtils.mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('onAddUser() method', () => {
    beforeEach(() => {
      jest.spyOn(UserService, 'addUser').mockResolvedValue({ id: 123 });
      req = {
        body: {
          name: 'userName',
        },
      };
    });

    it('should call UserService.addUser with request body', async () => {
      await UserController.onAddUser(req, res);
      expect(UserService.addUser).toHaveBeenCalledWith({ name: 'userName' });
    });

    it('should send json with created user info', async () => {
      await UserController.onAddUser(req, res);
      expect(res.json).toBeCalledWith({ id: 123 });
    });
  });

  describe('onUpdateUser() method', () => {
    beforeEach(() => {
      jest.spyOn(UserService, 'updateUser').mockResolvedValue({});
      req = {
        params: {
          id: 123,
        },
        body: {
          name: 'userName',
        },
      };
    });

    it('should call UserService.updateUser with user id and request body', async () => {
      await UserController.onUpdateUser(req, res);
      expect(UserService.updateUser).toHaveBeenCalledWith(123, {
        name: 'userName',
      });
    });

    it('should send status 200', async () => {
      await UserController.onUpdateUser(req, res);
      expect(res.status).toBeCalledWith(200);
    });

    it('should send json with specific message', async () => {
      await UserController.onUpdateUser(req, res);
      expect(res.json).toBeCalledWith({
        message: 'User with id = 123 is updated',
      });
    });
  });

  describe('onGetUser() method', () => {
    let getUserSpy;

    beforeEach(() => {
      getUserSpy = jest.spyOn(UserService, 'getUser');
      req = {
        params: {
          id: 123,
        },
      };
    });

    it('should call UserService.getUser with user id', async () => {
      getUserSpy.mockResolvedValue(null);
      await UserController.onGetUser(req, res);
      expect(UserService.getUser).toHaveBeenCalledWith(123);
    });

    it('should send json with user info if user exist', async () => {
      getUserSpy.mockResolvedValue({ id: 123 });
      await UserController.onGetUser(req, res);
      expect(res.json).toBeCalledWith({ id: 123 });
    });

    it('should send status 404 if user does not exist', async () => {
      getUserSpy.mockResolvedValue(null);
      await UserController.onGetUser(req, res);
      expect(res.status).toBeCalledWith(404);
    });

    it('should send json with specific message if user does not exist', async () => {
      getUserSpy.mockResolvedValue(null);
      await UserController.onGetUser(req, res);
      expect(res.json).toBeCalledWith({
        message: 'User with id = 123 not found',
      });
    });
  });

  describe('onDeleteUser() method', () => {
    beforeEach(() => {
      jest.spyOn(UserService, 'deleteUser').mockResolvedValue({});
      req = {
        params: {
          id: 123,
        },
      };
    });

    it('should call UserService.deleteUser with user id', async () => {
      await UserController.onDeleteUser(req, res);
      expect(UserService.deleteUser).toHaveBeenCalledWith(123);
    });

    it('should send status 200', async () => {
      await UserController.onDeleteUser(req, res);
      expect(res.status).toBeCalledWith(200);
    });

    it('should send json with specific message', async () => {
      await UserController.onDeleteUser(req, res);
      expect(res.json).toBeCalledWith({
        message: 'User with id = 123 is deleted',
      });
    });
  });

  describe('onGetAutosuggestedUsers() method', () => {
    beforeEach(() => {
      jest
        .spyOn(UserService, 'getAutoSuggestUsers')
        .mockResolvedValue([{ id: 123 }]);
      req = {
        query: {
          loginSubstring: 'someLogin',
          limit: 10,
        },
      };
    });

    it('should call UserService.getAutoSuggestUsers with request query', async () => {
      await UserController.onGetAutosuggestedUsers(req, res);
      expect(UserService.getAutoSuggestUsers).toHaveBeenCalledWith({
        loginSubstring: 'someLogin',
        limit: 10,
      });
    });

    it('should send json with all appropriate users', async () => {
      await UserController.onGetAutosuggestedUsers(req, res);
      expect(res.json).toBeCalledWith([{ id: 123 }]);
    });
  });
});
