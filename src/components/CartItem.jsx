import React from "react";
import { useState, useEffect } from "react";
import CartDeleteItem from "./CartDeleteItem";
import { useDispatch } from "react-redux";
import { cartQtyUpdate } from "../modules_redux/reduxAxios";

export default function CartItem({cart, userInfo}){
  const [number, setNumber] = useState(cart.qty);
  const [cid, setCid] = useState(0);
  const [checkFlag, setCheckFlag] = useState(null);
  const [price, setPrice] = useState(0);
  
  const handleMinus= () => {
    if(number === 1){
      alert('최소 1개 선택');
    }else{
      setNumber(number-1);
      setCid(cart.cid);
      setCheckFlag('minus');
      setPrice(cart.price);
    }
  }

  const handlePlus= () => {
    if(number === 10){
      alert('최대 10개 선택');
    }else{
      setNumber(number+1);
      setCid(cart.cid);
      setCheckFlag('plus');
      setPrice(cart.price);
    }
  }

  //1. 수량 업데이트 dispatch
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(cartQtyUpdate({userInfo, cid, checkFlag, price}));
  }, [number]);


  let style = {width: "20px", display:"inline-block"}
  let style_minus = {width: "30px", display:"inline-block", backgroundColor:"lightGray", cursor:"pointer"}
  let style_plus = {width: "30px", display:"inline-block", backgroundColor:"lightGray", cursor:"pointer"}
  let p_style = { margin:"20px 0 20px 0 "}
  let div_style = { border:"1px solid red", overflow:"hidden", width: "50%"}
  
  return(
    <>
      <tr>
              <td className="align_style">{cart.rno}</td>              
              <td>
                <img className="img_style" src={`http://192.168.50.113:8000/${cart.image}`} />
                {cart.name}
              </td>
              <td className="align_style">{cart.price}</td>
              <td className="align_style">0원</td>
              <td className="align_style">
                <p style={p_style}>      
                  <span style={style_minus} 
                        onClick={handleMinus}> - </span>
                  <span style={style}>{number}</span>
                  <span style={style_plus} 
                        onClick={handlePlus}> + </span>
                </p>

                <CartDeleteItem userInfo={userInfo} cid={cart.cid} />
              </td>
            </tr> 
    </>

  );
}