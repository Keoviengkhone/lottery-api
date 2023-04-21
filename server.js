const express = require("express")
const app = express();
const cors = require("cors")
const expressSanitizer = require("express-sanitizer")

// CORS cross origin resource sharing
var corsOptions = {
    origin: "*", //["http://keooudone.com","http://keooudone2.com"],
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Limit size body
app.use(express.json({limit: '1kb'}))
app.use(express.urlencoded({limit: '1kb', extended: true}))

app.use(function(err, req, res, next){
    if(err.type == 'entity.too.large'){
        res.status(413).json({message: "Body size is large!!!"})
        return;
    }
})

app.use('/api/v1', require('./api/v1/api'))

const server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Running on http://localhost", host, port)
})
