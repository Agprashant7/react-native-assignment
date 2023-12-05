const initialState = {
  cart: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(cart => {
          return cart.id + cart.size !== action.payload;
        }),
      };
    case 'GET_ITEM':
      return {
        ...state,
        cart: localStorage.getItem('cartItem'),
      };
    case 'CLEAR_STORE':
      return {
        ...state,
        cart: [],
      };
    case 'SET_TOTAL':
      return {
        ...state,
        total:action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;
