const express = require('express');
const mysql = require('mysql');
const config = require('../config/config.json');
const bodyParser = require('body-parser');
const pool = mysql.createPool(config);

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))

// 전체회원
router.route('/admin/member').get((req, res) => {
    const cur = req.query.page;
    const email = req.query.email;
    if (pool) {
        adminMember(cur, email, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})

// 회원 디테일
router.route('/admin/member/Mdetail').get((req, res) => {
    const idx = req.query.idx;
    if (pool) {
        adminMemberMdetail(idx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})

// 회원 디테일 게시물 목록
router.route('/admin/member/post').get((req, res) => {
    const idx = req.query.idx;
    const cur = req.query.page;
    const content = req.query.content;
    if (pool) {
        adminMemberPost(cur, idx, content, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
});

// 회원 디테일 게시글 디테일
router.route('/admin/member/post/detail').get((req, res) => {
    const postIdx = req.query.postIdx;
    const memberIdx = req.query.memberIdx;

    if (pool) {
        adminMemberPostDetail(postIdx, memberIdx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})

// 회원 디테일 채팅창 목록
router.route('/admin/member/room').get((req, res) => {
    const idx = req.query.idx;
    const cur = req.query.page;
    const title = req.query.title;
    if (pool) {
        adminMemberRoom(cur, idx, title, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
});

// 회원 디테일 채팅창 디테일
router.route('/admin/member/room/detail').get((req, res) => {
    const roomIdx = req.query.roomIdx;

    if (pool) {
        adminMemberRoomDetail(roomIdx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
})

// 게시글 목록
router.route('/admin/post').get((req, res) => {
    const cur = req.query.page;
    const report = req.query.report;
    const date1 = req.query.date1;
    const date2 = req.query.date2;
    if (pool) {
        adminPost(cur, report, date1, date2, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
})

// 게시글 디테일
router.route('/admin/post/detail').get((req, res) => {
    const postIdx = req.query.postIdx;
    const memberIdx = req.query.memberIdx;

    if (pool) {
        adminPostDetail(postIdx, memberIdx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})

// 채팅 목록
router.route('/admin/chat').get((req, res) => {
    const cur = req.query.page;
    const report = req.query.report;
    const date1 = req.query.date1;
    const date2 = req.query.date2;

    if (pool) {
        adminChat(cur, report, date1, date2, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
})

// 채팅 상세
router.route('/admin/chat/detail').get((req, res) => {
    const idx = req.query.idx;

    if (pool) {
        adminChatDetail(idx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})

// 채팅 메시지 상세
router.route('/admin/chat/detail/plus').get((req, res) => {
    const idx = req.query.idx;

    if (pool) {
        adminChatDetailPlus(idx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})

// 1:1문의 내역
router.route('/admin/inquiry').get((req, res) => {
    const cur = req.query.page;
    const name = req.query.name;
    if (pool) {
        adminInquiry(cur, name, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
});

// 문의 상세
router.route('/admin/inquiry/detail').get((req, res) => {
    const idx = req.query.idx;
    if (pool) {
        adminInquiryDetail(idx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
});



// 전체회원
const adminMember = function (cur, email, callback) {
    // 페이지 당 게시물 수
    const page_size = 10;
    // 페이지의 갯수
    const page_list_size = 5;
    // limit의 변수
    let no = "";
    // 전체 게시물숫자
    let totalPageCount = 0;
    // 현재 페이지
    let curPage = cur;

    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            if (email == null) {
                conn.query('select count(*) as cnt from member', (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 10) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        const endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        conn.query('select idx, email, createdAt from member order by idx desc limit ?, ?', [no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                return;
                            } else {
                                callback(null, { result, startPage, endPage });
                            }
                        })
                    }
                })
            } else {
                const keyword = "%" + email + "%";
                conn.query('select count(*) as cnt from member where email like ?', [keyword], (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 10) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        const endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        conn.query('select idx, email, createdAt from member where email like ? order by idx desc limit ?, ?', [keyword, no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                return;
                            } else {
                                callback(null, { result, startPage, endPage });
                            }
                        })
                    }
                })
            }
        }
    });
}

// 회원 디테일
const adminMemberMdetail = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            conn.query('select idx, email, code, createdAt, (select count(*) from friend where memberIdx = ?) as friendCnt  from member where idx = ?;', [idx, idx], (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null)
                    return;
                } else {
                    callback(null, result);
                }
            })
        }
    })
}

// 회원 디테일 게시글 목록
const adminMemberPost = function (idx, cur, content, callback) {
    // 페이지 당 게시물 수
    const page_size = 10;
    // 페이지의 갯수
    const page_list_size = 5;
    // limit의 변수
    let no = "";
    // 전체 게시물숫자
    let totalPageCount = 0;
    // 현재 페이지
    let curPage = cur;

    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            if (content == null) {
                conn.query('select count(*) as cnt from post', (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 10) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        const endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        conn.query('select idx, content, createdAt from post where memberIdx = ? order by idx desc limit ?, ?', [idx, no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                return;
                            } else {
                                callback(null, { result, startPage, endPage });
                            }
                        });
                    }
                });
            } else {
                const keyword = "%" + content + "%";
                conn.query('select count(*) as cnt from post where content like ?', [keyword], (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 10) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        const endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        conn.query('select idx, content, createdAt from post where memberIdx = ? and content like ? order by idx desc limit ?, ?', [idx, keyword, no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                return;
                            } else {
                                callback(null, { result, startPage, endPage });
                            }
                        });
                    }
                });
            }
        }
    });
}

// 게시글 디테일
const adminMemberPostDetail = function (postIdx, memberIdx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql1 = 'select p.title, p.content, p.createdAt, m.email, m.name from post as p join member as m on p.memberIdx = m.idx where p.idx = ?;';
            const sql1s = mysql.format(sql1, memberIdx)

            const sql2 = 'select imgPath from img where postIdx = ?;';
            const sql2s = mysql.format(sql2, postIdx);

            const sql3 = 'select r.content, m.email from reply as r join member as m on r.memberIdx = m.idx where postIdx = ?;';
            const sql3s = mysql.format(sql3, postIdx);

            conn.query(sql1s + sql2s + sql3s, (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, result);
                }
            });
        }
    });
}

