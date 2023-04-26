const express = require("express")
const router = express.Router()
const multer = require("multer")
const { v4: uuidv4 } = require('uuid');
const path = require("path")
const db = require("../../db")
const moment = require("moment")
const bcrypt = require('bcrypt')

router.post("/register", function (req, res) {
    // res.send("Hello Resgister v1")


    let myfilename = ""; // paeng zue file
    const Storage = multer.diskStorage({
        destination: function(req, file, cb){ // destination path of folder
            cb(null, './upload')
        },
        filename: function(req, file, cb){ // name file for picture
            myfilename = uuidv4() + path.extname(file.originalname)
            cb(null, myfilename)
        }
    })

    const upload = multer({storage: Storage, limits: {fileSize: 10485760}}).single("myPicture") 
    upload(req, res, function (err){
        if(err instanceof multer.MulterError){ //check error of multer
            if(err.code == "LIMIT_FILE_SIZE"){
                res.status(400).json({message: "file is large than 10mb"})
            }
        } else if(err){
            res.status(400).json({message: "Upload is error"})
        }

        // res.json({message: "Upload picture is success"})

        const uuid = uuidv4()
        const cust_name = req.sanitize(req.body.cust_name)
        const cust_surname = req.sanitize(req.body.cust_surname)
        const address = req.sanitize(req.body.address)
        const cust_tel = req.sanitize(req.body.cust_tel)
        const gender = req.sanitize(req.body.gender)
        const personal_id = req.sanitize(req.body.personal_id)
        const cust_img = myfilename
        const user_username = req.sanitize(req.body.user_username)
        const user_password = bcrypt.hashSync(req.body.user_password, 10) //req.sanitize(req.body.user_password)
        const user_fname = req.sanitize(req.body.user_fname)
        const created_at = moment().format("YYYY-MM-DD H:m:s")

        let sql1 = "INSERT INTO tbl_customer (uuid,cust_name,cust_surname,address,cust_tel,gender,personal_id,cust_img,created_at) VALUES ?"
        let values1 = [[
            uuid,
            cust_name,
            cust_surname,
            address,
            cust_tel,
            gender,
            personal_id,
            cust_img,
            created_at
        ]]
        let sql2 = "INSERT INTO tbl_users (uuid,user_username,user_password,user_fname,created_at) VALUES ?"
        let values2 = [[
            uuid,
            user_username,
            user_password,
            user_fname,
            created_at
        ]]

        db.query(sql1, [values1], function(err, rs){
            if(err) throw err;
            db.query(sql2, [values2])
            res.json({status: "success", message: "insert data success"})
        })

    })
})

module.exports = router;