const http = require('http');
const host = '127.0.0.1';
const port = 8000;
const cors = require('cors')
const express = require('express');
const app = express();
const imageToBase64 = require('image-to-base64');
app.use(cors());


// const requestListener = function (req,res) {
//     const sqlite3 = require('sqlite3').verbose();
//     //Opens a database in memory
//     let db = new sqlite3.Database('C:\\Users\\JackB\\Desktop\\QU2122-Fall\\CSC-375\\SQLite\\GameDatabase.db', (error) => {// could potentially change the long sequence to __dirname
//         if(error){
//             return console.log(error.message);
//         }
//         console.log('Connection Successful');
//     });

//     let sql = 'SELECT * FROM Photos';
//     db.all(sql,[], (err, rows) => {
//         if(err) {
//             throw err;
//         }
//         rows.forEach((row) => {
//             let buff = new Buffer(row.PhotoFilePath);
//             let base64 = buff.toString('base64');
//             res.end(row.PhotoID + " " + base64);
//         })
//     });

//     //closes the database
// // db.close((error) => {
// //     if(error){
// //         console.log(error.message);
// //     }
// //     console.log('Database Closed');
// // });

// res.writeHead(200);
// };
// const server = http.createServer(requestListener);
// server.listen(port,host, () => {
// console.log(`Server is running on http://${host}:${port}`);
// });

function streamToString (stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    })
  }

app.get('/', function(req,res) {
    
    const sqlite3 = require('sqlite3').verbose();
    //Opens a database in memory
    let db = new sqlite3.Database('C:\\Users\\JackB\\Desktop\\QU2122-Fall\\CSC-375\\SQLite\\GameDatabase.db', (error) => {// could potentially change the long sequence to __dirname
        if(error){
         console.log(error.message);
        }
        console.log('Connection Successful');
    });

    let sql = 'SELECT * FROM Photos';
    db.all(sql,[], (err, rows) => {
        if(err) {
            throw err;
        }
        imageToBase64(rows[0].PhotoFilePath)
            .then(response => {
                res.send(response);
                
            })

            .catch(error => {
                console.log(error);
            })
        // let buff = new Buffer(row.PhotoFilePath);
        // let base64 = buff.toString('base64');
        // res.send(base64);
            
    });

    //closes the database
db.close((error) => {
    if(error){
        console.log(error.message);
    }
    console.log('Database Closed');
});
    
})

const server = app.listen(8081, function (){
    const host = server.address().address;
    const port = server.address().port;
    console.log("http://%s:%s",host,port);
});

