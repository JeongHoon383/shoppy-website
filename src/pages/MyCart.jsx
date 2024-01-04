import React, { useEffect, useState } from "react";
import { getUser } from '../util/localStorage';
import NotFound from '../pages/NotFound';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Quantity from './../components/Quantity';
import { useNavigate } from "react-router-dom";
import Pagination from 'rc-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-pagination/assets/index.css';
import CartItem from "../components/CartItem";
import useOrder from "../hooks/useOrder";

import { useDispatch, useSelector } from 'react-redux';
import { cartListFetchData } from '../api/cartsAPI';
import { getCartListData } from '../modules_redux/reduxSelector';

/******************************
 *  MyCart : 장바구니 리스트
 *****************************/
export default function MyCart(){
  const navigate = useNavigate();
  const userInfo = getUser();
  const [currentPage, setCurrentPage] = useState(1);  
  const dispatch = useDispatch();

  useEffect(()=>{
    //1. dispatch => API :: Axios 액션 함수 -> src/api/cartsAPI.js
    dispatch(cartListFetchData({userInfo, currentPage}));
  }, [currentPage]);

  //2. useSelector
  const  { cartList, totalCount, totalPrice, pageSize} = useSelector(getCartListData);
  const { handleOrder } = useOrder(cartList);   


  return(
    <>
    { userInfo ? (      
      <div className="style">
        <h3><img src="/images/cart_img.gif"/>My Cart!! : [Redux]</h3>
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
          {cartList && cartList.map((cart)=>
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
        <label>총 상품가격 </label><span className="tot_font_style">{totalPrice.toLocaleString()} 원</span>
        <label>+ 총 배송비 </label><span className="tot_font_style">{0}원</span>   
        <label>= 총 주문금액 </label><span className="tot_order_font_style">{totalPrice.toLocaleString()} 원</span>
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