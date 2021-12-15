// 모듈 임포트 
const express = require('express');
const bodyParser = require('body-parser'); // post방식
const ejs = require('ejs');
const mysql = require('mysql');
const logger = require('morgan'); // 로그모듈
const config = require('../config/config.json');
const cookieParser = require('cookie-parser');
const session = require('express-session'); // 세션 설정과 관리
const MySQLStore = require('express-mysql-session')(session); // 세션 설정과 관리
const bcrypt = require('bcrypt'); // 암호화 (현업에서 salt랑 가장 많이 사용)
const { call } = require('body-parser');
const saltRounds = 10; // 해킹 방지를 위한 접근 제한 변수 
const nodemailer = require('nodemailer'); // 비밀번호 찾기할때 필요 


const app = express();
const router = express.Router(); // 라우터 사용(특정 경로로 들어오는 요청에 대해 함수를 수행 시킬 수 있는 기능을 express가 제공)

router.use(bodyParser.urlencoded({ extended: false }))
router.use(logger('dev'));
router.use(cookieParser());// 쿠기와 세션을 미들웨어로 등록
var sessionStore = new MySQLStore(config);
// 세션 환경세팅
router.use(session({
    key: "first",
    secret: "session_cookie_secret", // sessioId를 hash하기 위해 사용되는 key값
    store: sessionStore,
    resave: false, // 세션을 접속할때마다 새로운 세션을 발급할지 말지(기본 false)
    saveUninitialized: false, // 세션 ID를 발급하지 않는 세션도 다 기록할지 정함(기본 false)
}));

app.set('view engine', 'ejs'); // 화면 engine을 ejs로 설정
app.set('views', '../views'); // view 경로 설정 

const pool = mysql.createPool(config);


// 회원가입
router.route('/member/regist').get((req, res) => {
    res.render('signup.ejs');
});
// http://127.0.0.1:3000/member/regist (post)
router.route('/member/regist').post((req, res) => {
    const email = req.body.email;
    const userPw = req.body.userPw;
    const name = req.body.name;
    const tel = req.body.tel;
    const code = req.body.code;

    console.log(`email: ${email}, userpw:${userPw}, name:${name}, tel:${tel}, code:${code}`);

    if (pool) {
        joinMember(email,userPw,name, tel, code, (err, result) => {
            if (err) {
                console.log(err);
                res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
                res.write('<h2>회원가입 실패!</h2>');
                res.write('<p>가입중 오류가 발생했습니다</p>');
                res.end();
            } else {
                res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
                res.write('<h2>회원가입 성공!</h2>');
                res.write('<p>회원가입이 성공적으로 완료되었습니다</p>');
                res.write(`<button onclick="loginpage()">로그인</button>`);
                res.write('<script>function loginpage(){location.href="/member/login"}</script>');
                res.end();
            }
        });
    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
        res.write('<h2>데이터베이스 연결 실패!</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다</p>');
        res.end();
    }
});

const joinMember = function (email,userPw, name, tel, code, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const encryptedPassword = bcrypt.hashSync(userPw, saltRounds) // 비밀번호 암호화 
            const sql = conn.query('insert into member(email, userPw, name, tel, code) values (?, ?, ?, ?, ?)', [email, encryptedPassword,name, tel, code], (err, result) => {
                console.log(sql);
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    console.log("가입완료!");
                    callback(null, result);
                }
            });

        }
    });
}

// 로그인 
router.route('/member/login').get((req, res) => {
    res.render('login.ejs');
});

