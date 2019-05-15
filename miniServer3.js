const express = require('express')
const port = 55106 // you need to put your port number here

function queryHandler(req, res, next) {
    let url = req.url;
    let qObj = req.query;
    console.log(qObj);
    if (qObj.word != undefined) {
        let mystring = qObj.word;
        let secondString = mystring.split("").reverse().join("");
        let newString = mystring +  secondString;
        
	    res.json( {"palindrome" : newString} );
    }
    else {
	next();
    }
}

function translateHandler(req, res, next) {
    const APIrequest = require('request');
    const http = require('http');
    const APIkey = "AIzaSyBaq2006_i0hQd_vbUfwq-cKMZ19QpZc7s";  // ADD API KEY HERE
    const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey

    let secondurl = req.url;
    let wordObj = req.query;
    console.log(wordObj);
    if (wordObj.english != undefined) {
        let mystring = wordObj.english;
        let requestObject = 
        {
            "source": "en",
            "target": "hi",
            "q": 
            [
                mystring
            ]
        }
        console.log("English phrase: ", requestObject.q[0]);
        APIrequest(
            { // HTTP header stuff
                url: url,
                method: "POST",
                headers: {"content-type": "application/json"},
                // will turn the given object into JSON
                    json: requestObject	
                },
                // callback function for API request
                APIcallback
        );
        // callback function, called when data is received from API
        function APIcallback(err, APIresHead, APIresBody) 
        {
            // gets three objects as input
            if ((err) || (APIresHead.statusCode != 200)) {
                // API is not working
                console.log("Got API error");
                //console.log(APIresBody);
            } 
            else {
                if (APIresHead.error) {
                    // API worked but is not giving you data
                    console.log(APIresHead.error);
                } 
                else {
                    console.log("In Hindi: ", 
                                APIresBody.data.translations[0].translatedText);
                    let translatedString = APIresBody.data.translations[0].translatedText;
                    console.log("\n\nJSON was:");
                    console.log(JSON.stringify(APIresBody, undefined, 2));
                    res.json({"English" : mystring,"Hindi" : translatedString});
                    // print it out as a string, nicely formatted
                }
            }
        } // end callback function

        

        
	    // this is what my palindrom becomes res.json( {"English" : newString} );
    }
    else {
	next();
    }
}

function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
    }

// put together the server pipeline
const app = express()
app.use(express.static('public'));  // can I find a static file? 
app.get('/query', queryHandler );   // if not, is it a valid query?
app.get('/translate', translateHandler );   // if not, is it a valid query?
app.use( fileNotFound );            // otherwise not found

app.listen(port, function (){console.log('Listening...');} )
 
