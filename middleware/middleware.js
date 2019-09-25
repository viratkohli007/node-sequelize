const jwt = require('jsonwebtoken')
const secret_key = "HAR_HAR_MAHADEV"

exports.generateToken = async function(req, res, next) {
    if (!req.headers.token){        
        let payload = req.body
        console.log(payload)        
        let token = await jwt.sign(payload, secret_key);
        req.token = token
        console.log("headers",req.headers)
    }
    next()
}

exports.checkRoute = function(req, res, next){
    let url = req.url
    urlArr = url.split("/")
    if (urlArr[1] == "api" ){
        let token = req.headers.token
        if (token){
            next()
        } else {
            res.send({
                msg : "You are not logged in."
            })
        }
    } else {
        next()
    }
}