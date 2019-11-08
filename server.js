const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
var cors = require('cors');


var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
} 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
 
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));

var sess; 

var pool = require('./connection');


router.get('/',(req,res) => {
    sess = req.session;
    console.log(sess);
    if(sess.email) {
        return res.redirect('/admin');
    }
    res.status(200).end();
});

router.get('/landing',function(req,res){
    console.log('landing');
    res.sendFile('views/landing.html');
  });


router.post('/login' , cors(corsOptions) , (req,res) => {
     
    pool.getConnection(function (err, connection) { 
        var email = req.body.email;
        var password = req.body.pass;
       
        var conQuery = 'select * from users where email = ?  && password = ?';
        console.log(conQuery);
        connection.query(conQuery, email, password , (err, rows) => {
            connection.release();
            if (err) throw err;
            if(!rows.length){
                res.status(401).send({});
            }else{
                res.status(200).send({ user: rows });   
            }
            
        });
    });  
});

router.get('/users' , cors(corsOptions) , (req,res) => {
     
    pool.getConnection(function (err, connection) { 
        var conQuery = 'select * from users';
        connection.query(conQuery , (err, rows) => {
            connection.release();
            if (err) throw err;
            if(!rows.length){
                res.status(401).send({});
            }else{
                res.status(200).send({ user: rows });   
            }
            
        });
    });  
});



  


router.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});

app.use('/', router);

app.listen(process.env.PORT || 3001,() => {
    console.log(`App Started on PORT ${process.env.PORT || 3001}`);
});