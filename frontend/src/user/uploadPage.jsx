import React, { useState, useRef, useEffect } from "react";
import Header from "../UserComponents/header";
import ReplyLike from "../UserComponents/replyLike";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const UploadForm = styled.div`
    overflow-y: auto; position: fixed; top: 0; left: 0; width: 100%; height: calc(100% - 5.3rem); margin-top: 5.3rem; 
    @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
    .upload_container{max-width: 100rem; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
    .upload_profile_img {width: 5rem; height: 5rem; border-radius: 50%; border: 2px solid #999; margin-left: 1.3rem; }
    .upload_profile_box {display:flex; justify-content: space-between;}
    .upload_profile_id{font-size: 1.9rem; margin-left:1rem;}
    .upload_left_box{ width: 47rem; padding: 0 0.5rem; }
    .upload_right_box{ width: 42rem; padding: 0 0.5rem; }
    .upload_header_box{padding: 1rem 0; border-bottom: 2px solid #e4e4e4;}
    .images_list{width: 100%; height:47rem; }
    .cats_img{width: 13rem; height: 3.7rem; position: absolute; top: 0.3rem; right: 4rem;}
    .wr_post_container{display: flex; margin-top:1rem; height: 13rem; overflow-wrap: anywhere; overflow-y: auto; border: 2px solid #00000045; font-size: 1.4rem; padding: 1rem; border-radius: 6px;}
    .return_main_btn{border-radius: 5px; background-color: #14c1c7; color: white; border: none; height: 4rem; cursor: pointer; width:17rem; font-size:1.4rem; box-shadow:3px 3px 3px #9b9b9b9e;}
    .option_pop_container{position:relative;}
    .option_pop_box{position:absolute; top: -3px; right: -82px;}
    .wr_post_area{padding: 0 0 0 1rem; color: #555; height: fit-content; }
    .wr_post_writer{font-weight:bold; color: #14c1c7;margin-right:1rem;}
    .up_replay_box{ height: calc(100% - 4px); border: 2px solid #00000045; border-radius: 5px;}
    .left_right_container{display:flex;justify-content: space-between;}
    .up_reply_minibox {overflow-y: auto; height: 45rem; padding: 1rem; overflow-y:  }
    .upload_time { font-size: 1.3rem; margin-left: 1rem; color: #555; }
    .up_img { width: 100%; height: 100%; border-radius: 12px; }
    .post_images_box{ position: relative; }
    .img_pagnation{position: absolute; top: 19rem; display:flex; justify-content: space-between; width: 100%; }
    .prev_arr{ width: 8rem; cursor: pointer;}
    .reply1_box{display:flex; margin: 1.3rem 1rem 1rem 1rem;}
    .re_profile_img{width: 3rem; height: 3rem; border-radius: 50%; border: 2px solid #00000054;}
    .re_reply{font-size: 1.4rem; margin:0.5rem; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;}
    .re_time{font-size: 0.7rem; margin-left:0.5rem; color: gray;}
    .reply2_box{display:flex; margin: 1rem 1rem 1rem 4.7rem;}
    .reply3_box{display:flex; margin: 1rem 1rem 1rem 8.3rem;}
    .input_reply_box { display: flex; border-top: 2px solid #e4e4e4; width: 100%; }
    .re_btn{background-color: #14c1c7; color: white; border:none; height:7rem; width:6rem; font-weight:600; font-size:1.32rem; border-radius: 5px; cursor: pointer; box-shadow: 2px 2px 2px 2px #e0dfdf; }
    .input_reply_container{ height: 4rem; position: relative; }
    .reply_to_wrap{ position: absolute; bottom: 4.5rem; left: 0.6rem; }
    .like_img{width:2rem; height:2rem;}
    .like_box{display:flex; margin-left: auto;}
    .in_input{outline: none; width:32rem; height:6rem; border: 1px solid #afadadb0; border-radius:10px; box-shadow: 2px 2px 2px #e0dfdf;
        font-size: 1.3rem; padding: 0.5rem 1rem; font-family: 'Nanum Gothic', sans-serif; overflow-y: auto; resize: none; }
    .re_time_reply_box{display:flex;}
    .reply_btn{border:none; background:none; color:gray; font-size:0.5rem; cursor:pointer; margin:0; line-height:0.1rem; font-weight:600;}
    .re_delete_btn{background: none; border: none;}
    .like_delete_box{display:flex;}
    .re_delete_btn{padding:0;font-size: 0.5rem; line-height: 0.1rem; color: gray; margin: 0; font-weight:600;}
    .re_profile{ display:flex; align-items: center;}
    .in_input_box{margin:0.5rem;}
    .like_btn{background:none; border:none; display:flex; align-items:center; font-size:1.8rem;}
    .re_id_box{display:flex; width: 23rem}
    .re_id_div{margin:1rem 0 0 0.5rem;}
    .re_id_span{font-size: 1.5rem; font-weight: 600; line-height: 1rem;}
    .re_btn_box { margin: 0.5rem 0; }
    .header_btn, .up_pro_time_container{ display: flex; align-items:center; margin-right: 0.5rem; }
    .upd_btn, .del_btn, .main_btn{ cursor: pointer; font-size: 1.2rem; margin-right: 0.5rem; background-color: #14c1c7; padding: 0.5rem 1.2rem; color: white; border: none; font-weight: 600;border-radius: 5px;}
`;

