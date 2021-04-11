import GroupService from '../services/group.js';

export default class GroupController {
  static async onGetGroup(req, res) {
    const group = await GroupService.getGroup(req.params.id);

    if (group) {
      res.json(group);
    } else {
      res
        .status(404)
        .json({ message: `Group with id = ${req.params.id} not found` });
    }
  }

  static async onGetAllGroups(req, res) {
    const groups = await GroupService.getAllGroups();

    if (groups.length) {
      res.json(groups);
    } else {
      res.status(404).json({ message: `Groups not found` });
    }
  }

  static async onAddGroup(req, res) {
    res.json(await GroupService.addGroup(req.body));
  }

  static async onUpdateGroup(req, res) {
    await GroupService.updateGroup(req.params.id, req.body);
    res
      .status(200)
      .json({ message: `Group with id = ${req.params.id} is updated` });
  }

  static async onDeleteGroup(req, res) {
    await GroupService.deleteGroup(req.params.id, req.body);
    res
      .status(200)
      .json({ message: `Group with id = ${req.params.id} is deleted` });
  }

  static async onAddUsersToGroup(req, res) {
    await GroupService.addUsersToGroup(req.params.id, req.body);
    res.status(200).json({
      message: `Users were added to group with id = ${req.params.id}`,
    });
  }
}