// 회원 디테일 채팅방 목록
const adminMemberRoom = function (idx, cur, title, callback) {
    // 페이지 당 게시물 수
    const page_size = 10;
    // 페이지의 갯수
    const page_list_size = 5;
    // limit의 변수
    let no = "";
    // 전체 게시물숫자
    let totalPageCount = 0;
    // 현재 페이지
    let curPage = cur;

    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            if (title == null) {
                conn.query('select count(*) as cnt from room', (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 10) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        const endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        conn.query('select r.idx, r.title, r.createdAt from room as r join room_mem as rm on r.idx = rm.roomIdx where rm.memberIdx = ? order by r.idx desc limit ?, ?;', [idx, no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null); 3
                                console.log('sql문 오류')
                                return;
                            } else {
                                callback(null, { result, startPage, endPage });
                            }
                        });
                    }
                });
            } else {
                const keyword = "%" + title + "%";
                conn.query('select count(*) as cnt from room where title like ?', [keyword], (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 10) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        const endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        conn.query('select r.idx, r.title, r.createdAt from room as r join room_mem as rm on r.idx = rm.roomIdx where rm.memberIdx = ? and title like ? order by r.idx desc limit ?, ?;', [idx, keyword, no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null); 3
                                console.log('sql문 오류')
                                return;
                            } else {
                                callback(null, { result, startPage, endPage });
                            }
                        });
                    }
                });
            }
        }
    });
}

// 회원 디테일 채팅방 디테일
const adminMemberRoomDetail = function (roomIdx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('select r.title, c.content, c.createdAt, m.name, m.img from room as r join chat as c on r.idx = c.roomIdx join member as m on c.memberIdx = m.idx where c.roomIdx = ? order by c.createdAt asc', [roomIdx], (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    console.log('select문 오류')
                    return;
                } else {
                    callback(null, result);
                }
            });
        }
    });
}

