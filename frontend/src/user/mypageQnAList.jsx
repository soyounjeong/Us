import React, { useState, useEffect } from "react";
import Header from "../UserComponents/header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import '../../src/admin.css';
const MyPageQnAListWrap = styled.div`
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
    table { margin-top: 4rem; text-align: center; width: 100%; border-collapse: collapse; border: 2px solid #9b9b9b; font-size: 1.4rem; }
    table th, table td { border: 1px solid #9b9b9b; height: 3.8rem; }
    table th { background-color: rgb(248, 250, 252); }
    .detail-link { color: black; }
    .detail-link:hover { color: #14c1c7; font-weight: bolder; font-size: 1.45rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
`;
const cookie = document.cookie.substring(6); // cookie값
const MyPageQnAList = () =>{
    
    const[info, setInfo] = useState([]);

    // axios 뿌리기
    const [listAxios, setAxios] = useState(0); // list-useEffect axios의 값 존재 여부 저장
    let [question, setQuestion] = useState([]);
    let [pageNum, setPageNum] = useState(1);
    let [change, setChange] = useState(1);

    let pages = [];

    const Pagination = (page) =>{ 
        setPageNum(page)
        if(change == 1){ setChange(0) }else{ setChange(1) } } // useEffect 재실행을 위해 change값을 변경

    const PaginationNum = (e) =>{
        let pageNum = e.target.id
        Pagination(pageNum)
    }

    const PaginationArr = (e) =>{
        let pageArr = e.target.value
        Pagination(pageArr)
    }

    const curr = (e)=>{
        const cntCurr = e.split(' ')
        return cntCurr[0]
    }

    useEffect(async () => {
        const question = await axios.get("http://localhost:3001/member/inquirylist?page=" + pageNum + "&idx=" + cookie)
        setQuestion(question.data)
        let paginationClass = document.querySelectorAll('.paginationClass');
        if(question.data.totalPage!==0){
            for(let i=0; i<paginationClass.length; i++) {
                if(paginationClass.length !== 0){
                    paginationClass[i].style.color = "#888";
                }
            }
            let current = document.getElementById(pageNum);
            current.style.color = "#14c1c7";
        }
        if(question.data.result.length !== 0){ setAxios(1) } // axios의 값 존재 여부 저장
    }, [change]);

    for(let i = question.startPage; i <= question.endPage; i++) { pages[i] = i }

    // 프로필정보 불러오기
    useEffect(async () => {
        const result = await axios.get(`http://localhost:3001/member/imgandname?idx=${cookie}`)
        setInfo(result.data[0])
    }, []);

    return (
        <>
            <Header/>
            <MyPageQnAListWrap>
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
                        <h1>신고/문의내역</h1>
                        <div className="profile">
                            <div className="profileImg">
                                <img src={info.img!==null?"/"+info.img:'/img/admin/noneImg.png'} alt="프로필사진"/>
                            </div>
                            <p className="profileName">{info.name}</p>
                        </div>
                        
                        <table align="center">
                            <tr>
                                <th width="12%">처리</th>
                                <th width="18%">문의유형</th>
                                <th width="50%">문의제목</th>
                                <th width="20%">작성일</th>
                            </tr>
                            {listAxios !== 0 ?
                            question.result.map(rowData => (
                            <tr>
                                <td>{rowData.message===null?'미처리':'처리'}</td>
                                <td>{rowData.type}</td>
                                <td><Link to={"/myQnaDetail/" + rowData.idx} className="detail-link">{rowData.title}</Link></td>
                                <td>{curr(rowData.cnt)}</td>
                            </tr>
                            )):<tr className="nonData"><td colSpan="5">작성된 문의사항이 없습니다</td></tr> // member의 데이터가 없으면 나타냄
                            }
                        </table>
                        <div className="pagination">
                            <ul className="pageNation">
                            { question.startPage !== 1 ?
                                <>
                                <li onClick={PaginationArr} value="1">《</li>
                                <li onClick={PaginationArr} value={question.startPage-1}>〈</li>
                                </>
                                : <></> // startPage가 1이면 나타냄
                            }
                            { question.totalPage !== 0 ?
                                pages.map(rowData => (
                                    question.startPage+5 > rowData ?
                                    <li onClick={PaginationNum} class="paginationClass" id={rowData}>{rowData}</li>
                                    : <></>
                                )) : <></> // pages가 없으면 나타냄
                            }
                            { question.endPage !== question.totalPage && question.endPage < question.totalPage ?
                                <>
                                <li onClick={PaginationArr} value={question.endPage+1}>〉</li>
                                <li onClick={PaginationArr} value={question.totalPage}>》</li>
                                </> : <></>
                            }
                            </ul>
                        </div>
                    </div>
                </div>
            </MyPageQnAListWrap>
        </>
    );
}

export default MyPageQnAList;