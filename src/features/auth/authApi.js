import { BASE_URL } from "../../constants";


const baseUrl = BASE_URL + "/auth";

export const createUser = (userData) => {
  const queryUrl = baseUrl 
  return new Promise(async (resolve, reject) => {
    // console.log("userData", userData);
    const response = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if(response.ok){

      resolve(data);
    }
    else {
      reject(data);
    }

  });
};


export const loginUser = (userData) => {
  // console.log("userData in authApi", userData);
  return new Promise(async (resolve, reject) => {
    const queryUrl = baseUrl + "/login";
    // console.log("queryUrl", queryUrl);

    const response = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    // const status = await response.status();
    // // console.log("status",status);

    const data = await response.json();
    if (response.ok) {
      resolve(data);
    } else {
      reject(data);
    }
  });
};
