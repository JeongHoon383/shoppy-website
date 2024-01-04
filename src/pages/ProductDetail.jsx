import React from "react";
import { useParams, useNavigate, useLocation} from "react-router-dom";
import {useState, useEffect, useRef} from "react";
import ProductAvata from "../components/ProductAvata";
import axios from 'axios';
import { getUser } from "../util/localStorage";
import Quantity from "../components/Quantity";
import * as cookie from "../util/cookie.js";

export default function ProductDetail(){
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = getUser();
  const selectSize = useRef(null);
  const {pid} = useParams();
  const [product, setProduct] = useState({});

  //하위(자식) 컴포넌트인 Quantity의 number 값 가져오기
  const [qty, setQty] = useState(1);

  const getQty = (e) => {  //Quantity
    setQty(e.qty);
  }
  
  useEffect(()=>{
    axios
    .get(`http://192.168.50.113:8000/products/${pid}`)
    .then((result) => setProduct(result.data))
    .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setProduct({...product, [name]:value});
  }  

  //장바구니 추가 이벤트
  const handleClick = (e) => {

    if(product.size === undefined){
      alert("사이즈를 선택해주세요");
      return selectSize.current.focus();
    }

    if(userInfo === null){
      alert("로그인 후 상품 추가가 가능합니다.");
      // alert(JSON.stringify(location));
      //현재 주소를 쿠키에 저장 
      cookie.setCookie("sproduct", JSON.stringify(location.pathname));
      navigate("/login");

    }else{
      //axios ==> http://192.168.50.113:8000/carts/new  :: POST
      //회원아이디, 상품아이디, 사이즈, 수량
      const cartProduct = {
                            id:userInfo.id,
                            pid:product.pid,
                            size:product.size,
                            qty : qty
                          };

      axios({
        method : "post",
        url : "http://192.168.50.113:8000/carts/new",
        data : cartProduct
      })
      .then((result) => {
        if(result.data === 'ok'){
          //쿠키에 저장된 sproduct 삭제
          cookie.removeCookie("sproduct");

          const choice = window.confirm("장바구니에 추가 되었습니다. 장바구니로 이동하시겠습니까?");
          if(choice) navigate("/carts");
        }
      })
      .catch();
    }
  }

  
  
  return(
    <div className="content">
      <div className ="product_detail">
        <img src={`http://192.168.50.113:8000/${product.image}`} className="detail_image"/>
        <ul className ="product_info">
          <li className ="detail_font_bigger">{product.name}</li>
          <li className ="detail_font_bigger">{product.price}</li>
          <li className ="detail_font_small">{product.info}</li>
          <li>
            <Quantity getQty = {getQty} />
          </li>
          <li>
              <span className ="detail_font_small">옵션 : </span>
              <select className ="detail_select" 
                      name="size" onChange={handleChange}
                      ref={selectSize}>
                <option value="default">선택해주세요</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
          </li>
          <li><button
                type="button" 
                className ="detail_button"
                onClick={handleClick}>장바구니 추가</button></li>
        </ul>        
      </div>
    </div>
  );
}