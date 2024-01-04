
export default function countReducer(state, action){
  const tot = state.total;
  if(action.type === 'plus'){
    return {
      count:state.count + action.number, 
      total: tot + (state.count + action.number)
    };
  }else if(action.type === 'minus'){
    return {
      count:state.count - action.number, 
      total: tot - state.count
    };
  }else if(action.type === 'reset'){
    return 0;
  }
}