import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../Actions/productAction";
import { IoCreateOutline } from "react-icons/io5";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { IoReaderOutline } from "react-icons/io5";
import { TbCategory2 } from "react-icons/tb";
import { AiOutlineStock } from "react-icons/ai";

function UpdateProduct() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const { product } = useSelector((state) => state.productDetails);

  const { isUpdated } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptop",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  useEffect(() => {
    if (!product || (product && product._id !== id)) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setImagePreview(product.images);
    }
  }, [dispatch, id, product]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateProduct({ token: currentUser.token }, myForm, id));
  };

  const createProductImageChangeHandler = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, file]);
          setImagePreview((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="dashboard ">
      <form
        onSubmit={createProductSubmitHandler}
        className="max-w-md mx-auto  border-spacing-1 md:mt-10 shadow-xl p-10 "
      >
        <h1 className="text-3xl font-bold mb-6">Update Product</h1>

        {/* Product Name */}
        <div className="mb-4 flex">
          <IoCreateOutline size={30} className="mr-2" />
          <input
            type="text"
            placeholder="Product Name"
            id="productName"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>

        {/* Price */}
        <div className="mb-4 flex">
          <LiaMoneyBillWaveAltSolid size={30} className="mr-2" />
          <input
            type="number"
            placeholder="Price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>

        {/* Description */}
        <div className="mb-4 flex">
          <IoReaderOutline size={30} className="mr-2" />
          <textarea
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded h-28 w-full px-3"
          ></textarea>
        </div>

        {/* Category */}
        <div className="mb-4 flex">
          <TbCategory2 size={30} className="mr-2" />
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded w-full py-2 px-3"
          >
            <option value="">Select Category</option>
            {categories &&
              categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
          </select>
        </div>

        {/* Stock */}
        <div className="mb-4 flex">
          <AiOutlineStock size={30} className="mr-2" />
          <input
            type="number"
            placeholder="Stock"
            required
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>

        {/* File input for images */}
        <div className="mb-4">
          <input
            type="file"
            name="avatar"
            accept="images/*"
            multiple
            onChange={createProductImageChangeHandler}
            className="border rounded py-2 px-3"
          />
        </div>

        {/* Image preview */}
        <div className="mb-4 flex space-x-2">
          {imagePreview.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt="Avatar Preview"
              className="h-16 object-cover w-full overflow-auto"
            />
          ))}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-cyan-700 text-white font-medium py-2 w-full rounded hover:bg-cyan-800"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
