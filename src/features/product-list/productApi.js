const baseUrl = "http://localhost:2000/products";

export const fetchAllProducts = () => {
  return new Promise(async function (resolve, reject) {
    const response = await fetch("http://localhost:2000/products");

    const productsData = await response.json();

    resolve(productsData);
  });
};

export const fetchProductsByFilters = (filter) => {
  // filters



  return new Promise(async (resolve, reject) => {
    let queryString = "?";

    if (filter.brand && filter.category) {
      queryString += "brand=" + filter.brand;
      queryString += "&category=" + filter.category;
    } else if (filter.category) {
      queryString += "category=" + filter.category;
    } else if (filter.brand) {
      queryString += "brand=" + filter.brand;
    }

    let queryUrl = "http://localhost:2000/products" + queryString;
    // console.log("queryUrl", queryUrl);

    const response = await fetch(queryUrl);
    const data = await response.json();

    // console.log("filtered data", data);

    resolve(data);
  });
};

export const fetchProductsBySort = (sortOptions) => {
  // console.log("sortOptions", sortOptions);
  let queryString = "?";

  // sortOption = { _sort,_order}

  for (let key in sortOptions) {
    queryString += key + "=" + sortOptions[key] + "&";
  }

  queryString = queryString.slice(0, queryString.length - 1);

  let queryUrl = "http://localhost:2000/products" + queryString;

  // console.log("queryUrl", queryUrl);

  return new Promise(async (resolve, reject) => {
    const response = await fetch(queryUrl);

    const data = await response.json();
    if (response.ok) {
      resolve(data);
      // console.log("data after sort", data);
    } else reject(data);
  });
};

export const fetchProductsByPage = (page) => {
  let queryUrl = baseUrl;
  // console.log(queryUrl);

  return new Promise(async (resolve, reject) => {
    const response = await fetch(queryUrl);
    const data = await response.json();
    if (response.ok) resolve(data.data);
    else reject(data);
  });
};

export const fetchProductById = (id) => {
  let queryUrl = "http://localhost:2000/products/" + id;

  // console.log("queryUrl", queryUrl);

  return new Promise(async (resolve, reject) => {
    const response = await fetch(queryUrl);
    const data = await response.json();

    if (response.ok) {
      resolve(data);
      // console.log("product", data);
    } else reject(data);
  });
};

export const fetchBrands = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await fetchAllProducts();

      const brands = products.map((product) => product.brand);

      const brandsSet = new Set(brands);

      let uniqueBrands = [];

      for (let brand of brandsSet) {
        if (brand) uniqueBrands.push(brand);
      }

      resolve(uniqueBrands);
    } catch (err) {
      reject(err);
    }
  });
};

export const fetchCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await fetchAllProducts();

      const categories = products.map((product) => product.category);

      const categoriesSet = new Set(categories);

      let uniqueCategories = [];

      for (let category of categoriesSet) uniqueCategories.push(category);

      resolve(uniqueCategories);
    } catch (err) {
      reject(err);
    }
  });
};

export const createProduct = (product) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();

    if (response.ok) resolve(data);
    else reject(data);
  });
};

export const updateProduct = (product) => {
  const queryUrl = baseUrl + "/" + product.id;

  return new Promise(async (resolve, reject) => {
    const response = await fetch(queryUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();
    if (response.ok) resolve(data);
    else reject(data);
  });
};

export const deleteProduct = (productId) => {
  const queryUrl = baseUrl + "/" + productId;

  return new Promise(async (resolve, reject) => {
    const response = await fetch(queryUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deleted: true }),
    });

    const data = await response.json();

    if (response.ok) {
      // console.log("deletedProduct", data);

      resolve(data);
    } else reject(data);
  });
};
