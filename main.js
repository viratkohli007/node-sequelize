// require("@babel/register")
import * as validator from './controller/validator';
import validate from 'express-validation';
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const port = 8080
dotenv.config();
const router = express.Router();

const conn = require("./dbconn.js")
const controller = require("./controller/controller.js")
const mdw = require("./middleware/middleware.js")

var app = express()
conn.connection()

var bodyParser = require('body-parser')
// Enabled all the cors request
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", router)

router.post("/register", validate(validator.register), controller.register)
router.post("/login", controller.login)
router.get("/api/getuserdata/:id", mdw.verifyToken, controller.getUserData)
router.get("/api/removeuser/:id", mdw.verifyToken, controller.removeUser)
router.post("/api/updateuser/:id" , mdw.verifyToken, controller.updateUser)
router.get("/api/getmydata" , mdw.verifyToken, controller.getMyData)


app.listen(port, () => {
    console.log('server is listining on port '+port)
})