// 게시글 목록
const adminPost = function (cur, report, date1, date2, callback) {
    // 페이지 당 게시물 수
    const page_size = 10;
    // 페이지의 갯수
    const page_list_size = 5;
    // limit의 변수
    let no = "";
    // 전체 게시물숫자
    let totalPageCount = 0;
    // 현재 페이지
    let curPage = cur;

    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const date11 = date1 + " 00:00:00";
            const date22 = date2 + " 23:59:59";
            if (report != null && date1 != null) {
                conn.query('select count(*) as cnt from post where report = ? and createdAt between ? and ? ', [report, date11, date22], (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 10) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        const endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        conn.query('select p.idx, m.name, p.createdAt, p.report from post as p join member as m on p.memberIdx = m.idx where report = ? and p.createdAt between ? and ? order by idx desc limit ?, ?', [report, date11, date22, no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                console.log('sql문 오류')
                                return;
                            } else {
                                callback(null, { result, startPage, endPage });
                            }
                        });
                    }
                });
            } else if (report != null || date1 != null) {
                if (report) {
                    conn.query('select count(*) as cnt from post where report = ?', [report], (err, result) => {
                        if (err) {
                            console.log(err);
                            console.log('sql문 오류')
                        } else {
                            totalPageCount = result[0].cnt;

                            if (totalPageCount < 0) {
                                totalPageCount = 0;
                            }

                            // 전체 페이지수
                            const totalPage = Math.ceil(totalPageCount / page_size);
                            // 전체 세트수
                            const totalSet = Math.ceil(totalPage / page_list_size);
                            // 현재 세트 번호
                            const curSet = Math.ceil(curPage / page_list_size);
                            //  현재 세트내 출력될 첫 페이지
                            const startPage = ((curSet - 1) * 10) + 1;
                            // 현재 세트내 출력될 마지막 페이지
                            const endPage = (startPage + page_list_size) - 1;

                            if (curPage < 0) {
                                no = 0
                            } else {
                                no = (curPage - 1) * 10
                            }

                            conn.query('select p.idx, m.name, p.createdAt, p.report from post as p join member as m on p.memberIdx = m.idx where report = ? order by idx desc limit ?, ?', [report, no, page_size], (err, result) => {
                                conn.release();
                                if (err) {
                                    callback(err, null);
                                    console.log('sql문 오류')
                                    return;
                                } else {
                                    callback(null, { result, startPage, endPage });
                                }
                            });
                        }
                    });
                } else {
                    conn.query('select count(*) as cnt from post where createdAt between ? and ? ', [date11, date22], (err, result) => {
                        if (err) {
                            console.log(err);
                            console.log('sql문 오류')
                        } else {
                            totalPageCount = result[0].cnt;
                            if (totalPageCount < 0) {
                                totalPageCount = 0;
                            }
                            // 전체 페이지수
                            const totalPage = Math.ceil(totalPageCount / page_size);
                            // 전체 세트수
                            const totalSet = Math.ceil(totalPage / page_list_size);
                            // 현재 세트 번호
                            const curSet = Math.ceil(curPage / page_list_size);
                            //  현재 세트내 출력될 첫 페이지
                            const startPage = ((curSet - 1) * 10) + 1;
                            // 현재 세트내 출력될 마지막 페이지
                            const endPage = (startPage + page_list_size) - 1;

                            if (curPage < 0) {
                                no = 0
                            } else {
                                no = (curPage - 1) * 10
                            }

                            conn.query('select p.idx, m.name, p.createdAt, p.report from post as p join member as m on p.memberIdx = m.idx where p.createdAt between ? and ? order by idx desc limit ?, ?', [date11, date22, no, page_size], (err, result) => {
                                conn.release();
                                if (err) {
                                    console.log('1111111')
                                    callback(err, null);
                                    console.log('sql문 오류')
                                    return;
                                } else {
                                    callback(null, { result, startPage, endPage });
                                }
                            });
                        }
                    });
                }
            } else {
                conn.query('select count(*) as cnt from post', (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 10) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        const endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        conn.query('select p.idx, m.name, p.createdAt, p.report from post as p join member as m on p.memberIdx = m.idx order by idx desc limit ?, ?', [no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                console.log('sql문 오류')
                                return;
                            } else {
                                callback(null, { result, startPage, endPage });
                            }
                        });
                    }
                });
            }
        }
    });
}

