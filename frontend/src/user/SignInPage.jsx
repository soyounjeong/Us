import React, { useState, useEffect, Component } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import styled from 'styled-components';
import '../../src/app.css';
import axios from 'axios';
const Login = styled.div`
    input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }
    button { border: 1px solid black; border-radius: 10px; cursor: pointer; }
    .body { width: 38rem; padding: 2rem; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
    .logo { display: flex; justify-content: center; align-items: center; }
    .logo img { width: 12rem; }
    .login_top input{ border-radius: 12px; width: 37rem; height: 4.6rem; margin-bottom: 0.5rem; border: 1px solid lightgray; font-size: 1.4rem; background-color: #fff; padding-left: 1rem; caret-color: #14c1c7; }
    .login_top input:hover{ border: 1px solid #14c1c7; }
    .login_btn2 { display: flex; align-items: baseline; cursor: pointer; justify-content: space-between; }
    .signup, .find { background: #14c1c7; width: 18.5rem; color: white;  border: none;  font-size: 1.4rem; padding: 1.2rem 0; font-weight: 600; }
    .login_btn_box { margin-top: 2rem; }
    .login_btn1 { border-radius: 10px; border: none;  background: #14c1c7; width: 100%;  padding: 1.1rem 0;  font-size: 1.6rem;  color: white;  margin-bottom: 5px; font-weight: 600; }
    .login_btn1:disabled { background: #dfdfdf; }
    .forheigth { height: 65px; }
    .login-text { font-size:1.5rem; margin-bottom: 1rem;  }
    .red { color:red; font-size:1.2rem; margin: 0 0 0 0.7rem; }
`;

let emailDisable = false;
let passwordDisable = false;

const LoginPage = () => {
    
    const formRef = React.createRef();
    function onSubmit(event){ }

    //이메일, 비밀번호 확인
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [display, setDisplay] = useState("none")
    const [display2, setDisplay2] = useState("none")

    const changeDispaly = (display) => {
        setDisplay(display)
    }
    const changeDispaly2 = (display2) => {
        setDisplay2(display2)
    }

    const checkEmail = (e) => {
        e.preventDefault();
        const inputId = e.target.value;
        setEmail(inputId);
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        if (regExp.test(e.target.value) === false) {
            changeDispaly("block")
            emailDisable = false
        } else {
            changeDispaly("none")
            emailDisable = true
        }
        idDisabled()
    }

    //비밀번호 유효성 검사
    const checkPassword = (e) => {
        e.preventDefault();
        const inputPw = e.target.value;
        setPassword(inputPw);
        //  8 ~ 10자 영문, 숫자 조합
        var regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        if (regExp.test(e.target.value) === false) {
            changeDispaly2("block")
            passwordDisable = false
        } else {
            changeDispaly2("none")
            passwordDisable = true
        }
        idDisabled()
    }

    const [disabled, setDisabled] = React.useState('disabled');

    const idDisabled = () => {
        if (emailDisable === true && passwordDisable === true) {
            setDisabled('');
        } else {
            setDisabled('disabled');
        }
    }
    const onClickLogin = async(e) => {
        e.preventDefault();
        await axios({
            method: "post",
            url:`http://localhost:3001/member/login`,
            data: {
                email: email,
                userPw: password
            }
        })
        .then(res => {
            console.log(res)
            // 작업 완료 되면 페이지 이동(새로고침)
            if(res.data == false){
                alert("아이디와 패스워드가 일치하지 않습니다.");
            }else{
                document.location.href = `/main?idx=${res.data}`
            }
        })
    }

    return (
        <Login>
            <div className="body">
                <div className="logo">
                    <img src="img/us_logo_forLogin.png"></img>
                </div>
                <div>
                    <form className="Login" ref={formRef} onSubmit={onSubmit}>
                        <div className="login_top">
                            {/* 이메일 인풋창 */}
                            <p className='login-text'>이메일</p>
                            <div className="forheigth">
                                <input id="email" onChange={checkEmail} placeholder="이메일을 입력해주세요." />
                                <p className="red" style={{ display: display }}>* 이메일 양식을 확인해주세요.</p>
                            </div>
                            {/* 비밀번호 인풋 */}
                            <p className='login-text'>비밀번호</p>
                            <div className="forheigth">
                                <input id="pw" onChange={checkPassword} placeholder="비밀번호를 입력해주세요." type="password" />
                                <p className="red" style={{ display: display2 }}>* 영문,숫자,특수문자 포함 8자 이상 입력해주세요.</p>
                            </div>
                        </div>

                        <div className="login_btn_box">
                            {/* 로그인버튼 , 회원가입버튼*/}
                            <button className="login_btn1" type="button" disabled={disabled} onClick={onClickLogin} >로그인</button>
                        </div>

                        <div className="login_btn2">
                            <Link to="/Regist1">
                                <button className="signup">
                                    회원가입
                                </button>
                            </Link>

                            <Link Link to="/FindIdPw">
                                <button className="find">이메일/비밀번호 찾기</button>
                            </Link>
                        </div>
                        {/* 회원가입 버튼 클릭 -> /signup페이지로 이동 */}
                    </form>
                </div>
            </div>
        </Login>
    )
}
export default LoginPage;