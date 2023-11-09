import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import ArrowRightIcon from "@heroicons/react/24/outline/ArrowRightIcon";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";

import Product from "../../Components/Product/product";
import { getProducts } from "../../Actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Elements/Loading";
import Search from "../../Search";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

const categories = [
  "SajiloBot",
  "LED",
  "Resistor",
  "Battery",
  "Satellite",
  "Transistor",
  "Capacitor",
  "Wires",
  "Motors",
  "Sensors",
  "3D Printer",
];

function ProductPage() {
  const alert = useAlert();
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState("");

  const { keyword } = useParams();

  const dispatch = useDispatch();
  const { products, loading, error, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, active, category));
  }, [dispatch, keyword, active, alert, error, category]);

  const [isDropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown open/close

  const next = () => {
    if (active === 5) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "blue",
    onClick: () => setActive(index),
    className: "rounded-full justify-center items-center",
  });

  return (
    <div className="flex flex-col md:ml-4 md:mr-4 lg:flex-row">
      <div className="w-full md:mt-40 mt-28 lg:w-1/4">
        <div className="lg:block hidden">
          <div className="bg-gray-100 p-4 justify-center items-center text-center rounded-lg mb-4">
            <p className="font-bold mb-2">Category</p>
            <div className="flex flex-wrap hover:cursor-pointer gap-4 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="bg-gray-200 hover:bg-gray-300 rounded-full px-4 py-2 text-sm"
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:hidden ml-4 mr-4 block">
          <div className="mb-6">
            <Search />
          </div>

          {/* Category dropdown on small screens below the search */}
          <div className="mb-4">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="bg-gray-200 hover:bg-gray-300 rounded-full px-4 py-2 text-sm w-full text-left"
              >
                {category ? category : "All Categories"}
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 py-2 bg-white border rounded-lg">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-left hover:bg-gray-200 w-full"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-3/4">
        <div className="hidden md:flex lg:flex">
          <Search />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-wrap ml-10 max-w-full justify-center">
            {products &&
              products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
          </div>
        )}

        {/* Pagination */}
        {productCount > resultPerPage && (
          <div className="flex flex-col sm:flex-row justify-center items-center mb-4">
            <Button
              variant="text"
              className="flex items-center gap-2 text-gray-600 rounded-full mb-2 sm:mb-0 sm:mr-2"
              onClick={prev}
              disabled={active === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex flex-row items-center gap-2">
              {Array.from({
                length: Math.ceil(productCount / resultPerPage),
              }).map((_, index) => (
                <IconButton
                  key={index}
                  {...getItemProps(index + 1)}
                  className="text-sm"
                >
                  {index + 1}
                </IconButton>
              ))}
            </div>
            <Button
              variant="text"
              className="flex items-center gap-2 text-gray-600 rounded-full mt-2 sm:mt-0 sm:ml-2"
              onClick={next}
              disabled={active === Math.ceil(productCount / resultPerPage)}
            >
              Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
