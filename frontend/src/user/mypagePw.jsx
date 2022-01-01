import React, { useState, useEffect } from "react";
import Header from "../UserComponents/header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
const MyPagePwWrap = styled.div`
    * { text-decoration:none; }
    ul, li { list-style: none; padding:0; margin: 0;}
    input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }
    .container { max-width:100rem; margin: 0 auto;  }
    .navBar { float: left; width: 12rem; padding:5rem 3rem 3rem 2rem; }
    .menuLink { margin-bottom: 4rem; color: #555; cursor: pointer; font-size: 1.6rem; }
    .menuLink.on { font-weight: 600; color: #14c1c7; }
    .menuLink:hover { color:#14c1c7; font-weight: 600; }
    .content { padding: 5.5rem 3rem 5rem 10rem; overflow: hidden; border-left: 1px solid rgba(0,0,0,0.1); height: 77.5vh;}
    .profileItem { display: flex; position: relative; align-items: center; margin-bottom: 1.5rem; margin-left: 4.5rem; }
    .profileFirst { margin-left: -2rem; margin-bottom: 5rem; }
    .section1 { width: 11rem; position: relative; right:3rem; font-size: 1.4rem; text-align: left; font-weight: 600; margin-top: -2rem; }
    .section2 { width: 80%; height: 6.2rem; }
    .modifyImg { color: #1cbbeb; font-weight: bold; cursor: pointer; font-size: 1.5rem; margin-top: .5rem; }
    .profileImg img { width: 6.5rem; border-radius: 50%; vertical-align:middle; border: 2px solid #999; margin-left: 6rem; }
    .profileName { font-size: 1.7rem; font-weight: bold; color: #444; margin-top: 1rem; margin-left: 0.5rem; }
    .section2 .red { font-size: 1.2rem; margin-top: 0.5rem; color: #fb3b3b; }
    .section2 input { border: 1px solid lightgray; background-color: #fff; border-radius: 5px; width: 90%; height: 4rem; color: black; font-size: 1.4rem; padding-left: 1rem; }
    .section2 textarea { border: 1px solid lightgray; background-color: #fff; border-radius: 5px; width: 100%; height: 8rem; color: black; font-size: 1.4rem; padding-left: 1rem; padding-top: 1rem; }
    .section2 h3 { font-size: 1.6rem; margin: 2rem 0 0 1rem; font-weight: 400; }
    .section2 p { font-size: 1.4rem;  margin: 0; margin-left:1rem; }
    .widthraw { color: #1cbbeb; cursor: pointer; display: inline-block; font-size: 1.5rem; position:relative; left: 4rem; }
    .widthraw:hover { font-weight: 600; }
    .submitBtn { text-align: center; margin-top: 5rem; }
    .btn:disabled{ background: #dfdfdf; }
    .btn { width: 12rem; height: 4rem; font-size: 1.5rem; background: #14c1c7; border-radius: 7px; color: #fff; cursor: pointer; box-shadow: 3px 3px 3px #d0d0d0; }
    .success{ display: none }
`;

// 버튼 활성화
let passwordDisable = false;
let passwordDisable2 = false;
let passwordDisable3 = false;

