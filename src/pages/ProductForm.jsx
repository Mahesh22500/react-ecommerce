/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createProductAsync,
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductByIdAsync,
  updateProductAsync,
} from "../features/product-list/productSlice";
import { useForm } from "react-hook-form";
import { toBePartiallyChecked } from "@testing-library/jest-dom/matchers";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();



  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());

    if (id) dispatch(fetchProductByIdAsync(id));
  }, []);

  const product = useSelector((state) => state.product.selectedProduct);

    if (id && product) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("discountPercentage", product.discountPercentage);
      setValue("stock", product.stock);
      setValue("thumbnail", product.thumbnail);
    }


    const handleProduct = (data) => {
      // console.log("data", data);
  
      if(id){
  
        const newProduct ={...product};
        for(let key in data)
          newProduct[key] = data[key];

        dispatch(updateProductAsync(newProduct))
      }
      else{
  

        const newProduct = {...data};

        dispatch(createProductAsync(newProduct));
      }
    };
  

  const brands = useSelector((state) => state.product.brands);
  const categories = useSelector((state) => state.product.categories);

  // console.log("product id ", id);
  return (
    <form method="POST" action="#" onSubmit={handleSubmit(handleProduct)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Product Details
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Enter details of the Product
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    {...register("title", {
                      required: true,
                    })}
                    id="title "
                    name="title"
                    type="text"
                    placeholder=""
                    autoComplete="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full ">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textArea
                  {...register("description", {
                    required: true,
                  })}
                  id="description"
                  name="description"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write the description of the product .
              </p>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="price"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  {...register("price", {
                    required: true,
                  })}
                  id="price"
                  name="price"
                  type="price"
                  autoComplete="price"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Discount
              </label>
              <div className="mt-2">
                <input
                  {...register("discountPercentage", {
                    required: true,
                  })}
                  id="discountPercentage"
                  name="discountPercentage"
                  type="discountPercentage"
                  autoComplete="discountPercentage"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="stock"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <input
                  {...register("stock", {
                    required: true,
                  })}
                  id="stock"
                  name="stock"
                  type="stock"
                  autoComplete="stock"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="thumbnail"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Thumbnail
              </label>
              <div className="mt-2">
                <input
                  {...register("thumbnail", {
                    required: true,
                  })}
                  id="thumbnail"
                  name="thumbnail"
                  type="thumbnail"
                  autoComplete="thumbnail"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="brand"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Brand
              </label>
              <div className="mt-2">
                <select
                  {...register("brand", {
                    required: true,
                  })}
                  id="brand"
                  name="brand"
                  autoComplete="brand-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                >
                  {brands && brands.map((brand) => <option>{brand}</option>)}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  {...register("category", {
                    required: true,
                  })}
                  id="category"
                  name="category"
                  autoComplete="category-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                >
                  {categories &&
                    categories.map((category) => <option>{category}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
