import Product from "../../Components/Product/product";

import { React, useEffect } from "react";

import { getProducts } from "../../Actions/productAction";

import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Elements/Loading";

import { useAlert } from "react-alert";

function ProductPage() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, loading, error, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <div>
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
    </div>
  );
}

export default ProductPage;
