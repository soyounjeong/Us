import React, { useState, Component, useEffect } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

const Regi1 = styled.div`
    input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }
    input[type="checkbox"] { -webkit-appearance: auto; }
    .body{ width: 37rem; padding: 2rem; position:absolute; top:50%; left:50%; transform: translate(-50%, -50%); }
    .topNum{ display: flex; justify-content: center; align-items: center; }
    .topNum img{ width: 12rem; }
    .topnav h2 { color: #14c1c7; text-align: center; font-size: 1.7rem; } 
    .forregi { display: flex; flex-direction: column; margin-top: 3rem; }
    .forregi input{ border-bottom: 1px solid lightgray; height: 4rem; color: #222; border-left: none; border-right: none; margin-bottom: 1rem; font-size: 1.4rem; width: 95%; padding-left: 0.5rem; }
    .checkbtn input{ position: relative; bottom: -0.4rem; height: 2rem; width: auto; margin-bottom: 0; margin-right: 1rem; }
    .checkbtn span { color: #14c1c7; font-weight: bold; margin-right: 0.3rem; }
    .activebtn button { padding: 1.1rem 0; font-size: 1.6rem; font-weight: bold; color: white; width: 100%; margin: 1.2rem 0 0; border-radius: 10px; border: none; background: #14c1c7; cursor: pointer; }
    .activebtn button:disabled { background: #dfdfdf; }
    .red { color:red; font-size:1.2rem; margin: 0 0 0 1.2rem; text-align: left; }
    .checkbtn { margin-left: 1.1rem; }
    .checkbtn p { font-size: 1.3rem; position: relative; top: -7px; left: -4px; z-index: 10; display:flex; }
    .forheigth{ height: 7rem; text-align: center; }
    .checkinput{ border: 1px red }
    .checkimg{ position: relative; top: 6px; }
    .genderSelectBox { margin: 1rem 0 2rem; font-size: 1.35rem; }
    .genderSelectBox span { font-size: 1.5rem;  color: #666; margin-left: 1rem; }
    .genderSelectBox label { margin-left: 2.5rem; }
    .choiceGender { margin-left: 1rem; }
    input[id="check"] { display: none; }
    input[id="check2"] { display: none; }
    input[type="radio"]{ display: none; }
    input[type="radio"] + label { display: inline-block;  height: 2.7rem;  padding-left: 3.2rem;  background: url(/img/admin/checkbox.png) no-repeat 0 0;  background-size: 2.3rem; cursor: pointer;  vertical-align: middle; }
    input[type="radio"]:checked + label { height: 2.3rem; background: url(/img/admin/check.png) no-repeat 0 0; background-size: 1.8rem; }
    input[type=checkbox] { height: 0; width: 0; visibility: hidden;}
    .checkbtn label {cursor: pointer; text-indent: -9999px; width: 4rem; height: 2.5rem; background: #999; display: block; border-radius: 100px; position: relative; top: -3px; margin-right: 8px;}
    .checkbtn label:after {content: ''; position: absolute; top: 0.3rem; left: 0.4rem; width: 1.9rem; height: 1.9rem; background: #fff; border-radius: 90px; transition: 0.3s;}
    .checkbtn input:checked + label { background: #14c1c7;}
    .checkbtn input:checked + label:after { left: calc(100% - 5px); transform: translateX(-100%);}
    .checkbtn label:active:after { width: 45px;}
`;

let emailDisable = false;
let passwordDisable = false;
let nameDisable = false;
let hpDisable = false;
let btnDisable =false;
let btn2Disable =false;
let genderDisable = false;

