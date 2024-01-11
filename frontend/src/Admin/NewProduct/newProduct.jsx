import React from "react";
import { useState, useEffect } from "react";
import {
  clearErrors,
  createProduct,
  getAdminProduct,
} from "../../Actions/productAction";
import { NEW_PRODUCTS_RESET } from "../../Constants/productConstants";
import { IoCreateOutline } from "react-icons/io5";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { IoReaderOutline } from "react-icons/io5";
import { TbCategory2 } from "react-icons/tb";
import { AiOutlineStock } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

function NewProduct() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, success } = useSelector((state) => state.newProduct);
  const { currentUser } = useSelector((state) => state.user);

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
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // if (currentUser && success) {
    //   getAdminProduct({
    //     token: currentUser.token,
    //   });
    //   dispatch({ type: NEW_PRODUCTS_RESET });
    //   alert.success("Product created successfully");
    //   navigate("/admin");
    // }

    if (success) {
      dispatch({ type: NEW_PRODUCTS_RESET });
      alert.success("Product created successfully");
      navigate("/admin");
    }
  }, [{ dispatch, token: currentUser.token, alert, error, success, navigate }]);

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

    const token = currentUser.token;
    const productData = myForm;
    dispatch(createProduct({ token }, productData));
    alert.success("Product created successfully");
    navigate("/admin");
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
        <h1 className="text-3xl font-bold mb-6">Create Product</h1>

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
            className="border rounded w-full py-2 px-3"
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
            onChange={(e) => setStock(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>

        {/* File input for images */}
        <div className="mb-4">
          <input
            accept="image/*"
            type={"file"}
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
              src={image}
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
          Create
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
