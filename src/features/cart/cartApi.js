const baseUrl = "http://localhost:2000/cart";

export const getAllItems = () => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(baseUrl);

    const items = await response.json();

    resolve(items);
  });
};

export const getItemsById = (userId) => {
  const queryUrl = baseUrl + "?user=" + userId;
  // console.log("queryUrl", queryUrl);
  return new Promise(async (resolve, reject) => {
    const response = await fetch(queryUrl);

    const data = await response.json();

    if (response.ok) {
      // console.log("items in api ", data);

      resolve(data);
    } else {
      reject(data);
    }
  });
};

export const addItemToCart = (itemData) => {
  const queryUrl = baseUrl;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });

    const data = await response.json();

    if (response.ok) {
      resolve(data);
    } else {
      reject(data);
    }
  });
};

export const deleteItemFromCart = (itemId) => {
  const queryUrl = baseUrl + "/" + itemId;
  // console.log("queryUrl", queryUrl);
  return new Promise(async (resolve, reject) => {
    const response = await fetch(queryUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      resolve(data);
    } else reject(data);
  });
};

export const updateItemInCart = ({id,update}) => {
  const queryUrl = baseUrl + "/" + id;

  // console.log("updateItem", update);
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
      // console.log("updatedData", data);
      resolve(data);
    } else reject(data);
  });
};

export const resetCart = (userId) => {
  const queryUrl = baseUrl + "?user=" + userId;

  return new Promise(async (resolve, reject) => {
    const response = await fetch(queryUrl);

    if (response.ok) {
      const items = await response.json();

      for (let item of items) {
        // // console.log("item to be deleted",item.id);
        const response = await deleteItemFromCart(item.id);
      }

      resolve({ message: "cart reset" });
    } else {
      const data = await response.json();

      reject(data);
    }
  });
};
