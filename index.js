const express = require('express');
const app = express();
const http = require('http').createServer(app);
// const logger = require('morgan');
// const cors = require('cors');
// const static = require('serve-static');
// const path = require('path');
const mysql = require('mysql');
const config = require('./config/config');

const mainRouter = require('./routes/main.js');
const postRouter = require('./routes/post.js');
const memberRouter = require('./routes/member.js');
const adminRouter = require('./routes/admin.js');
const replyRouter = require('./routes/reply.js');
const chatRouter = require('./routes/chat.js');
const inquiryRouter = require('./routes/inquiry.js');
const pool = mysql.createPool(config);

app.use(memberRouter);
app.use(mainRouter);
app.use(postRouter);
app.use(adminRouter);
app.use(replyRouter);
app.use(chatRouter);
app.use(inquiryRouter);


const io = require('socket.io')(http);

io.sockets.on('connection', (socket) => {
    // 방 조인
    socket.on('joinRoom', function (room) {   // joinRoom을 클라이언트가 emit 했을 시
        let roomName = room;
        socket.join(roomName);    // 클라이언트를 msg에 적힌 room으로 참여 시킴

        pool.getConnection((err, conn) => {
            if (err) {
                console.log(err)
            } else {
                conn.query('select title from room where title=?',[roomName], (err, result) => {
                    if(result == ""){
                        conn.query('insert into room(title, type) values (?,?)', [roomName, '일반'], (err1, result1) => {
                            if (err1) {
                                console.log(err1);
                            } else {
                                console.log(1);
                            }
                        })
                    }else{
                        console.log(0) // 0 : 실패 , 1: 성공
                    }
                })
            }
        })
    });

    socket.on('message', function (msg) {       // 클라이언트가 채팅 내용을 보냈을 시
        // 전달한 roomName에 존재하는 소켓 전부에게 message라는 이벤트 emit
        io.to(msg.roomName).emit('message', msg);
        console.log(msg);
        pool.getConnection((err, conn)=>{
            if(err){
                console.log(err);
            }else{
                conn.query('select idx from room where title=?', [msg.roomName], (err,result)=>{
                    conn.query('select idx from member where name=?',[msg.sender],(err1,result1)=>{
                        conn.query('insert into chat(roomIdx, memberIdx, content) values (?,?,?)',[result[0].idx, result1[0].idx, msg.data], (err2, result2)=>{
                            conn.query('insert into room_mem(roomIdx, memberIdx) values(?,?)', [result[0].idx, result1[0].idx], (err3, result3)=>{
                                if(err3){
                                    console.log(err3);
                                }else{
                                    console.log(result3);
                                    console.log('======== success =====');
                                }
                            })
                        })
                    });
                })
            }
        })
    })    

    // 방 나가기(이런식으로 하는게 맞는지 오빠한테 물어보기)
    socket.on('leaveRoom', (room) => {
        let leave_roomId = room;
        console.log(leave_roomId);
        socket.leave(leave_roomId);
        pool.getConnection((err, conn) =>{
            if(err){
                console.log(err)
            }else{
                conn.query('select idx from room where title=?',[leave_roomId], (err,result)=>{
                    conn.query('delete from chat where roomIdx=?', [result[0].idx], (err1, result1)=>{
                        conn.query('delete from room_mem where roomIdx=?',[result[0].idx], (err2, result2)=>{
                            conn.query('delete from room where idx=?',[result[0].idx], (err3, result3)=>{
                                if(err3){
                                    console.log(err3);
                                }else{
                                    console.log(result3);
                                    console.log('최종 삭제 완료');
                                }
                            })
                        })
                    })
                })
            }
        })
    });
});

http.listen(3001, () => {
    console.log('3001번포트로 실행중');
});