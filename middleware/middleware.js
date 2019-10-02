const jwt = require('jsonwebtoken')
// const Sequelize = require('sequelize');
const User = require("../model/model.js")
exports.verifyToken = async function(req, res, next) {

        try{
            var decodedPayload = jwt.verify(req.headers.token, process.env.SECRET_KEY)
        } catch(err) {
            console.log('error in decoding token')
            res.send({
                msg : "this user is not in database"
            })
            return;
        }
        req.body.email = decodedPayload.email
        const user = await User.User.findOne({
            where : {
                email : decodedPayload.email
            }
        })
        if (user.length != 0){
            next()
        } else {
            res.send({
                msg : "this user is not in database"
            })
        }
}