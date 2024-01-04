import React from 'react';
import Button from 'react-bootstrap/Button';
import { useRef } from 'react';
import useCartDeleteItem from './../hooks/useCartDeleteItem';


export default function CartDeleteItem({userInfo, cid}){
  const buttonRef = useRef(null);
  useCartDeleteItem(buttonRef, userInfo, cid);

  return(
    <Button variant="danger" 
          type="button"
          className="delete_style"
          ref = {buttonRef}
          >삭제</Button>
  );
}