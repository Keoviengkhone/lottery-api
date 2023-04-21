const express = require("express")
const router = express.Router()

router.post("/register", function (req, res) {
    res.send("Hello Resgister v1")
})

module.exports = router;