const express = require("express");
const path = require("path");
const router = express.Router();
const con = require("../sql.js");
router.get("/", (req, res) => {
    res.sendFile(path.resolve("index.html"));
});

//登录验证
router.post("/checklogin", (req, res) => {
    let {username, password} = req.body;
    con.query("SELECT  * FROM admin WHERE username=?", username, (err, result) => {
        if (!err) {

            if (result.length > 0) {
                if (result[0].password === password) {
                    res.send({
                        data: {
                            status: 200,
                            msg: "success"
                        }
                    })
                }
                else {
                    res.send({
                        data: {
                            status: 10000,
                            msg: "wrong password"
                        }
                    })
                }
            } else {
                res.send({
                    data: {
                        status: 10001,
                        msg: "Not exit"
                    }
                })
            }
        } else {
            throw err;
        }
    })
});

//作品管理
router.get("/getWorks", (req, res) => {
    let p = req.query.p ? req.query.p : 1;
    let {workName, type} = req.query;
    if (workName && type) {
        con.query(`SELECT * FROM works WHERE workName LIKE "%${workName}%"&&type="${type}"  LIMIT  ${(p - 1) * 2},2; SELECT COUNT(*)  AS total  FROM works WHERE workName LIKE "%${workName}%"&&type="${type}" `, (err, data) => {
            if (!err) {
                res.send({
                    data: data[0],
                    total: data[1][0].total
                })

            } else {
                throw err;
            }
        })
    } else {
        con.query(`SELECT *,nickName FROM works,users WHERE author=uid LIMIT ${(p - 1) * 2},2; SELECT COUNT(*)  AS total FROM works `, (err, data) => {
            if (!err) {
                res.send({
                    data: data[0],
                    total: data[1][0].total
                })

            } else {
                throw err;
            }
        })
    }


});
router.get("/auditingwork", (req, res) => {
    let {id, state} = req.query;
    con.query("UPDATE works SET state=? WHERE id=" + id, state, (err, data) => {
        if (!err) {
            if (data.affectedRows === 1) {
                res.send({
                    data: {
                        message: "ok"
                    }
                })
            }
        } else {
            throw err;
        }
    });

});
//文章管理
router.get("/getArticles", (req, res) => {
    let p = req.query.p ? req.query.p : 1;
    let {title, type} = req.query;
    if (title && type) {
        con.query(`SELECT * FROM articles WHERE title LIKE "%${title}%"&&type="${type}"  LIMIT  ${(p - 1) * 3},3; SELECT COUNT(*)  AS total  FROM articles WHERE title LIKE "%${title}%"&&type="${type}" `, (err, data) => {
            if (!err) {
                res.send({
                    data: data[0],
                    total: data[1][0].total,
                    state: "ok"
                })

            } else {
                throw err;
            }
        })
    } else {
        con.query(`SELECT * FROM articles LIMIT ${(p - 1) * 3},3; SELECT COUNT(*)  AS total FROM articles `, (err, data) => {
            if (!err) {
                res.send({
                    data: data[0],
                    total: data[1][0].total,
                    state: "ok"

                })

            } else {
                throw err;
            }
        })
    }


});
router.get("/auditingArticle", (req, res) => {
    let {aid, state} = req.query;
    con.query("UPDATE articles SET state=? WHERE aid=" + aid, state, (err, data) => {
        if (!err) {
            if (data.affectedRows === 1) {
                res.send({
                    data: {
                        message: "ok"
                    }
                })
            }
        } else {
            throw err;
        }
    });
})

//视频管理
router.get("/getVideos", (req, res) => {
    let p = req.query.p ? req.query.p : 1;
    let {name, type} = req.query;
    if (name && type) {
        con.query(`SELECT * FROM videos WHERE name LIKE "%${name}%"&&type="${type}"  LIMIT  ${(p - 1) * 2},2; SELECT COUNT(*)  AS total  FROM videos WHERE name LIKE "%${name}%"&&type="${type}" `, (err, data) => {
            if (!err) {
                res.send({
                    data: data[0],
                    total: data[1][0].total,
                    state: "ok"
                })

            } else {
                throw err;
            }
        })
    } else {
        con.query(`SELECT * FROM videos LIMIT ${(p - 1) * 2},2; SELECT COUNT(*)  AS total FROM videos `, (err, data) => {
            if (!err) {
                res.send({
                    data: data[0],
                    total: data[1][0].total,
                    state: "ok"
                })

            } else {
                throw err;
            }
        })
    }

});
router.get("/auditingVideos", (req, res) => {
    let {id, state} = req.query;
    con.query("UPDATE videos SET state=? WHERE id=" + id, state, (err, data) => {
        if (!err) {
            if (data.affectedRows === 1) {
                res.send({
                    data: {
                        message: "ok"
                    }
                })
            }
        } else {
            throw err;
        }
    });
})

