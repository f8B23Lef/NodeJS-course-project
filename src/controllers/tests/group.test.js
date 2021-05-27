import GroupController from '../group.js';
import GroupService from '../../services/group.js';
import MockUtils from '../../tests/mockUtils.js';

jest.mock('../../services/group.js', () => {
  return {
    __esModule: true,
    default: {
      getGroup: jest.fn(),
      getAllGroups: jest.fn(),
      addGroup: jest.fn(),
      updateGroup: jest.fn(),
      deleteGroup: jest.fn(),
      addUsersToGroup: jest.fn(),
    },
  };
});

describe('GroupController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = MockUtils.mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('onGetGroup() method', () => {
    let getGroupSpy;

    beforeEach(() => {
      getGroupSpy = jest.spyOn(GroupService, 'getGroup');
      req = {
        params: {
          id: 123,
        },
      };
    });

    it('should call GroupService.getGroup with group id', async () => {
      getGroupSpy.mockResolvedValue(null);
      await GroupController.onGetGroup(req, res);
      expect(GroupService.getGroup).toHaveBeenCalledWith(123);
    });

    it('should send json with group info if group exist', async () => {
      getGroupSpy.mockResolvedValue({ id: 123 });
      await GroupController.onGetGroup(req, res);
      expect(res.json).toBeCalledWith({ id: 123 });
    });

    it('should send status 404 if group does not exist', async () => {
      getGroupSpy.mockResolvedValue(null);
      await GroupController.onGetGroup(req, res);
      expect(res.status).toBeCalledWith(404);
    });

    it('should send json with specific message if group does not exist', async () => {
      getGroupSpy.mockResolvedValue(null);
      await GroupController.onGetGroup(req, res);
      expect(res.json).toBeCalledWith({
        message: 'Group with id = 123 not found',
      });
    });
  });

  describe('onGetAllGroups() method', () => {
    let getAllGroupsSpy;

    beforeEach(() => {
      getAllGroupsSpy = jest.spyOn(GroupService, 'getAllGroups');
    });

    it('should call GroupService.getAllGroups', async () => {
      getAllGroupsSpy.mockResolvedValue([]);
      await GroupController.onGetAllGroups(req, res);
      expect(GroupService.getAllGroups).toHaveBeenCalled();
    });

    it('should send json with all groups if groups exist', async () => {
      getAllGroupsSpy.mockResolvedValue([{ id: 123 }, { id: 125 }]);
      await GroupController.onGetAllGroups(req, res);
      expect(res.json).toBeCalledWith([{ id: 123 }, { id: 125 }]);
    });

    it('should send status 404 if groups do not exist', async () => {
      getAllGroupsSpy.mockResolvedValue([]);
      await GroupController.onGetAllGroups(req, res);
      expect(res.status).toBeCalledWith(404);
    });

    it('should send json with specific message if groups do not exist', async () => {
      getAllGroupsSpy.mockResolvedValue([]);
      await GroupController.onGetAllGroups(req, res);
      expect(res.json).toBeCalledWith({
        message: 'Groups not found',
      });
    });
  });

  describe('onAddGroup() method', () => {
    beforeEach(() => {
      jest.spyOn(GroupService, 'addGroup').mockResolvedValue({ id: 123 });
      req = {
        body: {
          name: 'groupName',
        },
      };
    });

    it('should call GroupService.addGroup with request body', async () => {
      await GroupController.onAddGroup(req, res);
      expect(GroupService.addGroup).toHaveBeenCalledWith({ name: 'groupName' });
    });

    it('should send json with created group info', async () => {
      await GroupController.onAddGroup(req, res);
      expect(res.json).toBeCalledWith({ id: 123 });
    });
  });

  describe('onUpdateGroup() method', () => {
    beforeEach(() => {
      jest.spyOn(GroupService, 'updateGroup').mockResolvedValue({});
      req = {
        params: {
          id: 123,
        },
        body: {
          name: 'groupName',
        },
      };
    });

    it('should call GroupService.updateGroup with group id and request body', async () => {
      await GroupController.onUpdateGroup(req, res);
      expect(GroupService.updateGroup).toHaveBeenCalledWith(123, {
        name: 'groupName',
      });
    });

    it('should send status 200', async () => {
      await GroupController.onUpdateGroup(req, res);
      expect(res.status).toBeCalledWith(200);
    });

    it('should send json with specific message', async () => {
      await GroupController.onUpdateGroup(req, res);
      expect(res.json).toBeCalledWith({
        message: 'Group with id = 123 is updated',
      });
    });
  });

  describe('onDeleteGroup() method', () => {
    beforeEach(() => {
      jest.spyOn(GroupService, 'deleteGroup').mockResolvedValue({});
      req = {
        params: {
          id: 123,
        },
      };
    });

    it('should call GroupService.deleteGroup with group id', async () => {
      await GroupController.onDeleteGroup(req, res);
      expect(GroupService.deleteGroup).toHaveBeenCalledWith(123);
    });

    it('should send status 200', async () => {
      await GroupController.onDeleteGroup(req, res);
      expect(res.status).toBeCalledWith(200);
    });

    it('should send json with specific message', async () => {
      await GroupController.onDeleteGroup(req, res);
      expect(res.json).toBeCalledWith({
        message: 'Group with id = 123 is deleted',
      });
    });
  });

  describe('onAddUsersToGroup() method', () => {
    beforeEach(() => {
      jest.spyOn(GroupService, 'addUsersToGroup').mockResolvedValue({});
      req = {
        params: {
          id: 123,
        },
        body: {
          userIds: [1, 2],
        },
      };
    });

    it('should call GroupService.addUsersToGroup with request query', async () => {
      await GroupController.onAddUsersToGroup(req, res);
      expect(GroupService.addUsersToGroup).toHaveBeenCalledWith(123, {
        userIds: [1, 2],
      });
    });

    it('should send status 200', async () => {
      await GroupController.onAddUsersToGroup(req, res);
      expect(res.status).toBeCalledWith(200);
    });

    it('should send json with specific message', async () => {
      await GroupController.onAddUsersToGroup(req, res);
      expect(res.json).toBeCalledWith({
        message: 'Users were added to group with id = 123',
      });
    });
  });
});
