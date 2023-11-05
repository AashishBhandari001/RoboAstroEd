import React from "react";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";

const options = {
  edit: false,
  color: "rgba(255, 79, 29, 1)",
  activeColor: "tomato",
  size: window.innerWidth > 600 ? 20 : 25,
  value: 2.5,
  isHalf: true,
};

function Product({ product }) {
  return (
    <Link to={product.id}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div className="group relative hover:shadow-md">
            {/* Apply hover shadow here */}
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
              <img
                src={product.images[0].url}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col justify-between text-center">
              <p className="mt-2">{product.name}</p>
              <div className="flex justify-center">
                <ReactStars {...options} />
                <span className="ml-2 ">(256 reviews)</span>
              </div>
            </div>
            <div>
              <p className="text-center mt-1 mb-2 text-red-600">
                {product.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Product;