// 게시글 디테일
const adminPostDetail = function (postIdx, memberIdx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql1 = 'select p.title, p.content, p.createdAt, m.email, m.name from post as p join member as m on p.memberIdx = m.idx where p.idx = ?;';
            const sql1s = mysql.format(sql1, memberIdx)

            const sql2 = 'select imgPath from img where postIdx = ?;';
            const sql2s = mysql.format(sql2, postIdx);

            const sql3 = 'select r.content, m.email from reply as r join member as m on r.memberIdx = m.idx where postIdx = ?;';
            const sql3s = mysql.format(sql3, postIdx);

            conn.query(sql1s + sql2s + sql3s, (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, result);
                }
            });
        }
    });
}

// 채팅 목록
const adminChat = function (cur, report, date1, date2, callback) {
    // 페이지 당 게시물 수
    const page_size = 10;
    // 페이지의 갯수
    const page_list_size = 5;
    // limit의 변수
    let no = "";
    // 전체 게시물숫자
    let totalPageCount = 0;
    // 현재 페이지
    let curPage = cur;

    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const date11 = date1 + " 00:00:00";
            const date22 = date2 + " 23:59:59";
            if (report != null && date1 != null) {
                conn.query('select count(*) as cnt from room where report = ? and createdAt between ? and ?', [report, date11, date22], (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 10) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        const endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        conn.query('select idx, title, report, count(*) from room where report = ? and createdAt between ? and ? group by title order by idx desc limit ?, ?;', [report, date11, date22, no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                console.log('sql문 오류')
                                return;
                            } else {
                                callback(null, { result, startPage, endPage });
                            }
                        });
                    }
                });
            } else if (report != null || date1 != null) {
                if (report) {
                    conn.query('select count(*) as cnt from room where report = ?', [report], (err, result) => {
                        if (err) {
                            console.log(err);
                            console.log('sql문 오류')
                        } else {
                            totalPageCount = result[0].cnt;

                            if (totalPageCount < 0) {
                                totalPageCount = 0;
                            }

                            // 전체 페이지수
                            const totalPage = Math.ceil(totalPageCount / page_size);
                            // 전체 세트수
                            const totalSet = Math.ceil(totalPage / page_list_size);
                            // 현재 세트 번호
                            const curSet = Math.ceil(curPage / page_list_size);
                            //  현재 세트내 출력될 첫 페이지
                            const startPage = ((curSet - 1) * 10) + 1;
                            // 현재 세트내 출력될 마지막 페이지
                            const endPage = (startPage + page_list_size) - 1;

                            if (curPage < 0) {
                                no = 0
                            } else {
                                no = (curPage - 1) * 10
                            }

                            conn.query('select idx, title, report, count(*) from room where report = ? group by title order by idx desc limit ?, ?;', [report, no, page_size], (err, result) => {
                                conn.release();
                                if (err) {
                                    callback(err, null);
                                    console.log('sql문 오류')
                                    return;
                                } else {
                                    callback(null, { result, startPage, endPage });
                                }
                            });
                        }
                    });
                } else {
                    conn.query('select count(*) as cnt from room where createdAt between ? and ?', [date11, date22], (err, result) => {
                        if (err) {
                            console.log(err);
                            console.log('sql문 오류')
                        } else {
                            totalPageCount = result[0].cnt;

                            if (totalPageCount < 0) {
                                totalPageCount = 0;
                            }

                            // 전체 페이지수
                            const totalPage = Math.ceil(totalPageCount / page_size);
                            // 전체 세트수
                            const totalSet = Math.ceil(totalPage / page_list_size);
                            // 현재 세트 번호
                            const curSet = Math.ceil(curPage / page_list_size);
                            //  현재 세트내 출력될 첫 페이지
                            const startPage = ((curSet - 1) * 10) + 1;
                            // 현재 세트내 출력될 마지막 페이지
                            const endPage = (startPage + page_list_size) - 1;

                            if (curPage < 0) {
                                no = 0
                            } else {
                                no = (curPage - 1) * 10
                            }

                            conn.query('select idx, title, report, count(*) from room where createdAt between ? and ? group by title order by idx desc limit ?, ?;', [date11, date22, no, page_size], (err, result) => {
                                conn.release();
                                if (err) {
                                    callback(err, null);
                                    console.log('sql문 오류')
                                    return;
                                } else {
                                    callback(null, { result, startPage, endPage });
                                }
                            });
                        }
                    });
                }
            } else {
                conn.query('select count(*) as cnt from room', (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 10) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        const endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        conn.query('select idx, title, report, count(*) from room group by title order by idx desc limit ?, ?;', [no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                console.log('sql문 오류')
                                return;
                            } else {
                                callback(null, { result, startPage, endPage });
                            }
                        });
                    }
                });
            }
        }
    });
}

