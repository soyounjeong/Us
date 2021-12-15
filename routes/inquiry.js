const express = require('express');
const mysql = require('mysql');
const config = require('../config/config');
const bodyParser = require('body-parser');
const { call } = require('body-parser');
const pool = mysql.createPool(config);
const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))

// 문의하기
router.route('/inquiry').post((req, res) => {
    const name = req.body.name;
    const title = req.body.title;
    const content = req.body.content;
    const type = req.body.type;
    console.log(`title:${title}, content:${content}, type:${type}, name:${name}`);

    if(pool){
        inquiry(name, title, content, type, (err, result)=>{
            if(err){
                console.log(err)
                res.send(false);
                res.end();
            }else{
                console.log(result);
                res.send(true)
                res.end();
            }
        })
    }
});
const inquiry = function(name, title, content, type, callback){
    pool.getConnection((err, conn)=>{
        if(err){
            console.log(err)
        }else{
            conn.query('select idx, name from member where name=?',[name], (err, result)=>{
                console.log(result[0].idx);
                conn.query('insert into inquiry(memberIdx, title, content, type) values(?,?,?,?)',[result[0].idx, title, content, type], (err1, result1)=>{
                    conn.release();
                    if(err1){
                        callback(err, null);
                        return;
                    }else{
                        callback(null, true);
                    }
                })
            })
        }
    })
}

// 문의 내용 확인
router.route('/inquiry_che').get((req, res) => {
    if(pool){
        inquiry_chk((err, result) => {
            if (err) {
                res.send(false)
                res.end();
            } else {
                res.send(true);
                res.end();
            }
        })
    }
})

const inquiry_chk = function(callback){
    pool.getConnection((err, conn)=>{
        if(err){
            console.log(err);
        }else{
            conn.query('select memberIdx, title, content, type from inquiry', (err, result)=>{
                conn.release();
                if(err){
                    callback(err, null);
                    console.log('select문 오류');
                    return;
                }else{
                    callback(null, result);
                }
            })
        }
    })
}


module.exports = router