const RegistPage1 = () => {

    const formRef = React.createRef();

    //이메일, 비밀번호 확인
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [hp, setHp] = React.useState('')
    const [checkedInputs, setCheckedInputs] = useState([]);
    const [checkedInputs2, setCheckedInputs2] = useState([]);

    const [random, setRandom] = useState(''); // 랜덤코드 저장
    
    //에러메세지 온오프
    const [display, setDisplay] = useState("none");
    const [display2, setDisplay2] = useState("none");
    const [display3, setDisplay3] = useState("none");
    const [display4, setDisplay4] = useState("none");

    const changeDispaly = (display) => { setDisplay(display) }
    const changeDispaly2 = (display2) => { setDisplay2(display2) }
    const changeDispaly3 = (display3) => { setDisplay3(display3) }
    const changeDispaly4 = (display4) => { setDisplay4(display4) }

    useEffect (()=>{
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
        const stringLength = 6
        let randomstring = ''
        for (let i = 0; i < stringLength; i++) {
            const rnum = Math.floor(Math.random() * chars.length)
            randomstring += chars.substring(rnum, rnum + 1)
        }
        setRandom(randomstring);
    },[])

    const checkEmail = (e) => {
        e.preventDefault();
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        const emailV = e.target.value;
        setEmail(emailV)
        if (regExp.test(e.target.value) === false) {
            changeDispaly("block")
            emailDisable = false
        } else {
            changeDispaly("none")
            emailDisable = true
        }
        idDisabled()
    }

    ///비밀번호 유효성 검사
    const checkPassword = (e) => {
        e.preventDefault();
        var regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/ //  8 ~ 10자 영문, 숫자 조합
        const pwV = e.target.value;
        setPassword(pwV)
        if (regExp.test(e.target.value) === false) {
            changeDispaly2("block")
            passwordDisable = false
        } else {
            changeDispaly2("none")
            passwordDisable = true
        }
        idDisabled()
    }

    //한글이름 유효성 검사
    const checkName = (e) => {
        e.preventDefault();
        var regExp = /^[가-힣]{2,15}$/;
        const pwV = e.target.value;
        setName(pwV)
        if (regExp.test(e.target.value) === false) {
            changeDispaly3("block")
            nameDisable = false
        } else {
            changeDispaly3("none")
            nameDisable = true
        }
        idDisabled()
    }

    //핸드폰 번호 유효성 검사
    const checkPh = (e) => {
        e.preventDefault();
        var regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        const pwV = e.target.value;
        setHp(pwV)
        if (regExp.test(e.target.value) === false) {
            changeDispaly4("block")
            hpDisable = false
        } else {
            changeDispaly4("none")
            hpDisable = true
        }
        idDisabled()
    }

    const changeHandler = (checked, id) => {
        if (checked) {
            setCheckedInputs([...checkedInputs, id]);
            btnDisable = true;
        } else {
            setCheckedInputs(checkedInputs.filter(el => el !== id));
            btnDisable = false;
        }
        idDisabled();
    };

    const changeHandler2 = (checked2, id2) => {
        if (checked2) {
            setCheckedInputs2([...checkedInputs2, id2]);
            btn2Disable = true;
        } else {
            setCheckedInputs2(checkedInputs2.filter(el => el !== id2));
            btn2Disable = false;
        }
        idDisabled();
    };
    
    const checkGender = () =>{ genderDisable = true; idDisabled(); }
    
    // 버튼 활성화
    const [disabled, setDisabled ] = React.useState('disabled');
    const idDisabled = () => {
        if(emailDisable===true&&passwordDisable===true&&nameDisable===true&&hpDisable===true&&btnDisable===true&&btn2Disable==true&&genderDisable==true){
            setDisabled('');
        }else{
            setDisabled('disabled');
        }
    }
    
    // axios 제출
    const goRegist = async () => {
        const gen =  document.querySelector("input[name='gender']:checked");
        console.log(email)
        await axios({
            method:"post",
            url:`http://localhost:3001/member/regist`,
            data: {
                email: email,
                userPw: password,
                name: name,
                tel: hp,
                gender: gen.value,
                code: random,
                agreement1:'Y',
                agreement2:'Y'
                
            }
        })
        .then(log => {
            if(log.data===true){
                alert('회원가입이 완료되었습니다. 로그인 페이지에서 로그인 해주세요!')
                window.location.href="/"
            }else{
                alert('올바르지 않거나 중복된 정보입니다. 다시 입력해 주세요!')
            }
        });
    }

    return (
        <Regi1>
            <div className="body">
                <div className="topnav">
                    <div className="topNum">
                        <img src="img/us_logo_forLogin.png"></img>
                    </div>
                    <h2>US 에 처음 오신 것을 환영합니다</h2>
                </div>
                <form className="forregi" ref={formRef}>
                    <div className="forheigth">
                        <input id="email" onChange={checkEmail} placeholder="이메일을 입력해주세요." />
                        <p className="red" style={{ display: display }}>* 이메일 양식을 확인해주세요.</p>
                    </div>
                    <div className="forheigth">
                        <input id="pw" onChange={checkPassword} placeholder="비밀번호를 입력해주세요." type="password" />
                        <p className="red" style={{ display: display2 }}>* 영문,숫자,특수문자 포함 8자 이상 입력해주세요.</p>
                    </div>
                    <div className="forheigth">
                        <input id="koreaName" onChange={checkName} placeholder="이름을 입력해주세요." />
                        <p className="red" style={{ display: display3 }}>* 한글 2글자 이상 입력해주세요.</p>
                    </div>
                    <div className="forheigth">
                        <input id="ph" onChange={checkPh} placeholder="휴대폰번호를 입력해주세요." />
                        <p className="red" style={{ display: display4 }}>* 전화번호를 다시 입력해 주세요. ('-'제외)</p>
                    </div>
                    <div className="genderSelectBox">
                        <span>성별</span>
                        <input type="radio" id="male" name="gender" value="남" className="choiceGender"/><label for="male" onClick={checkGender} className="gender"></label>남자
                        <input type="radio" id="female" name="gender" value="여" className="choiceGender"/><label for="female" onClick={checkGender} className="gender"></label>여자
                    </div>
                    <div className="checkbtn">
                        <p><input type="checkbox" className="checkinput" id="check" onChange={e => { changeHandler(e.currentTarget.checked, 'check'); }} checked={checkedInputs.includes('check') ? true : false} />
                            <label id="check" htmlFor="check">Toggle</label>
                            <span>이용약관</span> 에 동의합니다</p>
                        <p><input type="checkbox" className="checkinput" id="check2" onChange={e => { changeHandler2(e.currentTarget.checked, 'check2'); }} checked={checkedInputs2.includes('check2') ? true : false} />
                            <label id="check2" htmlFor="check2">Toggle</label>
                            <span>개인 정보 보호 약관</span> 에 동의합니다</p>
                    </div>
                    <div className="activebtn">
                        <button type="button" onClick={goRegist} disabled={disabled}>회원가입</button>
                    </div>
                </form>
            </div>
        </Regi1>
    )
}
export default RegistPage1;