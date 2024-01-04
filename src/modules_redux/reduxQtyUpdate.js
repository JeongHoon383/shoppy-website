/**
 * 장바구니 수량 변경 시 상태관리 함수
 */
const init = {
  price: 0
};

export default function reduxQtyUpdate(state=init, action){
  switch(action.type){
    case 'UPDATE_SUCCESS':
      return {
        price: action.price
      }
    default :
      return {
        price: 0
      }
  }

}