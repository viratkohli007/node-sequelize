// const Sequelize = require('sequelize');
const express = require('express')
const port = 8080
const router = express.Router();

const conn = require("./dbconn.js")
const controller = require("./controller/controller.js")
const mdw = require("./middleware/middleware.js")

var app = express()
conn.connection()

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", router)

router.post("/register", mdw.checkRoute, controller.register)
router.post("/login", mdw.checkRoute, mdw.generateToken, controller.login)
router.get("/api/getuserdata/:id", mdw.checkRoute, controller.getUserData)
router.get("/api/removeuser/:id", mdw.checkRoute, controller.removeUser)
router.post("/api/updateuser/:id" , mdw.checkRoute, controller.updateUser)


app.listen(port, () => {
    console.log('server is listining on port '+port)
})