// http://127.0.0.1:3000/member/login (post)
router.route('/member/login').post((req, res) => {
    const email = req.body.email;
    const userPw = req.body.userPw;
    const loginsql = 'select * from member where email=?';
    const encryptedPassword = bcrypt.hashSync(userPw, saltRounds) // 비밀번호 암호화

    pool.query(loginsql, email, function (err, rows, fields) {
        if (err) {
            console.log('err : ' + err);
        } else {
            console.log(rows);
            if (rows[0] != undefined) {
                if (!bcrypt.compareSync(userPw, rows[0].userPw)) {
                    console.log('패스워드가 일치하지 않습니다.');
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>패스워드가 일치하지 않습니다.</h2>');
                    res.end();
                } else {
                    console.log('로그인 성공');
                    const email = rows[0].email;
                    const userPw = rows[0].userPw;
                    const name = rows[0].name;

                    req.session.is_logined = true;
                    req.session.email = rows.email;
                    req.session.userPw = rows.userPw;
                    req.session.save(function () { // 세션 스토어에 적용하는 작업
                    });
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>로그인 성공!</h2>');
                    res.write(`<p>이메일 : ${email}</p>`);
                    res.write(`<p>이름 : ${name}</p>`);
                    res.write(`<button onclick="logoutpage()">로그아웃</button>`);
                    res.write('<script>function logoutpage(){location.href="/member/logout"}</script>');
                    res.end();

                }
            } else {
                console.log(rows[0]);
                console.log('해당 유저가 없습니다.');
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>해당 유저가 없습니다.</h2>');
                res.end();
            }
        }
    })
});



// 이메일 찾기  → ❗️미완성❗️
// http://127.0.0.1:3000/member/findId (post)
router.route('/member/findId').post((req, res)=>{
    const tel = req.body.tel;
    const email = req.body.email;
    console.log(tel);

    pool.query('select tel, email from member where tel=?', [tel], (err, data) => {
        console.log(masking(data));

        if (err) {
            console.log(err);
        } else {
            if (tel == data[0].tel) {
                console.log('이메일 찾기 성공 ');
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>이메일 찾기 성공!</h2>');
                res.write('<p>userid :' + masking(data) + '</p>');
                res.end();
            } else {
                console.log('이메일 찾기 실패');
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>이메일 찾기 실패!</h2>');
                res.write('<p>이메일 찾기 실패하였습니다.</p>');
                res.end();
            }
        }
    });
});
function masking(data) {
    const len = data[0].email.split('@')[0].length-3; // apple
    return data[0].email.replace(new RegExp('.(?=.{0,' + len + '}@)', 'g'), '*');
}




// 임시 비밀번호 보내기
router.route('/member/sendMail').post((req, res) => {
    var variable = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
    var randomPassword = createCode(variable, 8);

    function createCode(objArr, iLength) {
        var variable = objArr;
        var randomStr = "";
        for (var j = 0; j < iLength; j++) {
            randomStr += variable[Math.floor(Math.random() * variable.length)];
        }
        return randomStr
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: { // 이메일을 보낼 계정 데이터 입력
            user: 'wd4537syj@nsu.ac.kr',
            pass: 'syj30408!!',
        },
    });
    const emailOptions = { // 옵션값 설정
        from: 'wd4537syj@nsu.ac.kr',
        to: 'wd4537syj@naver.com',
        subject: 'Us에서 임시비밀번호를 알려드립니다.',
        html:
            "<h1 >Binding에서 새로운 비밀번호를 알려드립니다.</h1> <h2> 비밀번호 : " + randomPassword + "</h2>"
            + '<h3 style="color: crimson;">임시 비밀번호로 로그인 하신 후, 반드시 비밀번호를 수정해 주세요.</h3>',
    };
    transporter.sendMail(emailOptions, function(err, info){
        if(err){
            console.log(err);
        }else{
            console.log('Email sent : ' + info.response);
            res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
            res.write('<h2>가입시 등록한 이메일로 임시 비밀번호를 전송해드렸습니다.</h2>');
            res.end();
        }
    }); //전송
})





