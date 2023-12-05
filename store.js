

import { legacy_createStore as createStore} from 'redux'
import rootReducer from "./reducers/index";
//import movelistReducer from './reducers/movelistReducers'

const store = createStore(rootReducer);

export default store;