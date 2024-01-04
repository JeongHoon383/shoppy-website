import axios from "axios";
import { useState } from "react";

export default function useAxios(){
  const [list, setList] = useState();

  const useDataList = (url) => {
    axios
      .get(url)
      .then((result) => setList(result.data))
      .catch((err) => console.log(err));

      
      return [list];
  }

  return {useDataList}
}