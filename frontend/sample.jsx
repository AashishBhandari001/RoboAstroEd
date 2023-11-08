import React, { useState } from "react";
import { UseSelector, useDispatch } from "react-redux/es/hooks/useSelector";
import { getProductDetails } from "../../Actions/productAction";

function ProductDetails() {
  const [images, setImages] = useState({
    img1: "https://www.gstatic.com/webp/gallery3/1.sm.png",
    img2: "https://www.gstatic.com/webp/gallery3/2.sm.png",
    img3: "https://www.gstatic.com/webp/gallery3/3.sm.png",
    img4: "https://www.gstatic.com/webp/gallery3/4.sm.png",
  });

  const [activeImg, setActiveImg] = useState(images.img1);
  const [amount, setAmount] = useState(1);

  return (
    <div className="flex flex-col justify-between mt-16 lg:flex-row p-12 max-w-7xl gap-16 mx-auto lg:items-center ">
      <div className="flex flex-col gap-6 lg:w-2/4">
        <img
          src={activeImg}
          alt="Product"
          onClick={() => setActiveImg(images.img1)}
          className="w-3/4 h-3/4 aspect-square object-cover rounded-xl  "
        />
        <div className="flex flex-row justify-between h-24">
          <img
            src={images.img1}
            alt="Thumbnail 1"
            className="w-full h-full rounded-md cursor-pointer"
            onClick={() => setActiveImg(images.img1)}
          />
          <img
            src={images.img2}
            alt="Thumbnail 1"
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() => setActiveImg(images.img2)}
          />
          <img
            src={images.img3}
            alt="Thumbnail 2"
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() => setActiveImg(images.img3)}
          />
          <img
            src={images.img4}
            alt="Thumbnail 3"
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() => setActiveImg(images.img4)}
          />
        </div>
      </div>
      {/* About */}
      <div className="flex flex-col gap-4 lg:w-2/4">
        <div>
          <span className="text-cyan-600 font-semibold ">Sajilobot</span>
          <h1 className="text-3xl font-bold">
            Robotics mini Robotics Course Kit
          </h1>
        </div>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          ipsum ab expedita ratione quae consectetur veniam deserunt, quas
          possimus nulla itaque asperiores iusto repellendus quam aperiam quo
          optio alias officiis!
        </p>
        <h6 className="text-lg font-semibold text-red-600"> Rs 5000</h6>
        <div className="flex flex-row items-center gap-16">
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
          <button className="bg-cyan-600 text-white font-semibold py-3 px-8 rounded-xl h-full">
            Add to Cart{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
