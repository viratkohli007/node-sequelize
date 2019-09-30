const jwt = require('jsonwebtoken')
const secret_key = "HAR_HAR_MAHADEV"
// const Sequelize = require('sequelize');
const User = require("../model/model.js")
exports.verifyToken = async function(req, res, next) {
    if (!req.headers.token) {
        res.send({
            msg : "token is not there"
        })
    } else {
        var decodedPayload = jwt.verify(req.headers.token, secret_key)
        const user = await User.User.findAll({
            where : {
                email : decodedPayload.email
            }
        })
        console.log("user--->", user)
        if (user.length != 0){
            next()
        } else {
            res.send({
                msg : "this user is not in database"
            })
        }
    }
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