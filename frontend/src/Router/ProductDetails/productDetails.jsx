import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../Actions/productAction";
import { useParams } from "react-router-dom";

function ProductDetails({ match }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const [amount, setAmount] = useState(1);

  return (
    <div className="flex flex-col justify-between mt-16 lg:flex-row p-12 max-w-7xl gap-16 mx-auto lg:items-center ">
      <div className="flex flex-col gap-6 lg:w-2/4">
        <Carousel>
          {product.images &&
            product.images.map((item, i) => (
              <img
                className="object-cover"
                key={item.url}
                src={item.url}
                alt={`${i} Slide`}
              />
            ))}
        </Carousel>
      </div>
      {/* About */}
      <div className="flex flex-col gap-4 lg:w-2/4">
        <div>
          <span className="text-cyan-600 font-bold ">{product.name}</span>
          <h1 className="text-3xl font-semibold">Product # {product._id}</h1>
        </div>
        <p className="text-gray-700 text-justify">{product.description}</p>
        <h6 className="text-lg font-bold text-red-600">{`NPR ${product.price}`}</h6>
        <p>
          Status: &nbsp;
          <b className={product.stock < 1 ? "text-red-600" : "text-green-600"}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </b>
        </p>
        <div className="flex flex-row items-center gap-14">
          <div className="flex flex-row items-center  ">
            <button
              className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
              onClick={() => setAmount((prev) => prev - 1)}
            >
              {" "}
              -{" "}
            </button>
            <span className=" py-4 px-6 rounded-lg ">{amount} </span>
            <button
              className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl "
              onClick={() => setAmount((prev) => prev + 1)}
            >
              {" "}
              +{" "}
            </button>
          </div>
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold lg:py-3 lg:px-6  px-4 py-4 rounded-xl">
            Add to Cart{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
