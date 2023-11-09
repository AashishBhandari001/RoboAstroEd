import { React, useEffect, useState } from "react";
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

function ProductPage() {
  const alert = useAlert();
  const [active, setActive] = useState(1);

  const { keyword } = useParams();

  const dispatch = useDispatch();
  const { products, loading, error, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, active));
  }, [dispatch, keyword, active, alert, error]);

  //pagination

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "blue",
    onClick: () => setActive(index),
    className: "rounded-full justify-center items-center",
  });

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div>
      <Search />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap ml-10 max-w-full justify-center">
          {products &&
            products.map((products) => (
              <Product key={products.id} product={products} />
            ))}
        </div>
      )}

      {/* pagination */}
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
                className="text-sm "
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
  );
}

export default ProductPage;
