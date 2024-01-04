import axios from "axios";

/** 장바구니 수량 업데이트 */
export const cartQtyUpdate = ({userInfo, cid, checkFlag, price}) => {
  console.log(`${userInfo.id}, ${cid}, ${checkFlag}, ${price}`);

  return async (dispatch) => {
    if(checkFlag !== null){
        axios({
          method : "put",
          url : `http://192.168.50.113:8000/carts/${userInfo.id}/${cid}/${checkFlag}`    
        })  
        .then((result) => console.log('==>> qty update success!!!')) 
        .catch((error) => console.log('==>> qty update error!'));

        dispatch({
          type: "UPDATE_SUCCESS",
          price: price
        });

    }  
  }//return
    
}


/** 장바구니 리스트  */
export const cartListFetchData = ({userInfo, currentPage}) => {
    let startIndex = 0;
    let endIndex = 0;
    const pageSize = 3;

    startIndex = (currentPage-1) * pageSize+1; //1-1*3+1 : 1, 4 ..
    endIndex = currentPage * pageSize; //1*3 : 3, 6 ..

    return async (dispatch) => {
      const result = await axios.get(`http://192.168.50.113:8000/carts/${userInfo.id}/${startIndex}/${endIndex}`);
      const cartList = JSON.parse(JSON.stringify(result.data)); 
      const totalCount = result.data[0].cnt;
      const totalPrice = result.data[0].totalprice;

      dispatch({
        type: "FETCH_DATA_SUCCESS",
        cartList: cartList,
        totalCount: totalCount,
        totalPrice: totalPrice,
        pageSize: pageSize
      });

    }
    
}