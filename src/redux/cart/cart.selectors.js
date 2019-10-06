import {createSelector} from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => (cart.cartItems ? cart.cartItems : []) 
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => (typeof cart.hidden !== "undefined") ? cart.hidden : true
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  cartItems => (cartItems ? cartItems.reduce(
    (accumulatedQty, cartItem) => accumulatedQty + cartItem.quantity,
    0
  )
  : 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems => (cartItems ? cartItems.reduce(
    (accumulatedTotal, cartItem) => accumulatedTotal + (cartItem.quantity * cartItem.price),
    0
  )
  : 0)
);