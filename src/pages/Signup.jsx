import React from "react";
import {useState, useRef} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login(){  
  const navigate = useNavigate();
  const [form, setForm ] = useState({name:'',id:'',pass:'',phone:''});
  
  //아이디 중복체크 결과출력 메시지
  const [checkError, setCheckError] = useState('');

  const handleChange = (e) => {
    const {name, value} = e.target;  // {id:'hong'} , {name:'홍길동'}
    setForm({...form, [name]:value});

    //아이디 중복체크
    if(name === "id" && value !== ""){
      axios({
        method : "GET",
        url : `http://192.168.50.113:8000/signup/${value}`
      })
      .then((result) => {
        if(result.data.cnt === 1){
          setCheckError('이미 사용중인 아이디 입니다.');
        }else{
          setCheckError('사용이 가능합니다.');
        }
      })
      .catch();
    }
  }

  const inputName = useRef(null); 
  const inputId = useRef(null); 
  const inputPass = useRef(null); 
  const inputPhone = useRef(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //validationCheck(유효성체크)
    if(form.name === ""){
      alert("이름을 입력해주세요");
      return inputName.current.focus();
    }
    if(form.id === ""){
      alert("아이디를 입력해주세요");
      return inputId.current.focus();
    }
    if(form.pass === ""){
      alert("패스워드를 입력해주세요");
      return inputPass.current.focus();
    }
    if(form.phone === ""){
      alert("폰번호를 입력해주세요");
      return inputPhone.current.focus();
    }


    axios({
      method:'post',
      url:'http://192.168.50.113:8000/signup/',
      data: form,
    })
    .then((result) =>{
      if(result.data === 'ok'){
        alert("회원등록이 완료되었습니다.");
        navigate("/login");
       }
    })
    .catch((err) => console.log(err));
  }

  const handleReset = (e) => {
    setForm({name:'', id:'', pass:'', phone:''});
  }

  const handleIdCheck = (e) => {
    
  }

  return(
    <div className="content">  
    <h3>Signup</h3>   
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label>이름</label>
            <input type="text" name="name" value={form.name} 
                  ref={inputName} onChange={handleChange}/>
          </li>
          <li>
            <label>아이디</label>
            <input type="text" name="id" value={form.id} 
                  ref={inputId} onChange={handleChange}/>
            <div name="checkMsg">{checkError}</div>
          </li>
          <li>
            <label>패스워드</label>
            <input type="password" name="pass" value={form.pass} 
                  ref={inputPass} onChange={handleChange}/>
          </li>
          <li>
            <label>폰번호</label>
            <input type="text" name="phone" placeholder="- 없이"
                   value={form.phone} ref={inputPhone} 
                   onChange={handleChange}/>
          </li>
          <li>
            <button>회원가입</button>
            <button type="reset" onClick={handleReset}>다시쓰기</button>
          </li>
        </ul>
      </form>
      
    </div>
  );
}