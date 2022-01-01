import React from "react";
import styled from "styled-components"; //css 사용할 때 import시켜줘야 함
import axios from 'axios';

const HeaderForm = styled.div`
    .header_container{border-bottom: 1px solid #8080803b; background-color: rgb(255, 255, 255); width: 100%; padding: 1rem 0; }
    .header_box{display: flex; align-items: center; max-width: 100rem; margin: 0 auto; justify-content: space-between;}
    .logo_img{vertical-align: middle; width: 5rem;}
    .logout_tag{width: 7rem; position: relative; top: 0.3rem; cursor: pointer;}
`;

const logout = () =>{
    axios.get('http://localhost:3001/member/logout')
    .then(res =>{
        alert("로그아웃 되었습니다.")
        window.location.href="/"
    })
}
const main = () =>{
    window.location.href=`http://localhost:3000/main?idx=${cookie}`
}
const cookie = document.cookie.substring(6); // cookie값
const Header = () =>{
    return (
        <HeaderForm>
            <div className="header_container">
                <div className="header_box">
                    <div className="logo_box">
                        <img className="logo_img" onClick={main} alt="logo" src="/img/us_logo.png"/>
                    </div>
                    <div className="logout_box">
                        <img className="logout_tag" onClick={logout} alt="logout" src="/img/logout_img.png"/>
                    </div>
                </div>
            </div>
        </HeaderForm>
    );
} 

export default Header;