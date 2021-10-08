const mysql =require("mysql");
const express = require("express");
const app = express();
const path =require('path');
// const fileUpload = require('express-fileupload');
//const covied
const router = express.Router();
const dotenv =require("dotenv");
const cookieParser = require('cookie-parser');
// const session = require('express-session')

dotenv.config({path:'./.env'});
app.set('view engine','hbs');
const pathDirectory = path.join(__dirname,'./public');
console.log(__dirname);
app.use(express.static(pathDirectory));
app.use(express.urlencoded({extended:false}));
// app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
// app.use(session({
//     key:'user_id',
//     secret: 'max',
//     resave: false,
//     saveUninitialized: false,
//     cookie:{
//         express:60000
//     }
// }));




//database connection start here 
const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
    // database:'nodejs-login'
});
db.connect(function(err) {
    if(err) throw err;
    console.log('Mysql Connected!');
});

    // define Router
    app.use('/', require('./routes/pages'));
    app.use('/auth', require('./routes/auth'));
  

app.listen(8080,  ()=> {
    console.log("Server is running on the port 8080......");
})



//nodemailer

var nodemailer = require('nodemailer');
const { getMaxListeners } = require("process");

var transport = nodemailer.createTransport(
{
    service: 'gmail',
    auth:{
        user:'hy90650@gmail.com',
        pass:'#Himan123'
    }
}
)

// send ot mail

var mailOptions = {
    from:'hy90650@gmail.com',
    to:'himan9714@gmail.com',
    subject:'Registration mail',
    text:'Thank you for registering the Sky login Page',
}

transport.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error)
    }else{
        console.log("Email sent" + info.response)
    }
})


