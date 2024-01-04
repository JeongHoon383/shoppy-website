import React from "react";
import {FiShoppingBag} from 'react-icons/fi';
import {BsFillPencilFill} from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";
import { getUser, removeUser } from '../util/localStorage';
import { FaCartArrowDown } from "react-icons/fa6";

export default function Navbar(){
  const navigate = useNavigate();
  const userInfo = getUser();

  const handleLogout = () => {
    alert('로그아웃 하시겠습니까?');
    removeUser();
    navigate('/');
  };

  let icon_style = {width:"20%"}

  return (
    <header> 
      <Link to= "/" className="header_left">
        <FiShoppingBag />
        <span>Shoppy</span>
      </Link>          
      <nav className="header_right">
        {userInfo ? 
          ( <>
              <span>[{userInfo.id}] 님! 반갑습니다.</span> 
              <Link to="/products">Products</Link>
              <Link to="/carts">Carts</Link>
              <Link to="/order">Order</Link>
              <Link to="/products/new">New</Link>
              <button type="button" onClick={handleLogout} >Logout</button>
            </>
          ) : (
            <>
              <Link to="/products">Products</Link>              
              <Link to="/login"><button>Login</button></Link>
            </>
          )
        }
      </nav>
    </header>
  );
}