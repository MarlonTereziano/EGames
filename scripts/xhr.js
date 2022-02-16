var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  //if (xhr.readyState == 4 && xhr.status == 200) {
    if (xhr.readyState == 4) {
    // do something with the response
    //var response = JSON.parse(xhr.responseText);
    console.log(xhr);
  }
}

xhr.open("GET", "http://localhost:3000/contato");
xhr.send();