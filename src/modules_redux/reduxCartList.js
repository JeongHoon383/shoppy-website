/**
 * 페이지 변경 시 장바구니 상태관리 함수
 */
const init = {
  cartList: null,
  totalCount: 0,
  totalPrice: 0,
  pageSize: 0
};

export default function reduxCartList(state=init, action){
  switch(action.type){
    case 'FETCH_DATA_SUCCESS':
      return {
        cartList: action.cartList,
        totalCount: action.totalCount,
        totalPrice: action.totalPrice,
        pageSize: action.pageSize
      }
    default :
      return {
        cartList: null,
        totalCount: 0,
        totalPrice: 0,
        pageSize: 0
      }
  }

}