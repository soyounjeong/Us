import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useParams } from "react-router";

const FindId = styled.div`
    .body{ width: 42rem; position:absolute; top:50%; left:50%; transform: translate(-50%, -50%); padding: 2rem; }
    .topNum{ display: flex; justify-content: center; align-items: center; }
    .topNum img { width: 12rem; margin-bottom: 3rem; }
    .twoBtn { justify-content: space-between; }
    h1 { font-size: 1.7rem; color: #555; }
    .twoKindBtn, .twoKindBtn2 { padding: 1.25rem 0;   font-size: 1.6rem;  font-weight: bolder; color: white;  width: 48.5%;  margin: 3.5rem 0 0;  border-radius: 10px; border:0;  background: #14c1c7; margin-right: 5px; cursor: pointer; }
    .topNum{ display: flex; justify-content: center; align-items: center; }
    h1 span{ color: #14c1c7; font-size: 1.9rem; margin: 0 0.5rem; }
    hr { margin-top: 2rem; color: #999; }
`;

const SuckFindId = () => {
    const email = useParams();
    return (
        <FindId>
            <div className="body">
                <div className="findtopnav">
                    <div className="topNum">
                        <img src="/img/us_logo_forLogin.png"></img>
                    </div>
                    <h1>회원님의 이메일 주소는 <span>{email.email}</span> 입니다.</h1>
                    <hr />
                </div>
                <div className="twoBtn">
                    <Link to="/FindIdPw2">
                        <button className="twoKindBtn">
                            비밀번호 찾기
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="twoKindBtn2">
                            로그인
                        </button>
                    </Link>
                </div>
            </div>
        </FindId>
    )
}
    
export default SuckFindId;