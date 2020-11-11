

var mainImg = document.getElementById('movieImg');

function autocomplete(inp) {
  var currentFocus;
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    getMovieName(val, (arr) => {


      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/


        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {

          inp.value = this.getElementsByTagName("input")[0].value;

          closeAllLists();
        });
        a.appendChild(b);

      }
    });
  });


  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }



  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }


  function closeAllLists(elmnt) {

    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}


autocomplete(document.getElementById("myInput"));

function getMovieName(input, cb) {
  fetch("/search?name=" + input)
    .then(response => response.json())
    .then(
      data => {

        console.log(data)
        cb(data)
      }

    );
}



function shoMovieName(e) {
  e.preventDefault();

  mainImg.src = "/src/img/progress.gif"


  let val = document.getElementById("myInput").value;
  fetch("/get?name=" + val)
    .then(response => response.json())
    .then(
      data => {

        const result = data.results.filter(mov =>
          mov.title.toUpperCase() === val.toUpperCase()
        );

        if (result.length === 0) {
          mainImg.src = "/src/img/notav.png"
        } else {
          mainImg.src = "https://image.tmdb.org/t/p/w500/" + result[0].backdrop_path;
        }


      }

    );




  return false;
}