const express = require("express")
const router = express.Router()

router.post("/customer", function (req, res) {
    res.send("Hello Customer v1")
})

module.exports = router;