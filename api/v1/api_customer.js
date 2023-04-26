const express = require("express")
const router = express.Router()
const db = require("../../db")

const multer = require("multer")
const { v4: uuidv4 } = require('uuid')
const path = require("path")
const moment = require("moment")
const bcrypt = require("bcrypt")
const { resolve } = require("path")
const { rejects } = require("assert")

router.post("/customer", function (req, res) {
    res.send("Hello Customer v1")
})

router.get("/customer/list", async function (req, res) {
    let data = []
    data = await getdata();
    
    res.json({
        customer: data
    })
})

router.post("/customer/delete", function (req, res){
    const uuid = req.sanitize(req.body.uuid)
    let sql = "DELETE FROM tbl_customer WHERE uuid = ?"
    db.query(sql, [uuid], function(err, rs){
        if (err) throw err
        res.json({status: "success", message: "Delete success"})
    })
})

router.get("/customer/:uuid",async function(req,res){
    const uuid = req.sanitize(req.params.uuid)
    console.log(uuid)

    let sql = "SELECT uuid,cust_name,cust_surname,address,cust_tel,gender,personal_id,cust_img,created_at FROM tbl_customer WHERE uuid = ?"
    db.query(sql, [uuid], function(err, rs){
        if (err) throw err

        if (rs.length > 0) {
            res.json(rs[0])
        }else {
            res.status(404).json({status: "error", message: "Not Found"})
        }
    })
    // let data = []
    // data = await getuuid();
    // res.json({
    //     customer_uuid: data
    // })

})

function getdata() {
    return new Promise((resolve, rejects) => {
        let sql = "SELECT uuid,cust_name,cust_surname,address,cust_tel,gender,personal_id,cust_img,created_at FROM tbl_customer"
        db.query(sql, function(err, rs) {
            if (err){
                rejects("Error")
            }
            resolve(rs)
        })
    })
}

module.exports = router;