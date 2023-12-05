import cartReducer from "./cartReducers";
import movelistReducer from './wishlistReducers'
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist:movelistReducer
});

export default rootReducer;