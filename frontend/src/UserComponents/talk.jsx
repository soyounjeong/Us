import React, {useEffect, useRef, useState} from "react";
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';

const TalkWrap = styled.div`
    z-index: 100; 
    position:fixed; 
    left:0; 
    top:0; 
    width:100%; 
    height:100%; 
    background:rgba(0,0,0,0.3);

    input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }
    .talkBox { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #aee7e2; border:1px solid rgba(0,0,0,0.3s); width: 55rem; border: 3px solid #cccccc; }
    .talkHeader { display: flex; align-items: center; padding: 2rem; background-color: rgb(0 0 0 / 8%); height: 5rem;  }
    .recieverName { align-items: center; margin-left: 2rem; font-size: 1.75rem; font-weight: 800; color: rgba(54,54,54); }
    .talkToggle{ margin-left: auto; margin-right: 1rem; position: relative; }
    .talkToggle > img { width: 3rem; height: 2.7rem; cursor: pointer; }
    .talkExitPop { position: absolute; width: max-content; top: 5rem; background-color: #fff; padding: .7rem 2.5rem; border:1px solid rgb(0 0 0 / 8%); cursor: pointer; display: none; }
    .talkExitPop:hover { background-color: rgb(236, 236, 236);}
    .talkProfileImg { width: 5.5rem; cursor: pointer; }
    .talkList { overflow-y: scroll; padding: 2rem; padding-bottom: 0; height: 38rem; }
    .reciverTalk { display: flex; align-items: flex-start; margin-bottom: 2rem; }
    .talkContents .talkProfileImg { width: 6.5rem; }
    .talkDetailWrap { margin-left: 1rem; max-width: 50%; margin-top: 1rem; }
    .talkProfileName { margin-bottom: .5rem; font-weight: 600; }
    .talkDetailList { margin-left: .5rem; background-color: #fff; padding: .7rem; border-radius: .5rem; word-break : break-all; line-height: 2.5rem; box-shadow: 2px 2px 2px #c2c2c2; }
    .senderTalk { display: flex; flex-direction: row-reverse; margin-bottom: 1rem; margin-right: 1rem; }
    .talkSendWrap{ padding: 2rem; position: relative; background-color: #fff; }
    .talkTextInput { height: 7rem; width: 80%; font-family: "Nanum Gothic", sans-serif; box-shadow: 2px 2px 2px 2px #e7e6e6; border-radius: 5px; padding: 1rem;  }
    .talkSendBtn { display: inline-block; position: absolute; top: 2.1rem; right: 2rem; background-color: rgb(204, 204, 204); color: #fff; padding: 1rem; border: 1px solid rgb(0 0 0 / 10%); border-radius: 5px; cursor: pointer; width: 6.5rem; height: 9rem; }
    .talkSendBtn:hover { box-shadow: rgb(0 0 0 / 20%) 2px 2px 2px; color: white; background-color: #14c1c7; }
    .talkSendBtn.active { color: #333; }
`;

let socket;

const Talk = ({current, loginIdx})=>{
    const [img, setImg] = useState('');
    const [name, setName] = useState('');
    const [idx, setIdx] = useState('');
    const [memberIdx, setMemberIdx] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [addOn, setAddOn] = useState(true);

    const ENDPORT = 'localhost:3001';
    
    const searchElement = useRef(null); // DOM 요소를 searchElement에 할당
    
    useEffect(() => {
        console.log('current뽑기',current);
        // current 에서 받은 데이터 저장
        const {img, name, idx, memberIdx, title} = current;
        if(img==null || img==''){
            setImg('img/blank_profile.png');
        } else setImg(img);
        setName(name);
        setIdx(idx);
        setMemberIdx(memberIdx);
        setTitle(title);

        // soket.io
        socket = io(ENDPORT);
        console.log(socket);
        socket.on('connection', function(){
            console.log('웹소켓 서버에 연결되었습니다.');
            
        });
        socket.emit('joinRoom', idx);   // {idx:idx, name:name}
        console.log(`${title} 방 입장`)

         // textarea focus 할당
        if (searchElement.current) { // 할당한 DOM 요소가 불러지면 (마운트 되면)
            searchElement.current.focus(); // textarea에 focus 할당!
        }
        console.log('로그인Idx',loginIdx);
    }, [current]);

    // 백에서 받아온 messase 처리
    useEffect(()=>{
        socket.on('send', function(msg){
            console.log('backend',JSON.stringify(msg));
            setMessages([...messages, msg]);
        })
    }, [messages]);

    // sendBtn 클릭
    const sendMsg = (event)=>{
        event.preventDefault();
        const data = document.querySelector('.talkTextInput').value;
        if(data!==''){
            const output = {idx:idx, memberIdx: loginIdx, sender:name, commend:'chat', type:'text', data:data, roomName : title};
            if(socket == undefined){
                alert('서버에 연결되지 않았습니다. 서버를 연결하세요');
                return;
            }
            socket.emit('message', output);
            if (searchElement.current) { // 할당한 DOM 요소가 불러지면 (마운트 되면)
                searchElement.current.value='';
                searchElement.current.focus();
            }
        }
    }

    const closePop = () => {
        setAddOn(false);
        document.body.style.overflowY = "unset";
    }

    return(
        <>
        {addOn ? (
            <TalkWrap>
            <div className="talkBox">
                <div className='talkHeader'>
                    <div className='talkProfileImgWrap'>
                        <img className='talkProfileImg' src={img} alt='프로필 사진'/>
                    </div>
                    <h2 className='recieverName'>{name}</h2>
                    <div className='talkToggle'>
                        {/* <img src='img/talk_toggle.svg' alt='메뉴'></img> */}
                        <img src='img/close_icon.svg' alt='나가기' onClick={closePop}></img>
                        <div className='talkExitPop'>채팅방 나가기</div>
                    </div>
                </div>
                <div className='talkContents'>
                    <div className='talkList'>
                        <ScrollToBottom>
                            {messages.map((message, i)=>{
                                let isSentByCurrentUser = false;
                                console.log(message);
                                if(message.memberIdx === loginIdx){
                                    isSentByCurrentUser = true;
                                }
                                return (
                                    isSentByCurrentUser ? (
                                    <div className='senderTalk'>
                                        <div className='talkDetailWrap'>
                                            <div className='talkDetailList'>{message.data}</div>
                                        </div>
                                    </div>
                                    )
                                    : (
                                        <div className='reciverTalk'>
                                            <div className='talkProfileImgWrap'>
                                                <img className='talkProfileImg' src={img} alt='프로필 사진'></img>
                                            </div>
                                            <div className='talkDetailWrap'>
                                                <div className='talkProfileName'>{name}</div>
                                                <div className='talkDetailList'>{message.data}</div>
                                            </div>
                                        </div>
                                    )
                                )
                            })}
                        </ScrollToBottom>
                    </div>
                    <div className='talkSendWrap'>
                        <textarea ref={searchElement} className='talkTextInput' onKeyPress={event => event.key === 'Enter' ? sendMsg(event) : null}></textarea>
                        <button className='talkSendBtn' onClick={sendMsg}>전송</button>
                    </div>
                </div>
            </div>
        </TalkWrap>
        ) : null}
        </>
    )
}

export default Talk;