const cookie = document.cookie.substring(6); // cookie값
const MyPagePw = () =>{
    const menuClick = ()=>{ };
    
    const [info, setInfo] = useState([]); //멤버 정보 저장

    //비밀번호 확인
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [password3, setPassword3] = useState('');

    //유효성 검사
    const [isPassword, setIsPassword] = useState(false);
    const [isPassword2, setIsPassword2] = useState(false);
    const [isPassword3, setIsPassword3] = useState(false);

    const [disabled, setDisabled] = useState('disabled'); // 버튼 disabled

    const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/ //비밀번호 정규식

    //전 비밀번호 
    const passwordInput = (e) => {
        e.preventDefault();
        const password = e.target.value;
        setPassword(password);
        if (!regExp.test(password)) {
            setIsPassword(false);
            passwordDisable = false;
        } else {
            setIsPassword(true);
            passwordDisable = true;
        }
        idDisabled()
    }

    //새 비밀번호
    const passwordInput2 = (e) => {
        e.preventDefault();
        const password = e.target.value;
        setPassword2(password);
        if (!regExp.test(password)) {
            setIsPassword2(false);
            passwordDisable2 = false;
        } else {
            setIsPassword2(true);
            passwordDisable2 = true;
        }
        idDisabled()
    }

    //새 비밀번호 확인 
    const passwordInput3 = (e) => {
        e.preventDefault();
        const password3 = e.target.value;
        setPassword3(password3);
        if(password2 === password3){
            passwordDisable3 = true;
            setIsPassword3(true);
        }else{
            passwordDisable3 = false;
            setIsPassword3(false);
        }
        idDisabled()
    }

    const idDisabled = () => {
        if(passwordDisable === true && passwordDisable2 === true && passwordDisable3===true) {
            setDisabled('');
        }else{
            setDisabled('disabled');
        }
    }

    // 프로필정보 불러오기
    useEffect(async () => {
        const info = await axios.get(`http://localhost:3001/member/imgandname?idx=${cookie}`)
        setInfo(info.data[0])
    }, []);

    //비밀번호 변경 제출
    const send = async () => { 
        await axios({
            method: "post",
            url:`http://localhost:3001/member/ComparePassword`,
            data: {
                userPw: password,
                userPw2: password2,
                idx: cookie
            }
        })
        .then(log => {
            if(log.data === false){
                alert('이전 비밀번호를 확인해주세요.')
            } else{
                alert("비밀번호가 변경되었습니다");
            }
            window.location.reload();
        })
    }

    return (
        <>
            <Header/>
            <MyPagePwWrap>
                <div className="container">
                    <div>
                    <ul className="navBar">
                            <Link to="/mypage"><li className="menuLink" onClick={menuClick}>프로필 편집</li></Link>
                            <Link to="/mypagePw"><li className="menuLink on" onClick={menuClick}>비밀번호 변경</li></Link>
                            <Link to="/mypageQnAList"><li className="menuLink" onClick={menuClick}>문의내역</li></Link>
                            <Link to="/mypageQnA"><li className="menuLink" onClick={menuClick}>문의하기</li></Link>
                        </ul>
                    </div>
                    <div className="content">
                        <ul className="profileList">
                            <li className="profileItem profileFirst">
                                <div className="profileImg section1">
                                    <img src={info.img!==null?"/"+info.img:'/img/admin/noneImg.png'} alt="프로필사진"/>
                                </div>
                                <div className="profileNameBox section2">
                                    <div className="profileName">{info.name}</div>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">이전 비밀번호</div>
                                <div className="profileNameBox section2">
                                    <input type="password" name="currPw" id="currPw" placeholder="이전 비밀번호" onChange={passwordInput}/>
                                    <p className="red">{password.length > 0 && <span className={`message ${isPassword  ? 'success' : 'error'}`}>* 영문,숫자,특수문자 포함 8자 이상 입력해주세요.</span>}</p>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">새 비밀번호</div>
                                <div className="profileNameBox section2">
                                    <input type="password" name="newPw" id="newPw" placeholder="새 비밀번호" onChange={passwordInput2}/>
                                    <p className="red">{password2.length > 0 && <span className={`message ${isPassword2  ? 'success' : 'error'}`}>* 영문,숫자,특수문자 포함 8자 이상 입력해주세요.</span>}</p>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">새 비밀번호 확인</div>
                                <div className="profileNameBox section2">
                                    <input type="password" name="confirmNewPw" id="confirmNewPw" placeholder="새 비밀번호 확인" onChange={passwordInput3}/>
                                    <p className="red">{password3.length > 0 && <span className={`message ${isPassword3  ? 'success' : 'error'}`}>* 새 비밀번호가 일치하지 않습니다.</span>}</p>
                                </div>
                            </li>
                        </ul>
                        <div className="submitBtn">
                            <button type="submit" onClick={send} className="btn" disabled={disabled}> 변경 </button>
                        </div>
                    </div>
                </div>
            </MyPagePwWrap>
        </>
    );
}

export default MyPagePw;
