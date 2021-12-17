const host = '127.0.0.1';
const port = 8000;
const cors = require('cors')
const express = require('express');
const app = express();
const imageToBase64 = require('image-to-base64');
const sqlite3 = require('sqlite3').verbose();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

//Sends the image to the front end in Base64
app.get('/', function(req,res) {
    
    //Opens a database in memory
    let db = new sqlite3.Database('SQLite\\GameDatabase.db', (error) => {// could potentially change the long sequence to __dirname
        if(error){
         console.log(error.message);
        }
        console.log('Connection Successful');
    });
    //runs this SQL statement to get all the information from the database
    let sql = 'SELECT * FROM Photos';
    db.all(sql,[], (err, rows) => {
        if(err) {
            throw err;
        }
        
         //Fills an array with the images, have to update the if statement to the size of the database
        let celebList = [];
        for(let i = 0; i < 13; i++){
            celebList[i] = rows[i].PhotoFilePath;
        };
        
        //Random number genetated then sent to the front end as Base64
        let rand = Math.floor(Math.random() * 13)
        //console.log(rows[rand].CelebrityName)
        imageToBase64(celebList[rand])
            .then(response => {
                res.send(JSON.stringify({body: response, id: rows[rand].PhotoID}));
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

//Gets the user's input back and checks if they inputted the correct answer
app.post('/checkAnswer', function (req,res) {

    let db2 = new sqlite3.Database('SQLite\\GameDatabase.db', (error) => {
        if(error){
         console.log(error.message);
        }
        console.log('Connection Successful');
    });
    
    const body = req.body;
    const photoID = body.PhotoID // correct answer from the database
    const answer = body.answer //answer user inputted
    let sqlAnswer = 'SELECT CelebrityName FROM Photos WHERE PhotoID = ?';

    db2.all(sqlAnswer, [photoID], (err, rows) => {
        if(err) {
            throw err;
        }
            if(answer === rows[0].CelebrityName) {
                res.send(JSON.stringify({message: "Correct"}));
            } else {
                res.send(JSON.stringify({message: "Incorrect"}));
            }
        
    })
    //Closes the database
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

