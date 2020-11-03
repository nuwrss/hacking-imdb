const http = require("http");
const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 4000;


http.createServer(router).listen(port, hostname, () => {
  console.log(`Server running at port http://${hostname}:${port}`);
});

function router(request, response) {
    const url = request.url;
    const method = request.method;

    if (method === "GET" && url ==="/"){
        

           const  arr = getNames(url.body)

           response.end(arr)

            
        
    }else{

    }
    
  }


  function getNames(body){

    
     read body from reqyuest 

     filter ----

     return arr ;

  }


var moviesName = [];
reqad file Data.txt




 