
export default function infoReducer(state, action){
  if(action.type === "change"){
    return {age: action.age, name: action.name};
  }
}