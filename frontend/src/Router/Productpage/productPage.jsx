import Product from "../../Components/Product/product";

import React from "react";

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
  return (
    <>
      <Product product={productData} />
    </>
  );
}

export default ProductPage;
