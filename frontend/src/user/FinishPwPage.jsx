import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Findidpw = styled.div`
    .body { width: 42rem; position: absolute; top:50%; left:50%; transform: translate(-50%, -50%); padding: 2rem; }
    .topNum { display: flex; justify-content: center; align-items: center; }
    .topNum img { width: 12rem; margin-bottom: 1rem; }
    .findtopnav { display: flex; justify-content: center; align-items: center; flex-direction: column; margin-top: 2rem; }
    .findtopnav p { font-size: 1.7rem; margin: 0 0 1rem; font-weight: bold; color: #777; }
    .findtopnav h2 { border-bottom: 2px black; }
    .finfind { text-align: center; margin-top: 3rem; }
    .finfind button { padding: 1.2rem 0;   font-size: 1.6rem;  font-weight: bold;  color: white;  width: 80%;  border-radius: 10px; border: none;  background: #14c1c7; cursor: pointer; }
`;

const FinFindidpw = () => {

    return (
        <Findidpw>
        <div className="body">
            <div className="topNum">
                <img src="/img/us_logo_forLogin.png"></img>
            </div>
            <div className="findtopnav">
                <p>임시 비밀번호를 전송하였습니다</p>
                <p>전송받은 임시 비밀번호로 로그인 해주세요</p>
            </div>
            <div className="finfind">
                <Link to="/"><button>로그인</button></Link>
            </div>
        </div>
        </Findidpw>
    )
}
    
export default FinFindidpw;