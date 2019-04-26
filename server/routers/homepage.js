const express = require("express");
const path = require("path");
const router = express.Router();
const con = require("../sql.js");

router.get("/notices",(req,res)=>{
    con.query(`SELECT * FROM notices  LIMIT 0,4 ;SELECT COUNT(*) AS company FROM works;SELECT COUNT(*) AS videos FROM videos;SELECT COUNT(*) AS users FROM users`,(err, data) => {
        if (!err) {
            res.send({
                data:data,
                total:data[1].concat(data[2],data[3])
            })

        } else {
            throw err;
        }
    })
});

router.get("/works",(req,res)=>{
    let {type,p}=req.query;
    if(type==="UI"||type==="WEB"){
    con.query(`SELECT *,nickName FROM works,users WHERE author=uid&&type=? LIMIT 0,4;SELECT COUNT(*) AS pages FROM works;`,type,(err, data) => {
        if (!err) {
            res.send({
                data:data,

            })

        } else {
            throw err;
        }
    })
    }else{
        con.query(`SELECT *,nickName FROM works,users WHERE author=uid LIMIT 0,4;SELECT COUNT(*) AS pages FROM works;`,(err, data) => {
            if (!err) {
                res.send({
                    data:data,
                })

            } else {
                throw err;
            }
        })
    }

})


module.exports = router;