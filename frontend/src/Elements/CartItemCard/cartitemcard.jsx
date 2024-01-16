import React from "react";
import { Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeItemsFromCart } from "../../Actions/cartAction";

function CartItemCard({ item }) {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productDetails);
  const { cartItems } = useSelector((state) => state.cart);

  const calculateSubtotal = () => {
    return item.price * item.quantity;
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1 || newQty > product?.stock) {
      return;
    }

    dispatch(addToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  return (
    <div>
      <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <img
          src={item.image}
          alt="product-image"
          className="md:w-36 md:h-20 rounded-lg sm:w-40"
        />
        <div className="sm:ml-4 sm:flex  sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <p className="mt-1 text-sm text-red-500 font-semibold">
              {`Price: NPR ${item.price}`}
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row items-center ">
              <button
                className="bg-gray-200 py-2 px-4 rounded-lg text-cyan-700 text-3xl"
                onClick={() => updateQuantity(item.product, item.quantity - 1)}
              >
                {" "}
                -{" "}
              </button>
              <input
                type="number"
                className="py-2 px-4 rounded-lg read-only text-center w-16"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.product, parseInt(e.target.value, 10))
                }
              />
              <button
                className="bg-gray-200 py-2 px-4 rounded-lg text-cyan-700 text-3xl"
                onClick={() => updateQuantity(item.product, item.quantity + 1)}
              >
                {" "}
                +
              </button>
            </div>

            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 md:space-y-2">
              <div className="flex items-center space-x-10 pt-2">
                <p className="text-sm text-gray-500 font-medium ">{`Subtotal: NPR ${calculateSubtotal()}`}</p>
                <Trash2Icon
                  className="hover:cursor-pointer"
                  onClick={() => deleteCartItems(item.product)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
