import React from "react";
import { Link, useNavigate} from "react-router-dom";
import {useState, useRef} from "react";
import axios from 'axios';
import * as cookie from '../util/cookie.js';
import { jwtDecode } from 'jwt-decode';

export default function Login(){  
  const navigate = useNavigate();  
  const inputId = useRef(null);
  const inputPass = useRef(null);

  const [loginForm, setLoginForm] = useState({id:'', pass:''});
  const handleChange = (e) => {
    const {name, value} = e.target;
    setLoginForm({...loginForm, [name]:value});
    console.log(loginForm);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //validationCheck
    if(loginForm.id === ""){
      alert("아이디를 입력해주세요");
      return inputId.current.focus();
    }
    if(loginForm.pass === ""){
      alert("패스워드를 입력해주세요");
      return inputPass.current.focus();
    }

    //서버연동 : axios
    axios({
      method : 'post',
      url : 'http://192.168.50.113:8000/login/',
      data : loginForm
    })
    .then((result) => {
      if(result.data.login_result){
        // alert(result.data.token);        
        alert("로그인에 성공하셨습니다");
        //토큰을 쿠키에 추가
        cookie.setCookie("x-auth-jwt", result.data.token);

        //토큰에 추가된 id 추출(토큰 디코딩: jwt-decode) 후 로컬스토리지에 저장
        const userInfo = jwtDecode(result.data.token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));        

        //쿠키에 저장된 sproduct 값을 체크한 후 이동
        const sproduct = cookie.getCookie("sproduct");
        if(sproduct === undefined){
          navigate("/");
        } else{
          navigate(sproduct);
        }

      }else{
        if(result.data.cnt === 1){          
          alert("패스워드가 다릅니다. 다시 확인해주세요");
          setLoginForm({...loginForm,pass:''});
          return inputPass.current.focus();
        }else{
          alert("아이디와 패스워드가 다릅니다. 다시 확인해주세요");
          setLoginForm({id:'',pass:''});
          return inputId.current.focus();
        }
      }
    })
    .catch();
  }//handleSumbit

  const handleReset = (e) =>{
    setLoginForm({id:'', pass:''});
  }

  return(
    <div className="content">  
    <h3>Login</h3>   
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label>아이디</label>
            <input type="text" name="id" value={loginForm.id}
                        ref={inputId} onChange={handleChange}/>
          </li>
           <li>
            <label>패스워드</label>
            <input type="password" name="pass" value={loginForm.pass}
                       ref={inputPass} onChange={handleChange} />
          </li>
          <li>
            <button>로그인</button>
            <button type="button" onClick={handleReset}>다시쓰기</button>
          </li>
        </ul>
      </form>
      <span>아이디/패스워드찾기</span> &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/signup"><span>회원가입</span></Link>

    </div>
  );
}