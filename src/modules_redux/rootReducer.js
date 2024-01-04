import { combineReducers } from "redux";
import reduxCartList from "./reduxCartList";
import reduxQtyUpdate from "./reduxQtyUpdate";


/** 여러개의 reducer를 합치는 기능 */
const rootReducer = combineReducers({
  reduxCartList,
  reduxQtyUpdate
});

export default rootReducer;