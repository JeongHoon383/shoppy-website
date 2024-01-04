import axios from "axios"


export default function useUpdateQty(){

  const updateCartItemQty = async (userInfo, cid, checkFlag) => {
    console.log(`${userInfo.id}, ${cid}, ${checkFlag}`);
    axios({
      method : "put",
      url : `http://192.168.50.113:8000/carts/${userInfo.id}/${cid}/${checkFlag}`    
    })   
    .catch((error) => console.log('qty update error!'));
  }


   return {updateCartItemQty}
}