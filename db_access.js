var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/adk_db";


class DBAccess{

    createConnection(){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            console.log("Database created!");
            db.close();
        });    
    }


    createCollection(){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("adk_db");
            dbo.createCollection("customers", function(err, res) {
                if (err) throw err;
                console.log("Collection created!");
                db.close();
            });
        });
    }

    insertNewCustomer(obj){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("adk_db");
            dbo.collection("customers").insertOne(obj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    }

      findCustomer(obj,callback){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("adk_db");
            var query = {age : {$gt : obj}};
            dbo.collection("customers").find(query).toArray(function(err, res) {
                if (err) throw err;
                callback(res);
                console.log("document identified");
                db.close();
                
            });
        });
    }
}

module.exports = DBAccess;
