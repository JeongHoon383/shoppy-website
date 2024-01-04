import { useState } from 'react';
import CountItem from '../components/CountItem';
import CountTotal from '../components/CountTotal';

export default function MyCount(){
  const [total, setTotal] = useState();

  const getCount = (e) => {
    console.log(e.total);
    setTotal(e.total);
  }

  return(
    <>
     <CountItem getCount={getCount} />
     <hr/>
     <CountTotal total={total} />
    </>
  );
}
