import {
  addUser,
  getUser,
  deleteUser,
  updateUser,
  getAutoSuggestUsers,
} from '../services/user.js';

function onAddUser(req, res) {
  addUser(req.body);
  res
    .status(200)
    .json({ message: `User with login = ${req.body.login} is created` });
}

function onUpdateUser(req, res) {
  const isUpdated = updateUser(req.params.id, req.body);
  if (isUpdated) {
    res
      .status(200)
      .json({ message: `User with id = ${req.params.id} is updated` });
  } else {
    res
      .status(404)
      .json({ message: `User with id = ${req.params.id} not found` });
  }
}

function onGetUser(req, res) {
  const user = getUser(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res
      .status(404)
      .json({ message: `User with id = ${req.params.id} not found` });
  }
}

function onDeleteUser(req, res) {
  const isDeleted = deleteUser(req.params.id);
  if (isDeleted) {
    res
      .status(200)
      .json({ message: `User with id = ${req.params.id} is deleted` });
  } else {
    res
      .status(404)
      .json({ message: `User with id = ${req.params.id} not found` });
  }
}

function onGetAutosuggestedUsers(req, res) {
  res.json(getAutoSuggestUsers(req.query));
}

export {
  onAddUser,
  onUpdateUser,
  onGetUser,
  onDeleteUser,
  onGetAutosuggestedUsers,
};
