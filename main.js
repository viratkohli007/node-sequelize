// const Sequelize = require('sequelize');
const express = require('express')
const port = 8080
const router = express.Router();

var conn = require("./dbconn.js")
const controller = require("./controller/controller.js")
var app = express()
conn.connection()

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", router)

router.post("/register", controller.register)
router.post("/login", controller.login)
router.get("/getuserdata/:id", controller.getUserData)
router.get("/removeuser/:id", controller.removeUser)
router.post("/updateuser/:id" ,controller.updateUser)


app.listen(port, () => {
    console.log('server is listining on port '+port)
})
