const http = require("http");
const hostname = "localhost";
const config = require('./students.json')


const port = process.env.PORT || 4000;


http.createServer(router).listen(port, () => {


  console.log(`Server running at port http://${hostname}:${port}`);
});





function router(req, res) {



  const url = req.url;
  if (url.includes("/search")) {
    const body = req.url.split("?")[1];
    const data = new URLSearchParams(body);
    console.log(body);

    const arr = search(data.get("name"), data.get("id"), data.get("familyName"), data.get("year"));

    res.writeHead(404, { "content-type": "application/json" });
    let jsonStr = JSON.stringify(arr);
    res.end(jsonStr);

  }

}


function search(name, id, familyName, year) {

  const arr = config.filter((student) => {

    var bool = (name === null || student.name.toUpperCase() === name.toUpperCase())
      && (year === null || student.year === year)
      && (familyName === null || student.familyName.toUpperCase() === familyName.toUpperCase())
      && (id === null || student.id === year)


    return bool;

  });

  return arr;
}



