const baseUrl = "http://localhost:2000/cart";

export const getAllItems = () => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(baseUrl);

    const items = response.json();

    resolve(items);
  });
};

export const getItemsById = (userId) => {
  const queryUrl = baseUrl + "?user=" + userId;
  console.log("queryUrl", queryUrl);
  return new Promise(async (resolve, reject) => {
    const response = await fetch(queryUrl);

    const items = await response.json();

    console.log("items ", items);

    resolve(items);
  });
};

export const addItemToCart = (itemData) => {
  const queryUrl = baseUrl;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(queryUrl, {
      method: "POST",
      body: JSON.stringify(itemData),
    });

    const item = response.json();

    resolve(item);
  });
};

export const deleteItemFromCart = (itemId) => {
  const queryUrl = baseUrl + "/" + itemId;
  console.log("queryUrl", queryUrl);
  return new Promise(async (resolve, reject) => {
    const response = await fetch(queryUrl, {
      method: "DELETE",
    });

    const deletedItem = response.json();

    resolve(deletedItem);
  });
};

export const updateItemInCart = (updateItem) => {
  const queryUrl = baseUrl + "/" + updateItem.id;

  console.log("updateItem", updateItem);
  return new Promise(async (resolve, reject) => {
    const response = await fetch(queryUrl, {
      method: "PUT",
      body: JSON.stringify(updateItem),
    });

    const updatedData = response.json();
    console.log("updatedData", updatedData);

    resolve(updatedData);
  });
};
