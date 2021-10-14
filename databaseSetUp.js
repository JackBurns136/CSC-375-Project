const { Console } = require('console');

const sqlite3 = require('sqlite3').verbose();
//Opens a database in memory
let db = new sqlite3.Database('C:\\Users\\JackB\\Desktop\\QU2122-Fall\\CSC-375\\SQLite\\GameDatabase.db', (error) => {
    if(error){
        return console.log(error.message);
    }
    console.log('Connection Successful');
});
/*
db.run(`INSERT INTO Photos(photoID) VALUES(?)`, [6],function(error) {
    if(error) {
        console.log(error.message);
    }
    console.log(this.lastID);
});
*/
db.run(`DELETE FROM Photos WHERE rowid=?`,[3]);

//closes the database
db.close((error) => {
    if(error){
        console.log(error.message);
    }
    console.log('Database Closed');
});