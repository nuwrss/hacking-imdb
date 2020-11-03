const fs = require("fs");
const path = require("path");

const readline = require("line-reader");
let arrayMovie = [];

const filepath = path.join(__dirname, "data.txt");

const lineReader = require("line-reader");

function readFromData() {
  // read contents of the file
  const data = fs.readFileSync(filepath, "UTF-8");

  // split the contents by new line
  const lines = data.split(/\r?\n/);

  // print all lines
  lines.forEach((line) => {
    arrayMovie.push(line);
  });
}

readFromData();

function router(req, res) {
  const url = req.url;

  if (url === "/" && req.method === "GET") {
    readBody(req, res);
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>Not found!</h1>");
  }
}

function readBody(request, response) {
  let bodyBuilder = "";
  // callback runs every time the stream has the next bit of data
  request.on("data", (chunk) => {
    bodyBuilder += chunk;
  });
  // callback runs when request finishes and we have all the data

  request.on("end", () => {
    let jsonStr = JSON.stringify(movieNames(bodyBuilder));
    response.writeHead(200, { "content-type": "application/json" });
    response.end(jsonStr);
  });
}

function movieNames(text) {
  if (text.length === 0) {
    return [];
  }
  const arr = arrayMovie.filter((movie) => {
    return movie.toUpperCase().startsWith(text.toUpperCase());
  });
  return arr;
}

module.exports = router;
