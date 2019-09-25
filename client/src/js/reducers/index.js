import { REGISTER_USER } from "../constants/action-types";
const initialState = {
  names: [],
  emails:[]
};

function rootReducer(state = initialState, action) {
    if (action.type === REGISTER_USER) {
      console.log("processing in reducer")
      return Object.assign({}, state, {
        names: state.names.concat(action.payload)
      });
    }
    return state;
  }
  
export default rootReducer;