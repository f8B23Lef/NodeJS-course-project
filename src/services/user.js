const USERS = [];
let ID = 0;

function findUser(id) {
  return USERS.find((user) => user.id === id && !user.isDeleted);
}

function formUser({ id, login, password, age }) {
  return {
    id,
    login,
    password,
    age,
  };
}

function getUser(id) {
  const user = findUser(id);

  if (user) {
    return formUser(user);
  }

  return null;
}

function addUser({ login = '', password = '', age = '' }) {
  ID += 1;
  USERS.push({
    id: ID.toString(),
    login,
    password,
    age,
    isDeleted: false,
  });
}

function deleteUser(id) {
  const user = findUser(id);

  if (user) {
    user.isDeleted = true;
    return true;
  }

  return false;
}

function updateUser(id, userData) {
  const user = findUser(id);

  if (user) {
    user.login = userData.hasOwnProperty('login') ? userData.login : user.login;
    user.password = userData.hasOwnProperty('password')
      ? userData.password
      : user.password;
    user.age = userData.hasOwnProperty('age') ? userData.age : user.age;

    return true;
  }

  return false;
}

function getAutoSuggestUsers(userQuery) {
  const users = USERS.filter(
    (user) =>
      !user.isDeleted && user.login.startsWith(userQuery.loginSubstring),
  )
    .sort((user1, user2) => {
      if (user1.name > user2.name) {
        return 1;
      }
      return -1;
    })
    .slice(0, userQuery.limit)
    .map(formUser);

  return users;
}

export { getUser, addUser, deleteUser, updateUser, getAutoSuggestUsers };
