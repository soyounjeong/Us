import React, { useState, useEffect } from "react";
import Header from "../UserComponents/header";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import '../../src/admin.css';
const MyQnaDetailWrap = styled.div`
    * { text-decoration:none; }
    ul, li { list-style: none; padding:0; margin: 0;}
    .pageNation { list-style:none; display: flex; }
    .pageNation li { padding: 0.6rem; font-size: 1.8rem; background-color: none; color: #888; cursor: pointer; font-weight: bold; }
    input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }
    .container { max-width:100rem; margin: 0 auto; }
    .navBar { float: left; width: 12rem; padding: 5rem 3rem 3rem 2rem; }
    .menuLink { margin-bottom: 4rem; color: #555; cursor: pointer; font-size: 1.6rem; }
    .menuLink.on { font-weight: 600; color: #14c1c7; }
    .menuLink:hover { color:#14c1c7; font-weight: 600; }
    .content { padding: 4rem 3rem 5rem 10.5rem; overflow: hidden; border-left: 1px solid rgba(0,0,0,0.1); height: 79.5vh; }
    h1 { font-size: 1.75rem; color: #444; margin-bottom: 4rem; }
    .profile{ display:flex; }
    .profileImg{ width: 11rem; }
    .profileImg img{ width: 5rem; border-radius: 50%; vertical-align: middle; border: 2px solid #999; }
    .profileName{ font-size: 1.5rem; margin: 0; position: relative; top: 1.5rem; font-weight: bold; color: #555; }
    table{width: 100%;}
    .content-box { height: 37rem; border-radius: 10px; padding-top: 2rem; }
    .content2 { border-radius: 10px; font-size: 1.4rem; text-align: left; width: calc(100% - 4rem); margin: 0 auto; border-bottom: 2px solid rgb(215, 215, 215); box-shadow: 3px 3px 3px 4px rgb(240, 240, 240); padding: 2.3rem 3rem; }
    .content2 table th { width: 10rem; padding: 1.4rem 0; }
    .content2 table td { width: calc(100% - 10rem); }
    .content2 table td span { color: #14c1c7; font-weight: bold; }
    .content2 .qnaContent td{ width: calc(100% - 10rem); overflow-wrap: anywhere; border: 1px solid lightgray; padding: 1rem; border-radius: 8px; }
    input[type="button"] { background-color: #14c1c7; border: 1px solid white; color: white; width: 9rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210);  margin-left: 2rem; font-size: 1.3rem; cursor: pointer; }
    .button-box { text-align: center; margin-top: 3rem; }
`;
const cookie = document.cookie.substring(6); // cookie값
const MyQnaDetail = () =>{

    const idx = useParams();
    const[detail, setDetail] = useState({qnaInfo:[0], qnaDec:[0]});
    
    useEffect(async () => {
        const questionDetail = await axios.get(`http://localhost:3001/member/inquirydetail?idx=${idx.idx}`)
        if(`${questionDetail.data[0][0].idx}`!==cookie){
            window.location.href=`http://localhost:3000/mypageQnAList`
        }else{
            setDetail({qnaInfo:questionDetail.data[0][0], qnaDec:questionDetail.data[1][0]})
        }
    }, []);

    const curr =(e)=>{ 
        const email = e.split('@');
        return email[0]
    }
    console.log(detail)

    return (
        <>
            <Header/>
            <MyQnaDetailWrap>
                <div className="container">
                    <div>
                        <ul className="navBar">
                            <Link to="/mypage"><li className="menuLink">프로필 편집</li></Link>
                            <Link to="/mypagePw"><li className="menuLink">비밀번호 변경</li></Link>
                            <Link to="/mypageQnAList"><li className="menuLink on">문의내역</li></Link>
                            <Link to="/mypageQnA"><li className="menuLink">문의하기</li></Link>
                        </ul>
                    </div>
                    <div className="content">
                        <h1>신고/문의 상세내역</h1>
                        <div className="profile">
                            <div className="profileImg">
                                <img src={detail.qnaInfo.img!==null?"/"+detail.qnaInfo.img:'/img/admin/noneImg.png'} alt="프로필사진"/>
                            </div>
                            <p className="profileName">{detail.qnaInfo.name}</p>
                        </div>
                        <div className="content-box">
                            <div className="content2">
                                <table>
                                    <tr>
                                        <th>작성일자</th>
                                        <td>{detail.qnaInfo.createdAt}</td>
                                        <th>답변여부</th>
                                        <td>{detail.qnaInfo.message === null ?'X 미처리':'O 처리'}</td>
                                    </tr>
                                    <tr>
                                        <th>문의유형</th>
                                        <td>{detail.qnaInfo.type}</td>
                                    </tr>
                                    {detail.qnaInfo.type === "신고하기" ?
                                    <tr>
                                        <th>신고대상자</th>
                                        <td>{detail.qnaDec.name} [<span> {curr(detail.qnaDec.email)} </span>]</td>
                                    </tr> : <></>
                                    }
                                    <tr>
                                        <th>문의내용</th>
                                    </tr>
                                    <tr className="qnaContent">
                                        <td colSpan="4">{detail.qnaInfo.content}</td>
                                    </tr>
                                    <tr>
                                        <th>답변</th>
                                    </tr>
                                    <tr className="qnaContent">
                                        <td colSpan="4">{detail.qnaInfo.message===null?'등록된 답변이 없습니다':detail.qnaInfo.message}</td>
                                    </tr>
                                </table>
                                <p className="button-box">
                                    <Link to="/mypageQnAList"><input type="button" value="뒤로가기"/></Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </MyQnaDetailWrap>
        </>
    );
}

export default MyQnaDetail;