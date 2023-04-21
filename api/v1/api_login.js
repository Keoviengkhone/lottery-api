const express = require("express")
const router = express.Router()
const db = require("../../db")

router.post("/login", function (req, res) {

    db.query("SELECT * FROM tbl_users", function(err, rs){
        if (err) throw err
        console.log("connect successfuly!!")
        res.send("connect success!!")
    })
    // const email = req.sanitize(req.body.email)
    // res.send(email)
})

module.exports = router;