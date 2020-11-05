

function searchHandler(req,res,arrayMovie){
    readBody(req,res,arrayMovie);
}



// reading the value of the name movie from the request

function readBody(request, response,arrayMovie) {

    const body = request.url.split("?")[1];
    const data = new URLSearchParams(body);
    const name = data.get("name");
  
    console.log("the name :" + name);
    let jsonStr = JSON.stringify(movieNames(name,arrayMovie).slice(0, 6));
    response.writeHead(200, { "content-type": "application/json" });
    response.end(jsonStr);
  
  }

  // return the movies names that starts with the text 
function movieNames(text,arrayMovie) {
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

  module.exports = searchHandler;