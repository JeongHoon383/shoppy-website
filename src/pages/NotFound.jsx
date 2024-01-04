import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound(){
  const navigate = useNavigate();
  const handleClcik = () => {
    navigate("/");
  }
  return(
    <div className="error_div">
      <img src='/images/error_.png' className="error_image"/>
      <p><button type="button" onClick={handleClcik}>Shoppy Home</button></p>
    </div>
  )
}