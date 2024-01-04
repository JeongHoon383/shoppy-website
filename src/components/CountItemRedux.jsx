// import { useReducer, useState} from "react";
// import countReducer from "../reducer/countReducer";

export default function CountItemRedux({count, total, onPlus, onMinus, onReset}){
  // const [state, countDispatch] = useReducer(countReducer, {count:0, total:0});
  // const [number, setNumber] = useState(1);

  return(
    <>
      <h1>Count : {count} </h1>
      <p>
        <button type="button" onClick={onPlus}> + </button>
        <button type="button" onClick={onReset}> Reset </button>
        <button type="button" onClick={onMinus}> - </button>
        {/* <br/><input type="text" value={number} 
            onChange={(e) => setNumber(parseInt(e.target.value))} /> */}
      </p>
      <h3>total : {total} </h3>
    </>
  );
}
