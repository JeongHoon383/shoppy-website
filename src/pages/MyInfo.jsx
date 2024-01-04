import { useState, useReducer} from "react";
import infoReducer from "../reducer/infoReducer";

export default function MyInfo(){
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [state, infoDispatch] = useReducer(infoReducer, {age:20, name:'홍길동'});
         //{age:20, name:홍길동}
  return(
    <>
      name : <input type="text" onChange={(e)=> setName(e.target.value)} /><br/>
      age : <input type="text" onChange={(e)=> setAge(e.target.value)} /><br/>
      <button type="button" onClick={()=>infoDispatch({type:"change", name:name, age:age})}>정보 변경</button><br/>
      <p>Hello! {state.name} are {state.age}</p>
    </>
  );
}