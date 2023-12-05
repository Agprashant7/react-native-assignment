export const addItem = (payload) => {
  return {
    type: "ADD_ITEM",
    payload: payload,
  };
};

export const removeItem = (id) => {
  return {
    type: "REMOVE_ITEM",
    payload: id,
  };
};
export const clearStore = () => {
 
  return {
    type: "CLEAR_STORE",
    //payload: id,
  };
};
export const setCartAmount = (amount) => {
  return {
    type: "REMOVE_ITEM",
    payload: amount,
  };
};
export const getItems = (id) => {
  return {
    type: "GET_ITEM",
    //payload: id,
  };
};

export const addToWishlist = (payload) => {
  return {
    type: "ADD_WISHLIST",
    payload: payload,
  };
};
export const removeFromWishlist = (payload) => {
  return {
    type: "REMOVE_WISHLIST",
    payload: payload,
  };
};
export const getWishlist = () => {
  return {
    type: "ADD_WISHLIST",
  };
};
