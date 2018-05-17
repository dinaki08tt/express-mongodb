const DBAccess = require('./db_access.js');
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var dbConnection = new DBAccess();
app.use(bodyParser.json());

app.get('/home',function(req,res){
    dbConnection.createConnection();
    dbConnection.createCollection();
    res.sendfile("home.html");
});

app.post('/submit',function(req,res){
    console.log(req.body);
    try{
        dbConnection.insertNewCustomer(req.body);
    }catch(err){
        console.log(err);    
    }
    response = {
        msg:'inserted successfully'
    };
    
    res.send(JSON.stringify(response));
});


app.post('/age',function(req,res){
    console.log(req.body.age);
    try{
        dbConnection.findCustomer(req.body.age,function(obj){
            res.send(JSON.stringify(obj));
        });
    }catch(err){
        console.log(err);
        res.send({msg:'errorOccured'});
    }
    
});


app.listen(9091);