//招聘信息
router.get("/getRecruitments", (req, res) => {
    let p = req.query.p - 1;
    con.query(`SELECT * FROM recruitments LIMIT ${p * 2},2;SELECT COUNT(*)  AS total FROM recruitments`, (err, data) => {
        if (!err) {
            res.send({
                data: data[0],
                total: data[1][0].total,
                state: "ok"
            })
        } else {
            throw err;
        }
    })

});
router.get("/auditingRecruitment", (req, res) => {
    let {id, state} = req.query;
    con.query("UPDATE recruitments SET state=? WHERE id=" + id, state, (err, data) => {
        if (!err) {
            if (data.affectedRows === 1) {
                res.send({
                    data: {
                        message: "ok"
                    }
                })
            }
        } else {
            throw err;
        }
    });
});

//简历
router.get("/getResumes", (req, res) => {
    let p = req.query.p - 1;

    con.query(`SELECT * FROM resumes LIMIT ${p * 4},4;SELECT COUNT(*)  AS total FROM resumes`, (err, data) => {
        if (!err) {
            res.send({
                data: data[0],
                total: data[1][0].total
            })
        } else {
            throw err;
        }
    })
});
router.get("/auditingResume", (req, res) => {
    let {id, state} = req.query;
    con.query("UPDATE resumes SET state=? WHERE id=" + id, state, (err, data) => {
        if (!err) {
            if (data.affectedRows === 1) {
                res.send({
                    data: {
                        message: "ok"
                    }
                })
            } else {
                res.send({
                    data: {
                        message: "fail"
                    }
                })
            }
        } else {
            throw err;
        }
    });
});

//restful api
router.get("/notice", (req, res) => {
    let p = req.query.p - 1;
    con.query(`SELECT * FROM notices LIMIT ${p * 5},5;SELECT COUNT(*)  AS total FROM notices`, (err, data) => {
        if (!err) {
            res.send({
                data: data[0],
                total: data[1][0].total
            })
        } else {
            throw err;
        }
    })
});
router.post("/notice", (req, res) => {
    let {content, date, sort} = req.body;
    con.query("INSERT INTO notices (content,date,sort) VALUES (?,?,?)", [content, date, sort], (err, data) => {
        if (!err) {
            if (data.affectedRows === 1) {
                res.send({
                    data: {
                        message: "ok"
                    }
                })
            } else {
                res.send({
                    data: {
                        message: "fail"
                    }
                })
            }
        } else {
            throw err;
        }
    });
})
router.delete("/notice/:id", (req, res) => {
    let id = req.params.id;
    con.query("DELETE FROM notices WHERE id=?", id, (err, data) => {
        if (!err) {
            if (data.affectedRows === 1) {
                res.send("ok");
            } else {
                res.send("err")
            }
        }
    })
});
router.get("/notice/:id", (req, res) => {
    let {id} = req.params;
    con.query("SELECT * FROM notices  WHERE id=?", id, (err, data) => {
        if (!err) {
            res.send({
                data: data[0]
            })
        }
    })
});
router.put("/notice", (req, res) => {
    let {id, content, sort, date} = req.body;
    con.query("UPDATE notices SET content=?,sort=?,date=? WHERE id=?", [content, sort, date, id], (err, data) => {
        if (!err) {
            if(data.affectedRows===1){
                res.send("ok")
            }else{
                res.send("fail");
            }
        } else {
            throw err
        }
    })
})

//用户管理
router.get("/users", (req, res) => {
    let p = req.query.p - 1;
    con.query(`SELECT * FROM users LIMIT ${p * 5},5;SELECT COUNT(*)  AS total FROM users`, (err, data) => {
        if (!err) {
            res.send({
                data: data[0],
                total: data[1][0].total
            })
        } else {
            throw err;
        }
    })
});
router.get("/users/:id",(req,res)=>{
    let {id} = req.params;
    con.query("SELECT * FROM users  WHERE uid=?", id, (err, data) => {
        if (!err) {
            res.send({
                data: data[0]
            })
        }
    })
})



module.exports = router;