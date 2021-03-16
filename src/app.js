import express from 'express';
import {
  addUser,
  getUser,
  deleteUser,
  updateUser,
  getAutoSuggestUsers,
} from './user_utils.js';

const app = express();
const router = express.Router();

app.listen(3000);

app.use(express.json());

router
  .route('/')
  .get((req, res) => {
    const user = getAutoSuggestUsers(req.query);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message:
          'To see a list of autosuggested users you must provide ' +
          "'loginSubstring' and 'limit' query params. " +
          "For example: '/users?loginSubstring=abc&limit=5'",
      });
    }
  })
  .post((req, res) => {
    addUser(req.body);
    res
      .status(200)
      .json({ message: `User with login = ${req.body.login} is created` });
  })
  .put((req, res) => {
    const isUpdated = updateUser(req.body);
    if (isUpdated) {
      res
        .status(200)
        .json({ message: `User with id = ${req.body.id} is updated` });
    } else {
      res
        .status(404)
        .json({ message: `User with id = ${req.body.id} not found` });
    }
  });

router
  .route('/:id')
  .get((req, res) => {
    const user = getUser(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res
        .status(404)
        .json({ message: `User with id = ${req.params.id} not found` });
    }
  })
  .delete((req, res) => {
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
  });

app.use('/users', router);
