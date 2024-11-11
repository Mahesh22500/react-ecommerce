const baseUrl = "http://localhost:2000/orders";

export const createOrder = (order) => {
  const queryUrl = baseUrl;

  return new Promise(async (resolve, reject) => {
    const response = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    const data = await response.json();

    if (response.ok) {
      // console.log("resolved data",data)
      resolve(data);

    } else {
      reject(data);
    }
  });
};

export const fetchAllOrders = () => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(baseUrl);
    const data = await response.json();

    if (response.ok) {
      resolve(data);
    } else reject(data);
  });
};


export const fetchOrderByUser = ()=>{


}

export const updateOrder = ({id,update}) => {
  const queryUrl = baseUrl + "/" + id;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(queryUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });

    const data = await response.json();

    if (response.ok) {
      resolve(data);
    } else {
      reject(data);
    }
  });
};
