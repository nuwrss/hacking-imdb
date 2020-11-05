const fs = require("fs");
const path = require("path");
const homeHandler = require("./handlers/homeHandler");
const searchHandler = require("./handlers/searchHandler");
const resourcesHandler = require("./handlers/resourcesHandler");
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
    homeHandler(req,res);
   
  } else {
    if (req.method === "GET" && url.includes("/search")) {
      searchHandler(req, res,arrayMovie);
    } else {
      if (url.includes("src")) {
        resourcesHandler(req, res);
      } else {
        res.writeHead(404, { "content-type": "text/html" });
        res.end("<h1>Not found!</h1>");
      }
    }
  }
}



module.exports = router;
