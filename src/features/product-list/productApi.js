export const fetchAllProducts = () => {
  return new Promise(async function (resolve, reject) {
    const response = await fetch("http://localhost:2000/products");
    const productsData = await response.json();

    resolve(productsData);
  });
};

export const fetchProductsByFilters = (filters) => {
  // filters

  return new Promise(async (resolve, reject) => {
    let queryString = "?";

    filters.forEach((filter) => {
      queryString += `${filter.type}=${filter.value}`;
      queryString += "&";
    });

    queryString = queryString.slice(0, queryString.length - 1);

    let queryUrl = "http://localhost:2000/products" + queryString;
    console.log("queryUrl", queryUrl);

    const response = await fetch(queryUrl);   
    const data = await response.json();

    console.log("filtered data", data);

    resolve(data);
  });
};

export const fetchProductsBySort = (sortOptions) => {
  console.log("sortOptions", sortOptions);
  let queryString = "?";

  // sortOption = { _sort,_order}

  for (let key in sortOptions) {
    queryString += key + "=" + sortOptions[key] + "&";
  }

  queryString = queryString.slice(0, queryString.length - 1);

  let queryUrl = "http://localhost:2000/products" + queryString;

  console.log("queryUrl", queryUrl);

  return new Promise(async (resolve, reject) => {
    const response = await fetch(queryUrl);
    const data = await response.json();
    console.log("data after sort", data);
    resolve(data);
  });
};


export const fetchProductsByPage = (page)=>{

  let queryUrl  = "http://localhost:2000/products" + "?_page=" + page ;
  console.log(queryUrl);

  return new Promise(
    async (resolve,reject)=>{

      const response = await fetch(queryUrl);
      const data = await response.json();
      resolve(data.data);
    }
  )
}


export const fetchProductById = (id)=>{

  let queryUrl  = "http://localhost:2000/products/" + id;
   
  console.log("queryUrl",queryUrl);

  return new Promise( async(resolve,reject)=>{

    const response = await fetch(queryUrl);
    const data = await response.json();

    console.log("product",data);

    resolve(data);
  })
}