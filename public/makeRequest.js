"strict mode";
// Do a CORS request to get Davis weather hourly forecast

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true); // call its open method
  return xhr;
}

// TESTING
export function renderStartReview() {
  // if (event.keyCode == 13) {
    console.log("DEBUG");
    let url = "startreview";
    console.log(url);
    let xhr = createCORSRequest("GET", url);
    console.log(xhr);
    console.log("NEW DEBUG");
    // checking if browser does CORS
    if (!xhr) {
      alert("CORS not supported");
      return;
    }
    // Load some functions into response handlers.
    xhr.onload = function () {
      let responseStr = xhr.responseText; // get the JSON string
      let object = JSON.parse(responseStr); // turn it into an object
      console.log("Object", object);
      return object;
      // console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted
      // let myWord = JSON.stringify(object.Spanish, undefined, 2);
      // let myTranslation = myWord;
      // document.getElementById("outputGoesHere").innerHTML = myWord;
    };
  // Actually send request to server
    xhr.send();
  // }
}

export function seenIncrementClient(id, isCorrect, seen) {
  //let input = document.getElementById("myWord").value;
  id = id + 1;
  console.log("In Increment Client", id, isCorrect);
  let url = "seen?id="+id;
  let xhr = createCORSRequest("GET", url);

  // checking if browser does CORS
  if (!xhr) {
    alert("CORS not supported");
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
    console.log("It was incremented");
  };

  xhr.onerror = function() {
    alert("Woops, there was an error making the request.");
  };

  // Actually send request to server
  xhr.send();
}

export function correctIncrementClient(id, isCorrect, seen) {
  //let input = document.getElementById("myWord").value;
  console.log("IM IN CORRECT YAY");
  id = id + 1;
  console.log("Correct Client", id, isCorrect);
  let url = "correct?id="+id;
  if(isCorrect == true)
  {
    let xhr = createCORSRequest("GET", url);

    // checking if browser does CORS
    if (!xhr) {
      alert("CORS not supported");
      return;
    }

    // Load some functions into response handlers.
    xhr.onload = function() {
      console.log("Correct was incremented");
    };

    xhr.onerror = function() {
      alert("Woops, there was an error making the request.");
    };

    // Actually send request to server
    xhr.send();
  }
  else
  {
    console.log("DO NOTHING");
  }
  
}

export function renderUserName() {
  // if (event.keyCode == 13) {
    console.log("DEBUG");
    let url = "getusername";
    console.log(url);
    let xhr = createCORSRequest("GET", url);
    console.log(xhr);
    console.log("NEW DEBUG");
    // checking if browser does CORS
    if (!xhr) {
      alert("CORS not supported");
      return;
    }
    // Load some functions into response handlers.
    xhr.onload = function () {
      let responseStr = xhr.responseText; // get the JSON string
      let object = JSON.parse(responseStr); // turn it into an object
      console.log(object);
      return object;
      // console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted
      // let myWord = JSON.stringify(object.Spanish, undefined, 2);
      // let myTranslation = myWord;
      // document.getElementById("outputGoesHere").innerHTML = myWord;
    };
  // Actually send request to server
    xhr.send();
  // }
}

export function renderAdd() {
  if (event.keyCode == 13) {
    let url = "add";
    let xhr = createCORSRequest("GET", url);
    // checking if browser does CORS
    if (!xhr) {
      alert("CORS not supported");
      return;
    }
  }
}

// Make the actual CORS request.
export function makeCorsRequest() {
  if (event.keyCode == 13) {
    let input = document.getElementById("myWord").value;
    let url = "translate?english=" + input;
    let xhr = createCORSRequest("GET", url);

    // checking if browser does CORS
    if (!xhr) {
      alert("CORS not supported");
      return;
    }

    // Load some functions into response handlers.
    xhr.onload = function() {
      let responseStr = xhr.responseText; // get the JSON string
      let object = JSON.parse(responseStr); // turn it into an object
      // console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted
      let myWord = JSON.stringify(object.Spanish, undefined, 2);
      let myTranslation = myWord;
      // console.log(myWord);
      document.getElementById("outputGoesHere").innerHTML = myWord;
    };

    xhr.onerror = function() {
      alert("Woops, there was an error making the request.");
    };

    // Actually send request to server
    xhr.send();
  }
}

function insertCallback(err) {
  if (err) {
    console.log(err);
  }
}

export function makeCorsRequestStore() {
  let eng = document.getElementById("myWord").value;
  let span = document.getElementById("outputGoesHere").innerHTML;

  //let input = document.getElementById("myWord").value;
  let url = "store?english=" + eng + "&spanish=" + span;
  let xhr = createCORSRequest("GET", url);

  // checking if browser does CORS
  if (!xhr) {
    alert("CORS not supported");
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
    document.getElementById("storeoutputGoesHere").innerHTML =
      "I stored: " + span;
    console.log("It got back poggers");
  };

  xhr.onerror = function() {
    alert("Woops, there was an error making the request.");
  };

  // Actually send request to server
  xhr.send();
}
