const baseUrl = "http://localhost:2000/users";

export const createUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    console.log("userData", userData);
    const response = await fetch("http://localhost:2000/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    const user = await response.json();

    console.log("user", user);
    resolve(user);
  });
};

export const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:2000/users/" + id, {
      method: "DELETE",
    });

    const deletedUser = await response.json();
    resolve(deletedUser);
  });
};

export const fetchAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(baseUrl);
    const users = await response.json();

    resolve(users);
  });
};

export const updateUser = (id, updateUser) => {
  return new Promise(async (resolve, reject) => {
    const queryUrl = baseUrl + "/" + id;
    const response = await fetch(queryUrl, {
      method: "PUT",
      body: JSON.stringify(updateUser),
    });

    const updatedUser = await response.json();
    resolve(updatedUser);
  });
};

export const loginUser = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    const queryUrl = baseUrl + "?email=" + email;
    console.log("queryUrl", queryUrl);
    const response = await fetch(queryUrl);
    const users = await response.json();
    const user = users[0];

    if (user) {
      if (user.password === password) {
        resolve(user);
        console.log("resolvedUser", user);
      } else reject(user);
    } else reject(user);
  });
};
