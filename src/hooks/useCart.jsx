import { useState, useEffect } from "react";
import axios from "axios";

export default function useCart(currentPage, userInfo){
  const [cartList, setCartList] = useState([]);
  const [totPrice, setTotPrice] = useState(0);
  const [totDeliprice, setTotDeliprice] = useState(0);
  const [totOrderPrice, setTotOrderPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  useEffect(()=>{
    let startIndex = 0;
    let endIndex = 0;

    startIndex = (currentPage-1) * pageSize+1; //1-1*3+1 : 1, 4 ..
    endIndex = currentPage *pageSize; //1*3 : 3, 6 ..

    axios({
      method : "get",
      url : `http://192.168.50.113:8000/carts/${userInfo.id}/${startIndex}/${endIndex}`
    })
    .then((result) => {
      setCartList(result.data);

      const rows = result.data[0];
      (rows === undefined) ? setTotalCount(0) : setTotalCount(result.data[0].cnt);


      //총 상품가격 구하기
      const newTotPrice = setNewTotPrice(result.data);
      const newTotOrderPrice = newTotPrice + totDeliprice;
      setTotPrice(newTotPrice);
      setTotOrderPrice(newTotOrderPrice);
    })
    .catch();
  }, [currentPage]);

  const setNewTotPrice = (cartList) => {
    return cartList.reduce((total, cart) => total + (cart.price * cart.qty), 0);
  }

  return [cartList, totPrice, totDeliprice, totOrderPrice, totalCount, pageSize];
}