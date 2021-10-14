//function printToSite(){
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end("Does this still work?");
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http:${hostname}:${port}`);
});
//}
;

//module.exports.printToSite = printToSite;
//console.log(printToSite);