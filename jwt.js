const fs = require("fs")   // zaii arn ao key t u naii file
const path = require("path")
const jwt = require("jsonwebtoken")

var privateKey = fs.readFileSync(path.join(__dirname+"/key/private.key"), "utf-8") // private zaii naii karn sign khr moun 
var publicKey = fs.readFileSync(path.join(__dirname+"/key/public.key"), "utf-8") // public zaii naii karn thrd la hud

module.exports = {
    sign: (payload) => {
        var signOption = {
            expiresIn: "24h",
            algorithm: "RS256"
        }
        return jwt.sign(payload, privateKey, signOption)
    }

}