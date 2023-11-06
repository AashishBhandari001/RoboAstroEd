import Product from "../../Components/Product/product";

import { React, useEffect } from "react";

import { getProducts } from "../../Actions/productAction";

import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Elements/Loading";

import Search from "../../Search";

import { useAlert } from "react-alert";

function ProductPage({ match }) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, loading, error, productCount } = useSelector(
    (state) => state.products
  );

  const keyword = match ? match.params.keyword : "";

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);

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
    </div>
  );
}

export default ProductPage;
