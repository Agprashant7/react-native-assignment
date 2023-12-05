const initialState = {
    wishlist: [],
  };
  
  const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_WISHLIST":
        return {
          ...state,
          wishlist: [...state.wishlist,action.payload],
       
        };
      case "REMOVE_WISHLIST":
        return {
          ...state,
          wishlist: state.wishlist.filter((wishlist) => {return wishlist.id!== action.payload}),
        };
        case "GET_WISHLIST":
          return {
            ...state,
            wishlist: localStorage.getItem('wishlist'),
         
          };
          case "CLEAR_STORE":
            return {
              ...state,
              wishlist:[]
           
            };
      default:
        return state;
    }
  };
  
  export default wishlistReducer;
  