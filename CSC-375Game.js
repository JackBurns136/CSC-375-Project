const host = '127.0.0.1';
const port = 8000;
const cors = require('cors')
const express = require('express');
const app = express();
const imageToBase64 = require('image-to-base64');
const sqlite3 = require('sqlite3').verbose();
app.use(cors());


app.get('/', function(req,res) {
    
    //Opens a database in memory
    let db = new sqlite3.Database('C:\\Users\\JackB\\Desktop\\QU2122-Fall\\CSC-375\\JavaScriptProjects\\SQLite\\GameDatabase.db', (error) => {// could potentially change the long sequence to __dirname
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
        
         //Fills an array with the images, have to update the if statement to the size of the database
        let celebList = [];
        for(let i = 0; i < 13; i++){
            console.log(celebList[i] = rows[i].PhotoFilePath);
        };
        
        //Random number genetated then sent to the front end as Base64
        let rand = Math.floor(Math.random() * 13)
        console.log(rows[rand].CelebrityName)
        imageToBase64(celebList[rand])
            .then(response => {
                res.send(JSON.stringify({body: response}));
            })
            .catch(error => {
                console.log(error);
            })
    });
    
    //closes the database
    db.close((error) => {
        if(error){
        console.log(error.message);
        }
     console.log('Database Closed');
    })
    
})

app.post('/checkAnswer', function (req,res) {

    let db2 = new sqlite3.Database('C:\\Users\\JackB\\Desktop\\QU2122-Fall\\CSC-375\\SQLite\\GameDatabase.db', (error) => {
        if(error){
         console.log(error.message);
        }
        console.log('Connection Successful');
    });
    
    const body = req.body
    const imageName = body.imageName // correct answer from the database
    const answer = body.answer //answer user inputted
    let sqlAnswer = 'SELECT * FROM Photos';
    console.log(body);
    console.log(imageName);
    console.log(answer);
    console.log(sqlAnswer);

    db2.all(sqlAnswer, [], (err, rows) => {
        if(err) {
            throw err;
        }
        for(let i = 0; i < 13; i++) {
            if(answer === imageName) {
                res.send("Correct");
            } else {
                res.send("Incorrect");
            }
        }
    })

    db2.close((error) => {
        if(error){
        console.log(error.message);
        }
     console.log('Database Closed');
    })
})

const server = app.listen(8081, function (){
    const host = server.address().address;
    const port = server.address().port;
    console.log("http://%s:%s",host,port);
});

