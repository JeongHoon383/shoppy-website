import React from "react";
import { useEffect } from "react";
import axios from "axios";


export default function useCartDeleteItem(buttonRef, userInfo, cid){
  // console.log(`userInfo, cid --> ${userInfo.id}, ${cid}`);

  useEffect(() => {

    const handleDelete = async (e) => {
      const confirmResult = window.confirm("정말로 삭제하시겠습니까?");

      if(confirmResult){
        try {
          await axios.get(`http://192.168.50.113:8000/carts/${userInfo.id}/${cid}`)
              .then((result) => {
                  window.location.reload();
              })
              .catch();
        } catch (error) {}   
      } 
    }//handleDelete

    //buttonRef에 클릭이벤트리스너 추가
    if(buttonRef && buttonRef.current){
      buttonRef.current.addEventListener('click', handleDelete);
    }

    //클릭이벤트 실행 후 버튼에 삭제이벤트리스너 추가
    return () => {
      if(buttonRef && buttonRef.current){
        buttonRef.current.removeEventListener('click', handleDelete);
      }
    }

  }, [buttonRef]);

}