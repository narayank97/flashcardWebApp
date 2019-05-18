"strict mode";
// Do a CORS request to get Davis weather hourly forecast

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {
   let input = document.getElementById("myWord").value;
   let url = "translate?english="+input;
   myEnglish = input;   
   let xhr = createCORSRequest('GET', url);

  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
      let responseStr = xhr.responseText;  // get the JSON string 
      let object = JSON.parse(responseStr);  // turn it into an object
      // console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted
      let myWord = JSON.stringify(object.Spanish, undefined, 2);
      myTranslation = myWord;
      // console.log(myWord);
      document.getElementById("outputGoesHere").innerHTML = myWord;
    };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}

function insertCallback(err) {
  if (err) { 
      console.log(err); 
  }
} 

function makeCorsRequestStore() {
    const sqlite3 = require("sqlite3").verbose();  // use sqlite
    const fs = require("fs"); // file system
    const dbFileName = "Flashcards.db";
    // makes the object that represents the database in our code
    const db = new sqlite3.Database(dbFileName);  // object, not database.

    let eng = document.getElementById("myWord").innerHTML;
    let kor = document.getElementById("outputGoesHere").innerHTML;
    

    //let input = document.getElementById("myWord").value;
    let url = "store?english="+myEnglish+"&korean="+myTranslation;   
    let xhr = createCORSRequest('GET', url);

    // checking if browser does CORS
    if (!xhr) {
      alert('CORS not supported');
      return;
    }

    // Load some functions into response handlers.
    xhr.onload = function() {
      if ((eng != undefined) && (kor != undefined)) {
        
        const cmdStr = 'INSERT into Flashcards (user, english,korean, seen, correct) VALUES (1, @0, @1, 0, 0)';
        db.run(cmdStr, eng, kor, insertCallback);
        console.log("We're in boyz");
        dumpDB(); 
        res.json("We put it in the database ");
      }
        
    };

    xhr.onerror = function() {
      alert('Woops, there was an error making the request.');
    };

    // Actually send request to server
    xhr.send();
}

// run this code to make request when this script file gets executed 
//makeCorsRequest();
