const requestApi = require('request');



function getMovieDetailsHandler(req, res) {
    readBody(req, res);
}



// reading the value of the name movie from the request

function readBody(request, response) {

    const body = request.url.split("?")[1];
    const data = new URLSearchParams(body);
    const name = data.get("name");

    (getMovieDetails(name, request, response));



}


function getMovieDetails(name, req, response) {


    // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false


    requestApi(`https://api.themoviedb.org/3/search/movie?query=${name}&api_key=aa48f2eff7284b7fe6bb91871f64f80d&language=en-US`, function (err, res, body) {

        response.writeHead(200, { "content-type": "application/json" });
        response.end(body);

    });

}

module.exports = getMovieDetailsHandler;