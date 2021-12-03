const { Console } = require('console');
const express = require('express');
const app = express();

//db.all returns all rows
//db.get returns only 1 row
//db.run() allows you to create,insert,delete test

app.get('/', function (req, res) {

    const sqlite3 = require('sqlite3').verbose();
    //Opens a database in memory
    let db = new sqlite3.Database('C:\\Users\\JackB\\Desktop\\QU2122-Fall\\CSC-375\\SQLite\\GameDatabase.db', (error) => {// could potentially change the long sequence to __dirname
        if(error){
            return console.log(error.message);
        }
        console.log('Connection Successful');
    });

    let sql = 'SELECT * FROM Photos';
    db.all(sql,[], (err, rows) => {
        if(err) {
            throw err;
        }
        rows.forEach((row) => {
            res.send(row.PhotoID + " " + row.PhotoFilePath);
        })
    });

    //closes the database
db.close((error) => {
    if(error){
        console.log(error.message);
    }
    console.log('Database Closed');
});

 })
 
 const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log(host);
    console.log(port);
    console.log("Example app listening at http://%s%s", host, port);
 })

/*
db.run(`INSERT INTO Photos(photoID) VALUES(?)`, [6] ,function(error) {
    if(error) {
        console.log(error.message);
    }
    console.log(this.lastID);
});
*/
