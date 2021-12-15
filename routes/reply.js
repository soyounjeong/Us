const express = require('express');
const mysql = require('mysql');
const config = require('../config/config.json');
const bodyParser = require('body-parser');
const e = require('express');
const pool = mysql.createPool(config);

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))

router.route('/reply/insert_reply').post((req, res) => {
    const idx = req.body.idx;
    const postIdx = req.body.postIdx;
    const parentIdx = req.body.idx;
    const content = req.body.content;
    const memberIdx = req.body.memberIdx;
    if(pool) {
        insertReply(idx, postIdx, parentIdx, content, memberIdx, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.writeHead('202', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>저장 성공 </h2>');
                res.write('<p>너무 잘되욥</p>')
                res.end();
            }
        });
    }
});

const insertReply = function (idx, postIdx, parentIdx, content, memberIdx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {    
            console.log(err)
        } else {
            if(idx == ""){
                conn.query("SELECT AUTO_INCREMENT as auto FROM information_schema.tables WHERE table_name = 'reply' AND table_schema = DATABASE();", (err, result) => {
                    console.log(result[0].auto);
                    conn.query('insert into reply(postIdx, parentIdx, groupIdx, depth, content, memberIdx) values(?, ?, 0, 0, ?, ?);', [postIdx, result[0].auto, content, memberIdx], (err, result) => {
                        conn.release();
                        if(err){
                            callback(err, null);
                            console.log('select문 오류')
                            return;
                        }else{
                            callback(null, result);
                        }
                    });
                });
            }else{
                conn.query('select idx, parentIdx, groupIdx, depth from reply where idx = ?', [parentIdx], (err, result1) => {
                    conn.query('select ifnull(MIN(groupIdx),0) as cnt from reply where parentIdx = ? and groupIdx > ? and depth <= ?;', [result1[0].parentIdx, result1[0].groupIdx, result1[0].depth], (err, result2) => {

                        if(result2[0].cnt == 0){
                            conn.query('select ifnull(max(groupIdx),0)+1 as cnt from reply where parentIdx = ?', [result1[0].parentIdx], (err, result3) => {

                                conn.query('insert into reply(postIdx, parentIdx, groupIdx, depth, content, memberIdx) values(?, ?, ?, ?, ?, ?)', [postIdx, parentIdx, result3[0].cnt, result1[0].depth+1, content, memberIdx], (err, result) => {
                                    conn.release();
                                    if(err){
                                        callback(err, null);
                                        console.log('select문 오류')
                                        return;
                                    }else{
                                        callback(null, result);
                                    }
                                });
                            });
                        }else {
                            conn.query('update reply set groupIdx = groupIdx +1 where parentIdx = ? and groupIdx >= ?', [parentIdx, result2[0].cnt], (err, result3) => {

                                conn.query('insert into reply(postIdx, parentIdx, groupIdx, depth, content, memberIdx) values(?, ?, ?, ?, ?, ?)', [postIdx, parentIdx, result2[0].cnt, result1[0].depth+1, content, memberIdx], (err, result) => {
                                    conn.release();
                                    if(err){
                                        callback(err, null);
                                        console.log('select문 오류')
                                        return;
                                    }else{
                                        callback(null, result);
                                    }
                                });
                            });
                        }
                    });
                });
            }
        }
    });
}







module.exports = router