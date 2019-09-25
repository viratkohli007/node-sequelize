// var conn = require("../dbconn.js")
const Sequelize = require('sequelize');
const User  = require('../model/model.js')
const Op = Sequelize.Op;
const secret_key = "HAR_HAR_MAHADEV"
const jwt = require('jsonwebtoken')

exports.register = async function (req, res) {
    try{
        let { firstname, lastname, email, password } = req.body
        console.log(firstname, lastname, email, password)
        const user = await User.User.findAll({
            where : {
                email : email
            }
        })
        console.log("user", user)
        if (user.length !== 0){
            console.log("User already exists with this email : ", email)
            res.send({
                msg : "already user exists with this email"
            })
            return;
        } else{
            const payload = {
                firstname,
                lastname,
                email,
                password
            }
            User.User.sync({ force: false }).then(() => {
                // Now the `users` table in the database corresponds to the model definition
                return User.User.create(payload);
            });
            console.log("created new user")
            res.send({
                msg : "user created successfully"
            })
        }
    } catch (err){
        console.log("error -->", err)
    }
}

exports.login = async function(req, res){    
    if (!req.headers.token){
        try{
            let {email, password} = req.body
            
            user = await User.User.findAll({
                where :{
                    [Op.and] : [{email : email, password : password}]
                }
            })
            
            if (user.length != 0){
                console.log("This is user",user)
                console.log("You are logged in...")
                console.log("token is -->", req.token)
                res.send({
                    // msg : "Logged In successfully",
                    token : req.token
                })
            } else{
                console.log("Email or password not matching")
                res.send({
                    msg : "Email or password not matching"
                })
            }
            
        }catch(err){
            console.log("login err", err)
        }
    } else {
        var decoded = jwt.verify(req.headers.token, secret_key);
        user = await User.User.findAll({
            where :{
                [Op.and] : [{email : decoded.email, password : decoded.password}]
            }
        })
        if (user.length !== 0){
            res.send({
                msg : "You are successfully logged in."
            })
        }
    }
    
}

exports.getUserData = async function(req, res){
    try{
        let id = req.params.id
        console.log("id--->", id)
        user = await User.User.findAll({
            where :{
                id : id
            }
        })
    console.log("user-->",user[0].dataValues)
    res.send(user[0].dataValues)
    }catch(err){
        console.log("error in getting all data", err)
    }
}

exports.removeUser = async function(req, res){
    try{
        let id = req.params.id
        console.log("id--->", id)
        user = await User.User.destroy({
            where :{
                id : id
            }
        })
    res.send({
        msg : "data deleted"
    })
    }catch(err){
        console.log("error in deleting all data", err)
    }
}

exports.updateUser = async function(req, res){
    try{
        let id = req.params.id
        let {firstname, lastname, email, password} = req.body
        let user = await User.User.update({
            firstname: firstname,
            lastname : lastname,
            email : email,
            password : password
        }, {
            where: {
              id: id
            }
          });
        if (user.length == 1){
            console.log("successfully updated")
            res.send({
                msg : "successfully updated"
            })
        }
    } catch(err) {
        console.log("error in updating", err)
    }
}