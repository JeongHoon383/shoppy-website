
const init = {
  count:0, 
  total:0,
}

export default function reduxCount(state=init, action){
  const tot = state.total;
  if(action.type === 'plus'){
    return {
      count:state.count + 1, 
      total: tot + (state.count + 1)
    };
  }else if(action.type === 'minus'){
    return {
      count:state.count - 1, 
      total: tot - state.count
    };
  }else if(action.type === 'reset'){
    return {
      count: 0, 
      total: 0
    };
  }else{
    return {
      count: 0, 
      total: 0
    };
  }
}