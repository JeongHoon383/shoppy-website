import React from "react";
import { useState } from "react";
import CartDeleteItem from "./CartDeleteItem";
import useUpdateQty from "../hooks/useUpdateQty";


export default function CartItem({cart, userInfo}){
  const [number, setNumber] = useState(cart.qty);
  const { updateCartItemQty } = useUpdateQty();
  
  const quantityCheck = async (type) => {
    if(type === 'minus'){
        (number === 1) ? alert('최소 1개') : await updateCartItemQty(userInfo, cart.cid, type);
    }else if(type === 'plus'){
        (number === 10) ? alert('최대 10개') : await updateCartItemQty(userInfo, cart.cid, type);
    }
    window.location.reload();
  }


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
                        onClick={(e) => {quantityCheck("minus")}}> - </span>
                  <span style={style}>{number}</span>
                  <span style={style_plus} 
                        onClick={(e) => {quantityCheck("plus")}}> + </span>
                </p>

                <CartDeleteItem userInfo={userInfo} cid={cart.cid} />
              </td>
            </tr> 
    </>

  );
}