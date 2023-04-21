const express = require("express")
const router = express.Router()

router.post("/login", function (req, res) {
    res.send("Hello Login v1")
})

module.exports = router;