// 비밀번호 찾기  → ❗️미완성❗️
// http://127.0.0.1:3000/member/findPassword (post)
router.route('/member/findPassword').post((req, res)=>{
    const tel = req.body.tel;
    const email = req.body.email;
    const userPw = req.body.userPw;
    console.log(tel);
    console.log(email);

    pool.query('select tel,email, userPw from member where email=?', [email],(err, data)=>{
        console.log(data);
        if (err) {
            console.log(err);
            console.log('비밀번호 찾기 실패');
            res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
            res.write('<h2>아이디 또는 비밀번호를 확인해주세요.</h2>');
            res.end();
        } else {
            if (tel == data[0].tel && email == data[0].email) {
                console.log('비밀번호 찾기 성공');
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>비밀번호 찾기 성공!</h2>');
                res.write('<p>userid :' + data[0].userPw + '</p>');
                res.end();
            } else if (tel != data[0].tel || email != data[0].email) {
                console.log('비밀번호 찾기 실패');
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>아이디 또는 비밀번호를 확인해주세요.</h2>');
                res.end();
            } else {
                console.log('비밀번호 찾기 실패');
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>비밀번호 찾기 실패!</h2>');
                res.write('<p>비밀번호 찾기 실패하였습니다.</p>');
                res.end();
            }
        }
        
    })
})



// 로그아웃
router.route('/member/logout').get((req, res) => {
    res.clearCookie("first");
    req.session.destroy(function (err) {
        if (err) console.err('err : ', err);
        res.send('<script>alert("로그아웃 되었습니다!");location.href="/member/login";</script>');
    });
})



// 정보 수정
// http://127.0.0.1:3000/member/edit (put)
router.route('/member/edit').put((req, res) => {
    const userPw = req.body.userPw;
    const email = req.body.email;
    const name = req.body.name;
    const tel = req.body.tel;

    console.log(`email:${email}, userpw:${userPw}, name:${name}, tel:${tel}`);

    if (pool) {
        editMember(userPw,name, tel, email, (err, result) => {
            if (err) {
                console.log(err);
                res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
                res.write('<h2>회원정보 수정 실패!</h2>');
                res.write('<p>수정중 오류가 발생했습니다</p>');
                res.end();
            } else {
                res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
                res.write('<h2>회원정보 수정 성공!</h2>');
                res.write('<p>회원정보 수정이 성공적으로 완료되었습니다</p>');
                res.end();
            }
        });
    } else {
        res.writeHead('404', { 'content-type': 'text/html;charset=utf-8' });
        res.write('<h2>데이터베이스 연결 실패!</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다</p>');
        res.end();
    }
});
const editMember = function (userPw, name, tel, email, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const encryptedPassword = bcrypt.hashSync(userPw, saltRounds) // 비밀번호 암호화 
            const sql = conn.query('update member set userPw=?,name=?, tel=? where email=?', [encryptedPassword, name, tel, email], (err, result) => {
                console.log(sql);
                conn.release();
                if (err) {
                    console.log(err);
                    return;
                } else {
                    callback(null, result);
                }
            });
        }
    });
}



// 정보 삭제(탈퇴)
// http://127.0.0.1:3000/member/delete (delete)
router.route('/member/delete').delete((req, res) => {
    const email = req.body.email;

    console.log(`email : ${email}`);

    if (pool) {
        deleteMember(email, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>회원삭제 실패!</h2>');
                res.write('<p>오류가 발생했습니다</p>');
                res.end();
            } else {
                if (result.deletedCount > 0) {
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>회원 삭제 실패!</h2>');
                    res.write('<p>회원 삭제 실패하였습니다.</p>');
                    res.end();
                } else {
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>회원 삭제 성공!</h2>');
                    res.write('<p>회원 삭제가 성공적으로 완료되었습니다.</p>');
                    res.end();
                }
            }
        });
    }
});
const deleteMember = function (email, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql = conn.query('delete from member where email=?', [email], (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    console.log("삭제완료!");
                    callback(null, result);
                }
            });
        }
    });
}


module.exports = router
