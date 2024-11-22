import { BASE_URL } from "../../constants";


const baseUrl =  BASE_URL + "/users";

export const fetchLoggedInUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    const queryUrl = baseUrl + "/" + userId;
    const response = await fetch(queryUrl,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`

      },
    });

    const data = await response.json();

    if (response.ok) {
      // console.log("user", data);

      resolve(data);
    } else reject(data);
  });
};

export const fetchLoggedInUserOrders = (userId) => {
  return new Promise(async (resolve, reject) => {
    const baseUrl = BASE_URL +  "/orders";
    const queryUrl = baseUrl + "?user=" + userId;
    // console.log("queryUrl", queryUrl);

    const response = await fetch(queryUrl,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`

      },
    });

    const data = await response.json();

    if (response.ok) resolve(data);
    else reject(data);
  });
};

export const updateUser = ({id,update}) => {
  return new Promise(async (resolve, reject) => {
    const queryUrl = baseUrl + "/" + id;
    // console.log("update", update);
    const response = await fetch(queryUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`

      },
      body: JSON.stringify(update),
    });

    const data = await response.json();

    if (response.ok) {
      resolve(data);
      // console.log("updatedUser", data);
    } else reject(data);
  });
};

export const addAddressToUser = (userId, addresses) => {
  // console.log("addresses", addresses);
  return new Promise(async (resolve, reject) => {
    const queryUrl = baseUrl + "/" + userId;

    const response = await fetch(queryUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`

      },
      body: JSON.stringify(addresses),
    });

    const data = await response.json();

    if (response.ok) {
      resolve(data);
      // console.log("response user data", data);
    } else reject(data);
  });
};