const EditPopWrap = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Courgette&family=Noto+Sans+KR:wght@300&display=swap');
    z-index: 100; position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3);
    textarea { border: 1px solid lightgray; font-size: 1.4rem; background-color: #fff; border-radius: 3px; width: calc(100% - 2rem); height: 15rem; color: #222; padding: 1rem; overflow-y: auto; font-family: 'Noto Sans KR', sans-serif; resize: none; }
    textarea:focus { outline:none; }
    .popContainer { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #fff; border:1px solid rgba(0,0,0,0.3s); border-radius: 20px; width: 55rem; height: auto; }
    .popHeader { padding: 2rem 5rem 2rem; text-align: center; }
    .closeIcon { position: absolute; top: 1.5rem; right: 1.5rem; cursor: pointer; }
    .title { font-size: 2rem; font-weight: 700; }
    .popContent{ padding: 0 3.3rem; }
    button { border: 0; outline: none; appearance: none; cursor:pointer; vertical-align: center; padding: 1rem 1.8rem; font-size: 1.6rem; border-radius: 12px; background-color: #14c1c7; color: #fff; }
    button:nth-child(2) { margin-left: 1rem; }
    .btnWrap { text-align: center; padding: 1rem 0 1.5rem; }
    // 게시물 업로드 팝업1(업로드할 이미지) css
    .post1_pop_container{z-index: 100; position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.5);}
    .post1_pop_box{ position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background:white; border:none; width: 60rem; height: 56rem; border-radius: 15px; padding: 1rem; }
    .post1_pop_sec1{ display:flex; justify-content: space-between; margin-top:1rem; }
    .pop3_close_btn{ background:none; border:none; }
    .ch_upload_img{ font-size:2.3rem; margin: 0 0 0 20rem; font-weight:600; }
    .post1_pop_sec2_box { margin-top:3rem; }
    #files { display:none; }
    .prev_img { background-color: #efefef; width:14rem; height:14rem; margin:1rem; }
    .prev_img img { width: 100%; height: 100%; }
    .prev_img_be { background-color: #efefef; width:14rem; height:14rem; margin:1rem; }
    .prev_upload { display:flex; flex-wrap:wrap; min-height:32rem; }
    .prev_upload_be { display:flex; flex-wrap:wrap; min-height:15rem; }
    #upload { cursor:pointer; }
    #upload p { display: inline-block; margin-left: .5rem; position: relative; }
    .file_aa { display:flex; align-items: center; }
    .prev_upload_box { border: 1px solid lightgray; }
    .upload_txt_box { margin: 0.8rem 1rem; }
    .upload_img_ch { border:none; background-color:#3bf1f1; color:white; width:9rem; height:3.5rem; cursor:pointer; border-radius:5px; cursor:pointer;}
    .post1_pop_sec3 { margin-top:1.3rem; }
    .post1_pop_sec3_box { display: flex; justify-content: center; }
    .img_del { background:none; border:none; position:absolute; top: 1.2rem; right: 1.5rem; font-size: 2rem;}
    .prev_upload span { position:relative; }
    .fa-times-circle { color:#3bf1f1; }
`;

const DelPopWrap = styled.div` 
    z-index: 100; position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3);
    .popContainer { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #fff; border:1px solid rgba(0,0,0,0.3s); border-radius: 20px; width: 35rem; height: auto; }
    .popHeader { padding-top: 3rem; text-align: center; }
    .title img {width:5.5rem}
    .textWrap { font-size: 1.7rem; text-align: center; padding: 3rem 0; }
    button { border: 0; outline: none; appearance: none; cursor:pointer; vertical-align: center; padding: 1rem 2rem; font-size: 1.4rem; border-radius: 12px; background-color: #14c1c7; color: #fff; margin: 0 0.4rem; font-weight: bold;}
    .btnWrap { text-align: center; padding: 0.5rem 0 3rem; }
`;
let img = 0;
const cookie = document.cookie.substring(6); // cookie값
const UploadPage = () => {

    const id = useParams(); // 받아온 id값 저장
    const [email, setEmail] = useState('');
    let [detail, setDetail] = useState({postInfo:[0], postImg:[0], postReply:[0]});
    let [detailImg, setDetailImg] = useState(0)
    let [scrollImg, setScrollImg ] = useState(''); // imgName 저장

    // 대댓글 댓글idx, 그룹idx
    const [reReIdx, setReReIdx] = useState(null);
    const [reReGroupIdx, setReReGroupIdx] = useState(null);
    const [reReName, setReReName] = useState(null);
    // 내용 업데이트 상태
    const [isUpdate, setIsUpdate] = useState(0);
    // 댓글 입력 textarea
    const replyValue = useRef();
    // 게시물 수정 textarea
    const editContent = useRef();
    // 게시물 수정 파일저장
    const [imgFile, setImgFile] = useState(null);

    useEffect(async () => { // detail-useEffect
        const info = await axios.get("http://localhost:3001/post/detail?postIdx="+id.idx)
        setDetail({postInfo:info.data[0][0], postImg:info.data[1], postReply:info.data[2]})
        const curr = info.data[0][0].email.split('@');
        setEmail(curr[0])
        if(detailImg===0){setDetailImg(1)}else{setDetailImg(0)} // scrollImg-useEffect 재실행을 위해 detailImg 값 변경
    }, [isUpdate]);
    console.log(detail)
    useEffect(async () => { // scrollImg-useEffect
        if(detail.postImg.length!==0){setScrollImg(detail.postImg[0].imgName)}
    }, [detailImg]);

    const date = (e) =>{
        const today = new Date();
        const timeValue = new Date(e);
        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) { return `${betweenTime}분전`; }
        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) { return `${betweenTimeHour}시간전`; }
        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) { return `${betweenTimeDay}일전`; }
        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }

    // 이미지 버튼
    const next = () => {
        img = detail.postImg.length-1 === img ? img : img+1;
        setScrollImg(detail.postImg[img].imgName)
    }
    const prev = () => {
        img = img === 0 ? 0 : img-1;
        setScrollImg(detail.postImg[img].imgName)
    }

    // 게시물 수정 팝업열기
    const[postEditOn, setPostEditOn] = React.useState(false);
    const openEditOn = () =>{
        setPostEditOn(!postEditOn);
        if(postEditOn){
            document.body.style.overflowY = "unset";
        } else {
            document.body.style.overflowY = "hidden";
        }
    }

    //게시물 삭제 팝업열기
    const[PostDelOn, setPostDelOn] = React.useState(false);
    const openPostDel = () =>{
        setPostDelOn(!PostDelOn);
        if(PostDelOn){
            document.body.style.overflowY = "unset";
        } else {
            document.body.style.overflowY = "hidden";
        }
    }

    // 게시물 수정 실행
    const editSubmit = async () => {
        const content = editContent.current.value;
        let formData = new FormData();
        console.log(id.idx)
        console.log(content)
        if(imgFile!==null){   // 수정할 사진을 등록했을 경우
            for (const key of Object.keys(imgFile)) {
                formData.append('fileupload', imgFile[key]);
            }
        }
            formData.append('idx', id.idx);
            formData.append('content', content);
            formData.append('hashTag', '');
            return await axios.post(`http://localhost:3001/post/edit`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).then((res)=>{
                alert('게시물이 수정되었습니다.');
                setPostEditOn(!postEditOn);
                document.body.style.overflowY = "unset";
                if(isUpdate===0){setIsUpdate(1)}else{setIsUpdate(0)}
            });
    }

    // 게시물 삭제하기 실행
    const delSubmit = async () => {
        await axios.get('http://localhost:3001/post/delete?idx='+id.idx)
        .then(function (response) {
            alert('삭제되었습니다.');
            window.location.href = '/main?idx=' + cookie;
        })
        .catch(function (error) {
            alert('재시도해주세요');
            console.log(error);
        })
        .then(function () {
        });
    }

    // 댓글 등록 실행
    const submitReply = async () =>{
        const content = replyValue.current.value;
        await axios({
            method: "post",
            url:`http://localhost:3001/reply/insert_reply`,
            data: {
                idx: reReIdx,
                groupIdx: reReGroupIdx,
                postIdx: id.idx,
                content: content,
                memberIdx: cookie,
                parentIdx: reReIdx
            }
        }).then(function (response) {
            console.log(response)
            alert('등록되었습니다.');
            window.location.reload();
        })
        .catch(function (error) {
            alert('등록실패했습니다.');
            console.log(error);
        })
        .then(function () {
        });
    }

    // 댓글 삭제 실행
    const delReply = (replyIdx)=>{
        axios.get('http://localhost:3001/reply/delete_reply?idx='+replyIdx)
        .then(function (response) {
            alert('삭제되었습니다.');
            if(isUpdate===0){setIsUpdate(1)}else{setIsUpdate(0)}
        })
        .catch(function (error) {
            alert('재시도해주세요');
            console.log(error);
        })
        .then(function () {
        });
    }

    // 게시물 수정 팝업 DOM
    const EditPop = ()=>{
        return (
            <EditPopWrap>
                <div className="popContainer">
                    <div className="popHeader">
                        <div className="title">게시글 수정</div>
                    </div>
                    <div className="popContent">
                        <div className="post1_pop_sec2">
                            <div className="prev_upload_box">
                                <div className="prev_upload">
                                    {detail.postImg!==null?
                                        detail.postImg.map(rowData=>(
                                            <span>
                                            <div className="prev_img">
                                                <img src={"/uploads/"+rowData.imgName} alt="게시물사진"/>
                                                <br/><div className="img_del"><i className="fas fa-times-circle"></i></div>
                                            </div>
                                        </span>
                                        )):<></>
                                    }
                                </div>
                            </div>
                            <div className="filebox">
                                <div className="file_aa">
                                    <div className="file_label">
                                        <label id="upload" htmlFor="files">
                                            <p>여기를 눌러 수정 사진을 넣으세요.</p>
                                        </label>
                                    </div>
                                </div>
                                <input type="file" id="files" multiple accept="image/png" onChange={handleFileSelect}/>
                            </div>
                        </div>
                        <div className="textWrap">
                            <textarea name="content" id="content" ref={editContent}>{detail.postInfo.content}</textarea>
                        </div>
                    </div>
                    <div className="btnWrap">
                        <button type="submit" onClick={editSubmit}>수정</button>
                        <button onClick={openEditOn}>취소</button>
                    </div>
                </div>
            </EditPopWrap>
        )
    }

     // 게시물 삭제 팝업 DOM
    const DelPop = ()=>{
        return (
            <DelPopWrap>
                <div className="popContainer">
                    <div className="popHeader">
                        <div className="title"><img src="/img/us_logo.png" alt="로고" /></div>
                    </div>
                    <div className="popContent">
                        <div className="textWrap">게시물을 삭제하시겠습니까?</div>
                    </div>
                    <div className="btnWrap">
                        <button type="submit" onClick={delSubmit}>네, 삭제할래요</button>
                        <button onClick={openPostDel}>아니요</button>
                    </div>
                </div>
            </DelPopWrap>
        )
    }

    // 전체 DOM
    return (
        <>
            <Header/>
            <UploadForm>
                {postEditOn ? <EditPop/> : ""}
                {PostDelOn ? <DelPop/> : ""}
                <div className="upload_container">
                    <div className="left_right_container">
                        <div className="upload_left_box">
                            <div className="post_images_box">
                                <div className="images_list">
                                    <img className="up_img" src={"/uploads/"+scrollImg} alt="게시물 사진"/>
                                </div>
                                <div className="img_pagnation">
                                    <div className="prev_box">
                                        <img className="prev_arr" style={img===0?{opacity: '0'}:{opacity: '1'}} onClick={prev} src="/img/arr-left-circle.svg" alt="이전"/>
                                    </div>
                                    <div className="next_box">
                                        <img className="prev_arr" style={img===detail.postImg.length-1?{opacity: '0'}:{opacity: '1'}} onClick={next} src="/img/arr-right-circle.svg" alt="다음"/>
                                    </div>
                                </div>
                            </div>
                            <div className="wr_post_container">
                                <div className="wr_post_area"><span className="wr_post_writer">{email}</span>{detail.postInfo.content}</div>
                            </div>
                        </div>
                        <div className="upload_right_box">
                            <div className="up_replay_box">
                                <div className="upload_header_box">
                                    <div className="upload_profile_box">
                                        <div className="up_pro_time_container">
                                            <img className="upload_profile_img" src={detail.postInfo.img !== null? '/'+detail.postInfo.img : '/img/admin/noneImg.png'}/>
                                            <div>
                                                <div className="upload_profile_id">
                                                    <span>{email}</span>
                                                </div>
                                                <div className="upload_time">
                                                    <span>{date(detail.postInfo.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="header_btn">
                                            <Link to={"/main?idx="+cookie}>
                                                <button type="button" className="main_btn">메인</button>
                                            </Link>
                                            <button type="button" className="upd_btn" onClick={openEditOn}>수정</button>
                                            <button type="button" className="del_btn" onClick={openPostDel}>삭제</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="up_reply_minibox">
                                {detail.postReply.length!==0?
                                    detail.postReply.map((ReplyData, index) => (
                                        <div className={ReplyData.depth===0?"reply1_box":ReplyData.depth===1?"reply2_box":"reply3_box"}>
                                            <div className="re_profile">
                                                <img className="re_profile_img" src={ReplyData.img !== null? '/'+ReplyData.img : '/img/admin/noneImg.png'} alt="댓글 프로필"/>
                                            </div>
                                            <div className="re_reply_box">
                                                <div className="re_id_box">
                                                    <div className="re_id_div">
                                                        <span className="re_id_span">{ReplyData.name}</span>
                                                    </div>
                                                    <div className="re_reply">{ReplyData.content}</div>
                                                </div>
                                                <div className="re_time_reply_box">
                                                    <div className="re_time">{date(ReplyData.createdAt)}</div>
                                                    <button type="button" className="reply_btn" onClick={()=>{setReReIdx(ReplyData.idx); setReReGroupIdx(ReplyData.groupIdx); setReReName(ReplyData.email.split('@')[0]);}}>댓글달기</button>
                                                    <button style={ReplyData.memberIdx===Number(cookie)?{display:'block'}:{display:'none'}} className="re_delete_btn" type="button" onClick={()=>{delReply(ReplyData.idx)}}>삭제</button>
                                                </div>
                                            </div>
                                            <div className="like_box">
                                                <ReplyLike className="like_box" replyIdx={ReplyData.idx} memberIdx={cookie}/>
                                            </div>
                                        </div>
                                    )):
                                    <p style={{fontSize: '1.3rem', textAlign: 'center'}}>등록된 댓글이 없습니다.</p>
                                }
                                </div>
                                <div className="input_reply_container">
                                    {reReIdx!==null?
                                    <div className="reply_to_wrap">
                                        <div className="reply_to_box" style={{display:'inline-block', backgroundColor:'#14c1c7', borderRadius:'3rem',color:'#fff', fontSize:'1.2rem', fontWeight:'bolder', padding:'.3rem .8rem .4rem'}}>
                                            <span className="reply_to_val">{reReName}</span>
                                            <span className="reply_to_del" style={{marginLeft:'.5rem', cursor:'pointer'}} onClick={()=>{setReReIdx(null); setReReGroupIdx(null); setReReName(null)}}>X</span>
                                        </div>
                                    </div>
                                    :
                                    ''
                                    }
                                    <div className="input_reply_box">
                                        <div className="in_input_box">
                                            <textarea className="in_input" placeholder="댓글 달기.." ref={replyValue}></textarea>
                                        </div>
                                        <div className="re_btn_box">
                                            <button type="submit" className="re_btn" onClick={submitReply}>입력</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </UploadForm>
        </>
    );

    //이미지 업로드 js 
    function handleFileSelect(evt) {
        setImgFile(evt.target.files);
        let fileSize = document.querySelectorAll(".prev_img");
        var files = evt.target.files;
        if(fileSize.length + files.length < 7){
        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    var span = document.createElement('span');
                    span.innerHTML =
                        [
                            '<div class="prev_img" style="display: block;"><img style="width:100%; height:100%;" src="',
                            e.target.result,
                            '" title="', escape(theFile.name),
                            '" alt="게시물 사진"/><br><div class="img_del"><i class="fas fa-times-circle"></i></div></div>'
                        ].join('');
                    document.querySelector('.prev_upload').insertBefore(span,null);
                    const muti_img_list = document.querySelectorAll(".img_del");
                    for (let i = 0; i < muti_img_list.length; i++) {
                        muti_img_list[i].addEventListener('click', function () {
                            this.parentNode.remove();
                            console.log(i);
                        });
                    }
                };
            })(f);
            reader.readAsDataURL(f);
        }}else{ alert("사진은 6개까지 첨부 가능합니다");}
    }
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
}

export default UploadPage;