import { useReducer, useState} from "react";
import countReducer from "../reducer/countReducer";

export default function CountItem(props){
  const [state, countDispatch] = useReducer(countReducer, {count:0, total:0});
  const [number, setNumber] = useState(1);

  props.getCount({total:state.total});

  return(
    <>
      <h1>Count : {state.count} </h1>
      <p>
        <button type="button" 
            onClick={()=> countDispatch({type:'plus', number:number})}> + </button>
        <button type="button" 
            onClick={() => countDispatch({type:'reset'})}> Reset </button>
        <button type="button" 
            onClick={() => countDispatch({type:'minus', number:number})}> - </button>
        <br/><input type="text" value={number} 
            onChange={(e) => setNumber(parseInt(e.target.value))} />
      </p>
      <h3>total : {state.total} </h3>
    </>
  );
}
