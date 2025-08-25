function reducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case "UPDATE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity:
                action.payload.type === "REMOVE"
                  ? (item.quantity < 0 ? 0 : item.quantity -1)
                  : item.quantity + 1,
            };
          }
          return item;
        }),
      };
    case "TOTAL_CART_PRICE":
      return {
        ...state,
        totalPrice: state.cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
}
const initialState = {
  cart: [],
  products: [],
};

export { reducer, initialState };
