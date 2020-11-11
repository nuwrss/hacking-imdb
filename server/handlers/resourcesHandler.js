const fs = require("fs");
const path = require("path");

function resourcesHandler(req, res) {


  const types = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    jpeg: "image/jpeg",
    png: "image/png",
    jpg: "image/jpg",
    ico: "image/x-icon",
    gif: "image/gif"
  };



  const url = req.url;
  const urlArray = url.split(".");
  const extensions = urlArray[1];
  const type = types[extensions];
  const filePath = path.join(__dirname, "..", "..", url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      res.writeHead(404, { "content-type": "text/html" });
      res.end("<h1>Not found!</h1>");
    } else {

      res.writeHead(200, { "content-type": type });
      res.end(file);
    }
  })

}

module.exports = resourcesHandler;
