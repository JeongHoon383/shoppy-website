import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function useOrder(cartList){
  const navigate = useNavigate();
   
  //주문하기
  const handleOrder = (e) => {
    const newOrderList = new Array(); //[{},{}..]
    cartList.map((cart) => {
        const orderProduct = {
            id : cart.id,
            pid : cart.pid,
            size : cart.size,
            qty : cart.qty,
            totPrice : cart.tprice
        };
        newOrderList.push(orderProduct);
    });

    //post 방식으로 서버에 전송
    axios({
      method : "post",
      url : "http://192.168.50.113:8000/order/new",
      data : newOrderList
    })
      .then((result) => {
        if(result.data === 'ok'){
          // alert("주문 테이블 추가성공!");
          navigate('/order');
        }
      })
      .catch();    
  }//handleOrder

  return {handleOrder};
}