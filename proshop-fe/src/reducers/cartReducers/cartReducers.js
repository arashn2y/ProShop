import * as constants from "../../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case constants.CART_ADD_ITEM:
      const item = action.payload;
      const isExistItem = state.cartItems.find(existItem => existItem.product === item.product);
      return isExistItem
        ? { ...state, cartItems: state.cartItems.map(i => (i.product === item.product ? item : i)) }
        : { ...state, cartItems: [...state.cartItems, item] };
    case constants.CART_REMOVE_ITEM:
      return { ...state, cartItems: state.cartItems.filter(existItem => existItem.product !== action.payload) };
    default:
      return state;
  }
};