// 채팅 상세
const adminChatDetail = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql1 = 'select m.name, m.img, c.content, c.idx, c.createdAt from room as r join chat as c on r.idx = c.roomIdx join member as m on c.memberIdx = m.idx where c.roomIdx = ? order by c.createdAt asc;';
            const sql1s = mysql.format(sql1, idx);

            const sql2 = 'select r.title, count(rm.roomIdx) as cnt, r.createdAt, r.report from room_mem as rm join room as r where roomIdx = ?;';
            const sql2s = mysql.format(sql2, idx);

            const sql3 = 'select m.name, m.img from room_mem as rm join member m on rm.memberIdx = m.idx where roomIdx = ?;'
            const sql3s = mysql.format(sql3, idx);

            conn.query(sql1s + sql2s + sql3s, (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, result);
                }
            });
        }
    });
}

// 채팅 상세 더보기
const adminChatDetailPlus = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('select m.name ,c.content from chat as c join member as m on c.memberIdx = m.idx where c.idx = ?;', [idx], (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, result);
                }
            });
        }
    });
}

// 문의 목록
const adminInquiry = function (cur, name, callback) {
    // 페이지 당 게시물 수
    const page_size = 10;
    // 페이지의 갯수
    const page_list_size = 5;
    // limit의 변수
    let no = "";
    // 전체 게시물숫자
    let totalPageCount = 0;
    // 현재 페이지
    let curPage = cur;

    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            if (name == null) {
                conn.query('select count(*) as cnt from inquiry', (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 10) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        const endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        conn.query('select m.name, i.type, i.content, i.createdAt from inquiry as i join member m on i.memberIdx = m.idx order by i.idx desc limit ?, ?;', [no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                console.log('sql문 오류')
                                return;
                            } else {
                                callback(null, { result, startPage, endPage });
                            }
                        });
                    }
                });
            } else {
                conn.query('select idx from member where name = ?', [name], (err, resultIdx) => {
                    if(err){
                        console.log(err);
                    }
                    conn.query('select count(*) as cnt from inquiry where memberIdx = ?', [resultIdx[0].idx], (err, result) => {
                        if (err) {
                            console.log(err);
                            console.log('sql문 오류')
                        } else {
                            totalPageCount = result[0].cnt;
    
                            if (totalPageCount < 0) {
                                totalPageCount = 0;
                            }
    
                            // 전체 페이지수
                            const totalPage = Math.ceil(totalPageCount / page_size);
                            // 전체 세트수
                            const totalSet = Math.ceil(totalPage / page_list_size);
                            // 현재 세트 번호
                            const curSet = Math.ceil(curPage / page_list_size);
                            //  현재 세트내 출력될 첫 페이지
                            const startPage = ((curSet - 1) * 10) + 1;
                            // 현재 세트내 출력될 마지막 페이지
                            const endPage = (startPage + page_list_size) - 1;
    
                            if (curPage < 0) {
                                no = 0
                            } else {
                                no = (curPage - 1) * 10
                            }
    
                            conn.query('select m.name, i.type, i.content, i.createdAt from inquiry as i join member m on i.memberIdx = m.idx where memberIdx = ? order by i.idx desc limit ?, ?;', [resultIdx[0].idx, no, page_size], (err, result) => {
                                conn.release();
                                if (err) {
                                    callback(err, null);
                                    console.log('sql문 오류')
                                    return;
                                } else {
                                    callback(null, { result, startPage, endPage });
                                }
                            });
                        }
                    });
                });
            }
        }
    });
}

// 문의 상세
const adminInquiryDetail = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql1 = 'select m.name, i.type, i.content, i.createdAt from inquiry as i join member m on i.memberIdx = m.idx where i.idx = ?;';
            const sql1s = mysql.format(sql1, idx)

            const sql2 = 'select m.name, m.email from inquiry as i join member m on i.respondent = m.idx where i.idx = ?;';
            const sql2s = mysql.format(sql2, idx)

            conn.query(sql1s + sql2s, (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, result);
                }
            });
        }
    });
}

module.exports = router