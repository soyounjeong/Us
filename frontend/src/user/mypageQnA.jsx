import React, { useState, useEffect } from "react";
import Header from "../UserComponents/header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
const MyPageQnAWrap = styled.div`
    * { text-decoration:none; }
    ul, li { list-style: none; padding:0; margin: 0;}
    input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }
    .container { max-width:100rem; margin: 0 auto; }
    .navBar { float: left; width: 12rem; padding: 5rem 3rem 3rem 2rem; }
    .menuLink { margin-bottom: 4rem; color: #555; cursor: pointer; font-size: 1.6rem; }
    .menuLink.on { font-weight: 600; color: #14c1c7; }
    .menuLink:hover { color:#14c1c7; font-weight: 600; }
    .content { padding: 4rem 3rem 5rem 10rem; overflow: hidden; border-left: 1px solid rgba(0,0,0,0.1); height: 79.5vh; }
    .profileItem { position: relative; align-items: center; margin-bottom: 2rem; margin-left: 0.5rem; }
    .profileItem select, .profileItem option { margin-right: 1rem; font-size: 1.4rem; width: 18rem; height: 4rem; padding: 0.5rem; border-color: rgba(0,0,0,0.2); border-radius: 3px; }
    .profileItem select:focus { border-color: rgba(0,0,0,0.1); outline: none; }
    .profileItem div { display: inline-block; }
    .profileItem h1 { font-size: 1.75rem; margin-bottom: 1rem; color: #444; }
    .section1 { width: 11rem; font-size: 1.45rem; font-weight: 600; vertical-align: top; }
    .section2 { width: 80%; font-size: 1.3rem; }
    .modifyImg { color: #1cbbeb; font-weight: bold; cursor: pointer; font-size: 1.5rem; margin-top: .5rem; }
    .profileImg img { width: 5rem; border-radius: 50%; vertical-align: middle; border: 2px solid #999; }
    .section2 input { border: 1px solid lightgray; background-color: #fff; border-radius: 3px; width: 90%; height: 4rem; font-size: 1.4rem; padding-left: 1rem; }
    .section2 textarea { border: 1px solid lightgray; background-color: #fff; border-radius: 3px; width: 90%; height: 16rem; font-size: 1.4rem; padding-left: 1rem; padding-top: 1rem; }
    .section2 h3 { font-size: 1.6rem; margin: 2rem 0 0 1rem; font-weight: 400; }
    .section2 p { font-size: 1.5rem;  margin: 0; position: relative; top:1.5rem; font-weight: bold; color: #555; }
    .widthraw { color: #1cbbeb; cursor: pointer; display: inline-block; font-size: 1.5rem; position:relative; left: 4rem; }
    .widthraw:hover { font-weight: 600; }
    .profileSelect { margin-left: 1.5rem; }
    .firstItem { margin-top: 4rem; }
    .profileFirst { margin-bottom: 3rem; }
    .proFirst { margin-bottom: 4rem; }
    .QnaTitle { margin-top: 0.5rem; color: #444; }
    .red { color: #14c1c7; font-size: 1.2rem; font-weight: bold; }
    #target { width: 81%; }
    .submitBtn { text-align: center; margin-top: 3rem; }
    .btn { width: 12rem; height: 4rem; font-size: 1.5rem; background: #14c1c7; border-radius: 7px; color: #fff; cursor: pointer; box-shadow: 3px 3px 3px #d0d0d0; }
    .popup { padding: 1.5rem 1rem 1rem; }
    .fa-search { font-size: 2.6rem; color: #14c1c7; cursor: pointer; }
    .fa-search:hover { font-size: 2.75rem; color: #14c1c7;  }
    // 모달창 css
    .mw { position:fixed; top:0; left:0; width:100%; height:100%; z-index: 1000; }
    .mw .bg { position:fixed; top:0; left:0; width:100%; height:100%; background:#000; opacity:.5; filter:alpha(opacity=50); }
    .mw .fg { position:absolute; top:50%; left:50%; width: 45rem; height: 52rem;  transform: translate(-50%, -50%); background:#fff; border-radius: 30px; }
    .closeBtn { position: absolute; cursor: pointer; font-size: 4rem; top: 1.5rem; right: 3rem; }
    .mw .fg .modalTitle { border: none; width: 14rem; margin: 2rem auto; font-size: 2rem; font-weight: bold;  }
    .fa-times { font-size: 3.5rem; }
    .nonData { font-size: 1.6rem; color: #777; margin: 3rem auto; }
    .searchName input[type="text"] { width: 25rem; margin-left: 1.5rem; border: none; border-bottom: 2px solid #9b9b9b; height: 3rem; font-size: 1.4rem;  }
    .searchName input[type="button"] { width: 6rem; padding: 1rem; margin-left: 1rem; font-size: 1.4rem; font-weight: bold; color: #14c1c7; cursor: pointer; border: none; box-shadow: 1.5px 1.5px 1.5px 2px #e7e7e7; } 
    .searchName { margin-left: 4rem; margin-top: 3rem; font-size: 1.5rem; font-weight: bold; color: #444; }
    .findForm { border: 1px solid #c7c7c7; width: 38rem; height: 28rem; margin-left: 3.6rem; margin-top: 2rem; overflow-y: auto; padding-bottom: 3rem; }
    .findForm p { display: flex; align-items: center; border: 1px solid #c7c7c7; height: 3rem; width: 85%; margin: 0rem auto 0.5rem; border-radius: 5px; padding: 1rem 1.5rem; }
    .email { color: gray; cursor: pointer; }
    .email:hover{ color: #14c1c7; }
    .fa-angry { font-size: 3rem;}
    .friendImg { width: 3rem; height: 3rem; border-radius: 50%; border: 1px solid lightgray; margin-right: 1rem; }
`;
const cookie = document.cookie.substring(6); // cookie값
const MyPageQnA = () =>{
    const[info, setInfo] = useState([]);

    // 문의 유형,제목,내용
    let [type, setType] = useState("계정관리");
    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');

    //팝업, 친구 목록, 이름 검색
    const [modalOn, setModalOn] = useState(false);
    const [changeFriend, setChangeFriend] = useState(0);
    let [friendsList, setFriendsList] = useState([]);
    let [friend, setFriend] = useState();

    //신고대상자 idx, name
    let [respondent, setRespondent] = useState();
    let [decFriend, setDecFriend] = useState();
    
    const selectType = (e) => { 
        setType(e.target.value);
        if(e.target.value!=='신고하기'){
            setRespondent()
            setDecFriend()
        }
    }
    const changeTitle = (e)=>{ setTitle(e.target.value); }
    const changeContent = (e)=>{ setContent(e.target.value); }

    // 검색 버튼 클릭 시
    const searchBtn = () =>{
        let decFriend = document.getElementById('decFriend').value
        setFriend(decFriend)
        if(changeFriend==0){setChangeFriend(1)}else{setChangeFriend(0)}
    }

    const onOpenModal = (e) => {
        if(changeFriend==0){setChangeFriend(1)}else{setChangeFriend(0)}
        setModalOn(!modalOn);
        //팝업 창 띄울 시 body 스크롤
        if(modalOn==false){
            document.body.style.overflow = "hidden";
        }else if(modalOn==true){
            document.body.style.overflow = "unset";
            setFriend()
        }
    }

    // 프로필정보 불러오기
    useEffect(async () => {
        const result = await axios.get(`http://localhost:3001/member/imgandname?idx=${cookie}`)
        setInfo(result.data[0])
    }, []);

    // 친구목록 불러오기
    useEffect(async () => {
        const list = await axios.get(`http://localhost:3001/inquiry/friend?idx=${cookie}&friend=${friend}`)
        setFriendsList(list.data)
    }, [changeFriend]);

    // 문의하기 axios 제출
    const goRegist = async () => {
        await axios({
            method: "post",
            url:`http://localhost:3001/inquiry`,
            data: {
                memberIdx: cookie,
                title: title,
                content: content,
                type: type,
                respondent : respondent
            }
        }).then((log)=>{
            if(log.data===true){
                alert('문의가 등록되었습니다.');
            }else{
                alert('등록에 실패하였습니다.')
            }
            window.location.reload();                
        });
    }
    const curr =(e)=>{ 
        const email = e.split('@');
        return email[0]
    }

    const saveDecIdx =(e)=>{
        const curr = e.target.id.split('@');
        setRespondent(curr[0])
        setDecFriend(curr[1])
        setModalOn(!modalOn);
    }

    // 신고대상 찾기 팝업
    const Modal = () => {
        return(
            <div id="mw_temp" className="mw">
                <div className="bg"></div>
                <div className="fg">
                    <div className="closeBtn" onClick={onOpenModal}><i class="fas fa-times"></i></div>
                    <p className="modalTitle">신고대상 찾기</p>
                    <div className="searchName"><i class="far fa-angry"></i><input type="text" placeholder="신고대상자명을 입력하세요" id="decFriend"/><input type="button" value="검색" onClick={searchBtn}/></div>
                    <div className="findForm">
                        {friendsList.length!==0?
                        friendsList.map(friendData=>(
                            <p><img src={friendData.img!==null?"/"+friendData.img:'/img/admin/noneImg.png'} className="friendImg" alt="친구리스트사진"/>{friendData.name} [ <span className="email" id={friendData.idx+'@'+friendData.name} onClick={saveDecIdx}>{curr(friendData.email)}</span> ]</p>
                        )):<></>
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Header/>
            <MyPageQnAWrap>
                <div className="container">
                    <div>
                        <ul className="navBar">
                            <Link to="/mypage"><li className="menuLink">프로필 편집</li></Link>
                            <Link to="/mypagePw"><li className="menuLink">비밀번호 변경</li></Link>
                            <Link to="/mypageQnAList"><li className="menuLink">문의내역</li></Link>
                            <Link to="/mypageQnA"><li className="menuLink on">문의하기</li></Link>
                        </ul>
                    </div>
                    <div className="content">
                        { type !== "신고하기" ? 
                            <ul className="profileList">
                                <li className="profileItem proFirst">
                                    <h1>신고/문의하기</h1>
                                </li>
                                <li className="profileItem">
                                    <div className="profileImg section1">
                                        <img src={info.img!==null?"/"+info.img:'/img/admin/noneImg.png'} alt="프로필사진"/>
                                    </div>
                                    <div className="profileNameBox section2">
                                        <p className="profileName">{info.name}</p>
                                    </div>
                                </li>
                                <li className="profileItem profileSelect firstItem">
                                    <div className="QnaTitle section1">문의유형</div>
                                    <select name="category1" id="category1" onClick={selectType}>
                                        <option value="계정관리">계정관리</option>
                                        <option value="이용안내">이용안내</option>
                                        <option value="신고하기">신고하기</option>
                                    </select>
                                </li>
                                <li className="profileItem profileSelect">
                                    <div className="QnaTitle section1">문의명</div>
                                    <div className="titleBox section2">
                                        <input type="text" name="title" id="title" placeholder="제목" onBlur={changeTitle}/>
                                    </div>
                                </li>
                                <li className="profileItem profileSelect">
                                    <div className="QnaContent section1">문의내용</div>
                                    <div className="contentBox section2">
                                        <textarea type="text" name="content" id="content" placeholder="내용" onBlur={changeContent}/>
                                    </div>
                                </li>
                            </ul>
                            :
                            <ul className="profileList">
                                <li className="profileItem profileFirst">
                                    <h1>신고/문의하기</h1>
                                    <span className="red">* 신고사실은 신고대상자가 알지 못합니다.</span>
                                </li>
                                <li className="profileItem">
                                    <div className="profileImg section1">
                                        <img src={info.img!==null?"/"+info.img:'/img/admin/noneImg.png'} alt="프로필사진"/>
                                    </div>
                                    <div className="profileNameBox section2">
                                        <p className="profileName">{info.name}</p>
                                    </div>
                                </li>
                                <li className="profileItem profileSelect firstItem">
                                    <div className="QnaTitle section1">문의유형</div>
                                    <select name="category1" id="category1" onClick={selectType}>
                                        <option value="계정관리">계정관리</option>
                                        <option value="이용안내">이용안내</option>
                                        <option value="신고하기">신고하기</option>
                                    </select>
                                </li><></>
                                <li className="profileItem profileSelect">
                                    <div className="QnaTitle section1">신고대상</div>
                                    <div className="titleBox section2">
                                        <input type="text" id="target" placeholder="신고대상" value={decFriend} readOnly/><span className="popup" onClick={onOpenModal}><i class="fas fa-search"></i></span>
                                        {modalOn? <Modal/>: ''}
                                    </div>
                                </li>
                                <li className="profileItem profileSelect">
                                    <div className="QnaTitle section1">신고유형</div>
                                    <div className="titleBox section2">
                                        <input type="text" placeholder="신고유형" onBlur={changeTitle}/>
                                    </div>
                                </li>
                                <li className="profileItem profileSelect">
                                    <div className="QnaContent section1">신고이유</div>
                                    <div className="contentBox section2">
                                        <textarea type="text" name="content" id="content" placeholder="신고하는 이유" onBlur={changeContent}/>
                                    </div>
                                </li>
                            </ul>
                        }
                        <div className="submitBtn">
                            <button type="submit" className="btn" onClick={goRegist}> 제출 </button>
                        </div>
                    </div>
                </div>
            </MyPageQnAWrap>
        </>
    );
}

export default MyPageQnA;