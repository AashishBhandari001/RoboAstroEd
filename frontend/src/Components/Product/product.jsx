import React from "react";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";

const options = {
  edit: false,
  color: "rgba(255, 79, 29, 1)",
  activeColor: "rgba(255, 79, 29, 1)",
  size: window.innerWidth > 600 ? 20 : 25,
  value: 2.5,
  isHalf: true,
};

function Product({ product }) {
  return (
    <Link to={product.id}>
      <div className="flex flex-col mt-24 md:mt-28 mr-3 mb-8 max-w-sm w-14vw m-2vmaxw pb-2 bg-gray-50 transition duration-300 hover:shadow-md">
        <img src={product.images[0].url} alt={product.name} className="mb-4" />

        <div className="flex flex-col justify-between text-center">
          <p className="mt-2">{product.name}</p>
          <div className="flex justify-center">
            <ReactStars {...options} />
            <span className="ml-2 ">(256 reviews)</span>
          </div>
        </div>
        <div>
          <p className="text-center mt-1 mb-2 text-red-600">{product.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default Product;
