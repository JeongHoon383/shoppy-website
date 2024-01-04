import { useState, useEffect } from "react";
import axios from "axios";

export default function useProducts(){
  const [productList, setProductList] = useState([]);

  useEffect(()=>{
    axios
      .get('http://192.168.50.113:8000/products/')
      .then((result) => setProductList(result.data))
      .catch((err) => console.log(err));

  }, []);

  return [productList]  
}