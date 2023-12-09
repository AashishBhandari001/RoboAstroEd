import { ADD_TO_CART, REMOVE_CART_ITEM } from "../Constants/cartConstants";
import axios from "axios";

//Add to cart
export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:8080/api/product/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      image: data.product.images[0].url,
      price: data.product.price,
      stock: data.product.stock,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//Remove from Cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
