import Product from "../../Components/Product/product";

import { React, useEffect } from "react";

import { getProducts } from "../../Actions/productAction";

import { useDispatch, useSelector } from "react-redux";

const productData = {
  name: "Beyond Apogee",
  images: [
    {
      url: "https://www.gstatic.com/webp/gallery3/1.sm.png",
    },
  ],
  price: "Rs 5000",
  id: "ashish",
};

function ProductPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-wrap ml-10 max-w-full justify-center">
      <Product product={productData} />
      <Product product={productData} />
      <Product product={productData} />
      <Product product={productData} />
      <Product product={productData} />
      <Product product={productData} />
      <Product product={productData} />
    </div>
  );
}

export default ProductPage;
