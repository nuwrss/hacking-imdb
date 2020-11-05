const fs = require("fs");
const path = require("path");

function homeHandler(req,res){
    const filePath = path.join(__dirname, "..","..", "index.html");
    fs.readFile(filePath, (err, file) => {
      if (err) {
        res.writeHead(404, { "content-type": "text/html" });
        res.end("<h1>Not found!</h1>");
      } else {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(file);
      }
    })
}

module.exports = homeHandler;