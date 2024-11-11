const baseUrl = "http://localhost:2000/auth";

export const createUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    // console.log("userData", userData);
    const response = await fetch("http://localhost:2000/auth/signup", {
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
