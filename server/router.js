const fs = require("fs");
const path = require("path");
const readline = require("line-reader");
let arrayMovie = [];


// read the data from the file data.txt
function readFromData() {
  const filepath = path.join(__dirname, "data.txt");
  const data = fs.readFileSync(filepath, "UTF-8");
  const lines = data.split(/\r?\n/);
  lines.forEach((line) => {
    arrayMovie.push(line);
  });
}

readFromData();

function router(req, res) {
  const url = req.url;
  if (url === "/") {
    const filePath = path.join(__dirname, "..", "index.html");
    fs.readFile(filePath, (err, file) => {
      if (err) {
        res.writeHead(404, { "content-type": "text/html" });
        res.end("<h1>Not found!</h1>");
      } else {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(file);
      }
    })

  } else {
    if (req.method === "GET" && url.includes("/search")) {
      readBody(req, res);
    } else {
      if (url.includes("src")) {
        filesHandlerIndex(req, res);
      } else {
        res.writeHead(404, { "content-type": "text/html" });
        res.end("<h1>Not found!</h1>");
      }
    }
  }
}


// return the resources files 
function filesHandlerIndex(req, res) {


  const types = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    jpeg: "image/jpeg",
    png: "image/png",
    jpg: "image/jpg",
    ico: "image/x-icon"
  };

  const url = req.url;
  const urlArray = url.split(".");
  const extensions = urlArray[1];
  const type = types[extensions];
  const filePath = path.join(__dirname, "..", url);
  console.log(filePath);
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

// reading the value of the name movie from the request

function readBody(request, response) {

  const body = request.url.split("?")[1];
  const data = new URLSearchParams(body);
  const name = data.get("name");
  let jsonStr = JSON.stringify(movieNames(name));
  response.writeHead(200, { "content-type": "application/json" });
  response.end(jsonStr);

}

// return the movies names that starts with the text 
function movieNames(text) {
  if (text === null) {
    return [];
  }
  if (text.length === 0) {
    return [];
  }
  const arr = arrayMovie.filter((movie) => {
    return movie.toUpperCase().startsWith(text.toUpperCase());
  });
  return arr;
}

module.exports = router;
