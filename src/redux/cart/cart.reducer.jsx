import CartActionTypes from "./cart.types";

import {addItemToCart} from "./cart.utils"

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  console.log("Cart reducer: " + action.type + "  " + state.hidden);
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: state.hidden ? !state.hidden : true
      };
    case CartActionTypes.ADD_ITEM: ;
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    default:
      return action;
  }
};

export default cartReducer;
