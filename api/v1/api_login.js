const express = require("express")
const router = express.Router()
const db = require("../../db")
const bcrypt = require("bcrypt")
const jwt = require("../../jwt")
const moment = require("moment")

router.post("/login", function (req, res) {

    // db.query("SELECT * FROM tbl_users", function(err, rs){
    //     if (err) throw err
    //     console.log("connect successfuly!!")
    //     res.send("connect success!!")
    // })
    // const email = req.sanitize(req.body.email)
    // res.send(email)

    const username = req.sanitize(req.body.username)
    const password = req.sanitize(req.body.password)

    let sql = "SELECT uuid,user_username,user_password FROM tbl_users WHERE user_username = ? LIMIT 1"
    db.query(sql, [username], function (err,rs) {
        if (err) throw err

        if(rs.length>0) {
            let isSuccess = bcrypt.compareSync(password, rs[0].user_password)
            if(isSuccess == true){

                var payload = {
                    uuid: rs[0].uuid,
                    username: username,
                    created_at: moment().format("YYYY-MM-DD H:m:s")
                }

                const token = jwt.sign(payload)

                res.json({status: "success", message: "login success", token: token})
            }
            else{
                res.json({status: "error", message: "Email or password invalid"})
            }
        }else {
            res.json({status: "error", message: "Email or password invalid"})
        }
    })
    
})

module.exports = router;