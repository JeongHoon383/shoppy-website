import React, { useEffect, useState } from "react";
import { getUser } from '../util/localStorage';
import NotFound from './NotFound';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Quantity from '../components/Quantity';
import { useNavigate } from "react-router-dom";
import Pagination from 'rc-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-pagination/assets/index.css';
import useCart from "../hooks/useCart";
import CartItem from "../components/CartItem";
import useOrder from "../hooks/useOrder";

/******************************
 *  MyCart : 장바구니 리스트
 *****************************/
export default function MyCart(){
  const navigate = useNavigate();
  const userInfo = getUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [cartList, totPrice, totDeliprice, totOrderPrice, totalCount, pageSize] 
        = useCart(currentPage, userInfo);
  const { handleOrder } = useOrder(cartList);        
  
  return(
    <>
    { userInfo ? (      
      <div className="style">
        <h3><img src="/images/cart_img.gif"/>My Cart!! : [Custom hooks]</h3>
      <Table striped bordered hover >
        <thead>
          <tr className="align_style">
            <th>번호</th>
            <th>상품정보</th>
            <th>상품가격</th>
            <th>배송비</th>
            <th className="col_size">기타</th>
          </tr>
        </thead>
        <tbody>
          {cartList.map((cart)=>
            <CartItem key={cart.cid} cart={cart} userInfo={userInfo}/>
          )}
        </tbody>
      </Table>

      <Pagination 
                  className="d-flex justify-content-center"
                  current = {currentPage}
                  total = {totalCount}
                  pageSize = {pageSize} 
                  onChange = {(page) => setCurrentPage(page) }/>

      <div className="tot_div_style">
        <label>총 상품가격 </label><span className="tot_font_style">{totPrice.toLocaleString()} 원</span>
        <label>+ 총 배송비 </label><span className="tot_font_style">{totDeliprice.toLocaleString()} 원</span>   
        <label>= 총 주문금액 </label><span className="tot_order_font_style">{totOrderPrice.toLocaleString()} 원</span>
      </div>
        <div className = "order">
          <button type="button" onClick={()=>navigate('/products')}>계속쇼핑</button>
          <button type="button" onClick={handleOrder}>주문하기</button>
        </div>
      </div>
      ) : (      
      <NotFound />
      )
    }
    </>
  );
}