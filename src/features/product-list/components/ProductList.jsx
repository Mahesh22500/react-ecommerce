import { useSelector } from "react-redux";

import {
  fetchAllProductsAsync,
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchPagedProducts,
  fetchProductsByFilterAsync,
  sortProducts,
} from "../productSlice";
import { useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { pageSize } from "../../../constants";
import { userReducer } from "../../user/userSlice";

export const Products = ({ page }) => {
  const allProducts = useSelector((state) => state.product.products);
  const user = useSelector(state=>state.user.loggedInUser);
  const products = allProducts.filter(product=>!(user.role === 'user' && product.deleted))

  const getPagedProducts = (page) => {
    const l = (page - 1) * pageSize;
    const r = page * pageSize;

    const tot = products.length;

    const pagedProducts = products.slice(l, Math.min(tot, r));

    console.log("pagedProducts", pagedProducts);
    return pagedProducts;
  };
  const pagedProducts = products ? getPagedProducts(page) : null;

  // console.log("pagedProducts",pagedProducts)

  return (
    <div>
      {/* Category-Filters */}

      {/* Product List  */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {pagedProducts &&
              pagedProducts.map((product) => 
                {
                  if(product.deleted)
                    return null;
                  else 
                  return(
                    <Link to={`/product-detail/${product.id}`}>
                    <div key={product.id} className="group relative">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                          src={product.thumbnail}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            <StarIcon className="w-6 h-6 inline"></StarIcon>
                            {product.rating}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </Link> 

                )
                
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

const sortOptions = [
  {
    name: "Best Rating",
    href: "#",
    current: false,
    sort: "rating",
    order: "desc",
  },

  {
    name: "Price: Low to High",
    href: "#",
    current: false,
    sort: "price",
    order: "asc",
  },
  {
    name: "Price: High to Low",
    href: "#",
    current: false,
    sort: "price",
    order: "desc",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const ProductList = () => {
  const brands = useSelector((state) => state.product.brands);
  const categories = useSelector((state) => state.product.categories);

  const products = useSelector((state) => state.product.products);

  const filters = [
    {
      id: "brand",
      name: "Brands",
      options: brands.map((brand) => ({
        label: brand,
        value: brand,
        checked: false,
      })),
    },
    {
      id: "category",
      name: "Category",
      options: categories.map((category) => ({
        label: category,
        value: category,
        checked: false,
      })),
    },
  ];

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());

    dispatch(fetchAllProductsAsync());
    setPage(1);
  }, []);

  let pages;
  const dispatch = useDispatch();

  if (products) {
    console.log("products", products);

    const totalProducts = products.length;

    const pagesLen = Math.ceil(products.length / pageSize);

    // console.log("pageLen", pagesLen);

    pages = new Array(pagesLen);
    for (let i = 0; i < pagesLen; i++) pages[i] = i + 1;
  }

  const [filter, setFilter] = useState({
    brand: null,
    category: null,
  });

  const handleSort = (e, option) => {
    // console.log("sort clicked");

    // console.log("option", option);

    dispatch(sortProducts({ label: option.sort, order: option.order }));
    setPage(1);
  };

  const handleCheck = (e, section, option) => {
    if (e.target.checked) {
      // console.log("section id", section.id);
      // console.log("option label", option.label);
      filter[section.id] = option.label;
      // console.log(filter);
      setFilter(filter);
      dispatch(fetchProductsByFilterAsync(filter));
      setPage(1);
    } else {
      filter[section.id] = null;
      dispatch(fetchProductsByFilterAsync(filter));
      setPage(1);
    }
  };
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(function () {
    dispatch(fetchAllProductsAsync());
  }, []);

  const handlePagination = (page) => {
    setPage(page);
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="px-2 py-3 font-medium text-gray-900"
                ></ul>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              onChange={(e) => handleCheck(e, section, option)}
                              // defaultValue={option.value}
                              // checked={filter[section.id] == option.value}
                              checked={false}
                              value={false}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <button
                          onClick={(e) => handleSort(e, option)}
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                          )}
                        >
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                ></ul>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              onChange={(e) => handleCheck(e, section, option)}
                              // value ={false}
                              checked={filter[section.id] == option.label}
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {<Products page={page}></Products>}
              </div>
            </div>
          </section>

          {/* Pagination */}

          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <div
                onClick={() => {
                  if (page - 1 >= 1) setPage(page - 1);
                }}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </div>
              <div
                onClick={() => {
                  const pagesLen = Math.ceil(products.length / pageSize);
                  console.log("next clicked", page);

                  if (page + 1 <= pagesLen) setPage(page + 1);
                }}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(page - 1) * pageSize + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(products.length, page * pageSize)}
                  </span>{" "}
                  of <span className="font-medium">{products.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  aria-label="Pagination"
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                >
                  <div
                    onClick={() => {
                      if (page - 1 >= 1) setPage(page - 1);
                    }}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                  {pages &&
                    pages.map((pageIdx) => {
                      return (
                        <button
                          onClick={() => handlePagination(pageIdx)}
                          href="#"
                          className={
                            pageIdx == page
                              ? "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset bg-blue-500 hover:bg-blue-500 focus:z-20 focus:outline-offset-0"
                              : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          }
                          // className={`text-black`}
                        >
                          {pageIdx}
                        </button>
                      );
                    })}
                  <div
                    onClick={() => {
                      const pagesLen = Math.ceil(products.length / pageSize);
                      console.log("next clicked", page);

                      if (page + 1 <= pagesLen) setPage(page + 1);
                    }}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
