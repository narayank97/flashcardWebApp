const express = require('express')
const port = 55106 // you need to put your port number here
let myFlashCardObj;
const passport = require('passport');
const cookieSession = require('cookie-session');

const GoogleStrategy = require('passport-google-oauth20');
const sqlite = require('sqlite3');

let userArr = [];
let userName;
let oldUser = false;

// Google login credentials, used when the user contacts
// Google, to tell them where he is trying to login to, and show
// that this domain is registered for this service. 
// Google will respond with a key we can use to retrieve profile
// information, packed into a redirect response that redirects to
// server162.site:[port]/auth/redirect
const googleLoginData = {
    clientID: '1048003437401-c3ca46bltvs8d9ssca5bqp63knrd2fbg.apps.googleusercontent.com',
    clientSecret: 'LtWL8JME6KItbrEjkcGQdoHN',
    callbackURL: '/auth/redirect'
};

// Strategy configuration. 
// Tell passport we will be using login with Google, and
// give it our data for registering us with Google.
// The gotProfile callback is for the server's HTTPS request
// to Google for the user's profile information.
// It will get used much later in the pipeline. 
passport.use( new GoogleStrategy(googleLoginData, gotProfile) );

function startReviewHandler(req, res, next) {
    console.log("In Handler");
    let url = req.url;
    // let qObj = req.query;
    console.log("In Handler");
    console.log(userArr);
    res.json(userArr);
}

function getUserName(req, res, next) {
    console.log("In Handler");
    let url = req.url;
    // let qObj = req.query;
    console.log("In Handler");
    console.log(userName);
    res.json(userName);
}


// Let's build a server pipeline!

// app is the object that implements the express server
const app = express();

// pipeline stage that just echos url, for debugging
app.use('/', printURL);

// Check validity of cookies at the beginning of pipeline
// Will get cookies out of request, decrypt and check if 
// session is still going on. 
app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    // meaningless random string used by encryption
    keys: ['hanger waldo mercy dance']  
}));

// Initializes request object for further handling by passport
app.use(passport.initialize()); 

// If there is a valid cookie, will call deserializeUser()
app.use(passport.session()); 

// Public static files
app.get('/*',express.static('public'));

// Public static files
app.use('/login', express.static('public'));
app.use('/add', express.static('public'));
app.use('/start_review', express.static('public'));

// app.get('/add', express.static('public'));

// next, handler for url that starts login with Google.
// The app (in public/login.html) redirects to here (not an AJAX request!)
// Kicks off login process by telling Browser to redirect to
// Google. The object { scope: ['profile'] } says to ask Google
// for their user profile information.
app.get('/auth/google',
	passport.authenticate('google',{ scope: ['profile'] }) );
// passport.authenticate sends off the 302 response
// with fancy redirect URL containing request for profile, and
// client ID string to identify this app. 

// Google redirects here after user successfully logs in
// This route has three handler functions, one run after the other. 
app.get('/auth/redirect',
	// for educational purposes
	function (req, res, next) {
	    console.log("at auth/redirect");
	    next();
	},
	// This will issue Server's own HTTPS request to Google
	// to access the user's profile information with the 
	// temporary key we got in the request. 
	passport.authenticate('google'),
	// then it will run the "gotProfile" callback function,
	// set up the cookie, call serialize, whose "done" 
	// will come back here to send back the response
	// ...with a cookie in it for the Browser! 
	function (req, res) {
        console.log('Logged in and using cookies!')
        if(oldUser == false){
            res.redirect('/add');
        }
        else
        {
            res.redirect('/start_review');
        }
	    
	});

// static files in /user are only available after login
app.get('/user/*',
	isAuthenticated, // only pass on to following function if
	// user is logged in 
	// serving files that start with /user from here gets them from ./
	express.static('.') 
       ); 


// next, all queries (like translate or store or get...
app.get('/query', function (req, res) { res.send('HTTP query!') });



app.get('/query', queryHandler);   // if not, is it a valid query?
app.get('/startreview', startReviewHandler);
app.get('/getusername', getUserName);
app.get('/start_review/getusername', getUserName);
app.get('add/getusername', getUserName);
app.get('/start_review/startreview', startReviewHandler);
app.get('/add/translate', translateHandler);   // if not, is it a valid translate query?
app.get('/add/store', storeHandler);   // if not, is it a valid store query?
app.get('/translate', translateHandler);   // if not, is it a valid translate query?
app.get('/store', storeHandler);   // if not, is it a valid store query?


// app.get('/add', function (req, res) {
//     res.send('/')
// })

// finally, not found...applies to everything
app.use( fileNotFound );

// Pipeline is ready. Start listening!  
app.listen(55106, function (){console.log('Listening...');} );


// middleware functions

// print the url of incoming HTTP request
function printURL (req, res, next) {
    console.log(req.url);
    next();
}

// function to check whether user is logged when trying to access
// personal data
function isAuthenticated(req, res, next) {
    if (req.user) {
	console.log("Req.session:",req.session);
	console.log("Req.user:",req.user);
	next();
    } else {
	res.redirect('/login.html');  // send response telling
	// Browser to go to login page
    }
}


// function for end of server pipeline
function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
    }

// Some functions Passport calls, that we can use to specialize.
// This is where we get to write our own code, not just boilerplate. 
// The callback "done" at the end of each one resumes Passport's
// internal process. 

// function called during login, the second time passport.authenticate
// is called (in /auth/redirect/),
// once we actually have the profile data from Google. 
function gotProfile(accessToken, refreshToken, profile, done) {
    console.log("Google profile",profile);
    // here is a good place to check if user is in DB,
    // and to store him in DB if not already there. 
    // Second arg to "done" will be passed into serializeUser,
    // should be key to get user out of database.

    let dbRowID = profile.id;  // temporary! Should be the real unique
    let userFirstName = profile.name.givenName;
    let userLastName = profile.name.familyName;
    userName = userFirstName+" "+userLastName;
    console.log("HELLOOOOOO");
    console.log(dbRowID);
    console.log(userFirstName);
    console.log(userLastName);
    
    const sqlite3 = require("sqlite3").verbose();  // use sqlite
    const fs = require("fs"); // file system
    const dbFileName = "Users.db";
    // makes the object that represents the database in our code
    const db = new sqlite3.Database(dbFileName);  // object, not database.
    const checkUser = 'SELECT * FROM Users WHERE googleID = '+ profile.id;
    // db.run(checkUser, function userCheckCallback(err){
    //     console.log(err);
    //     if(err == null){
    //          console.log("Entry exists");
    //         console.log("Checked correctly");
    //         done(null, dbRowID); 
    //     } 
    //     else {
    //         console.log("IM HEREEEEEEEEEEEEEEEEEE");
    //         const cmdStr = 'INSERT into Users (googleID,firstName,lastName) VALUES (@0, @1, @2)';
    //         db.run(cmdStr, dbRowID, userFirstName, userLastName, insertCallback);
    //         done(null, dbRowID); 
    //     }   

    // });
    
    db.get( 'SELECT * FROM Users WHERE googleID = '+ profile.id,
    function dataCallback(err, rowData) {
        if (err) {
            oldUser = false; 
            console.log("error: ",err); 
            done(null, dbRowID); 
        }
        else { 
            const cmdStr = 'INSERT into Users (googleID,firstName,lastName) VALUES (@0, @1, @2)';
            db.run(cmdStr, dbRowID, userFirstName, userLastName, insertCallback);
            oldUser = true;
            done(null, dbRowID); 
        }
    });

    
    // key for db Row for this user in DB table.
    // Note: cannot be zero, has to be something that evaluates to
    // True.  

    
}

// Part of Server's sesssion set-up.  
// The second operand of "done" becomes the input to deserializeUser
// on every subsequent HTTP request with this session's cookie. 
passport.serializeUser((dbRowID, done) => {
    
    console.log("SerializeUser. Input is",dbRowID);
    done(null, dbRowID);
});

// Called by passport.session pipeline stage on every HTTP request with
// a current session cookie. 
// Where we should lookup user database info. 
// Whatever we pass in the "done" callback becomes req.user
// and can be used by subsequent middleware.
passport.deserializeUser((dbRowID, done) => {
    // console.log("deserializeUser. Input is:", dbRowID);
    const sqlite3 = require("sqlite3").verbose();  // use sqlite
    const fs = require("fs"); // file system
    const dbFileName = "Flashcards.db";
    // makes the object that represents the database in our code
    const db = new sqlite3.Database(dbFileName);  // object, not database.
    const checkFlashcards = 'SELECT * FROM Flashcards WHERE googleID = '+ dbRowID;
    console.log("!!!!!!!!!!!!!!!!!!!!!!--"+dbRowID);

    db.get(checkFlashcards, (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if (row) {
            console.log("HELLLOOOOO");
            let userData = {userData: row};
            userArr.push(row)
            // userArr.push(JSON.stringify(row))
            // console.log("YEET "+userData);
            console.log("NO JSON " + row);
            console.log("WITH JSON "+JSON.stringify(row));
            done(null, dbRowID);
        
        } 
        else {
            let userData = {userData: "data from db row goes here"};
            done(null, dbRowID);
        // insert the user since you can't find it in the db
        // You need to call done() here
        }
    });

    // here is a good place to look up user data in database using
    // dbRowID. Put whatever you want into an object. It ends up
    // as the property "user" of the "req" object. 
});


function queryHandler(req, res, next) {
    let url = req.url;
    let qObj = req.query;
    console.log(qObj);
    if (qObj.word != undefined) {
        let mystring = qObj.word;
        let secondString = mystring.split("").reverse().join("");
        let newString = mystring + secondString;

        res.json({ "palindrome": newString });
    }
    else {
        next();
    }
}



function translateHandler(req, res, next) {
    const APIrequest = require('request');
    const http = require('http');
    const APIkey = "AIzaSyBaq2006_i0hQd_vbUfwq-cKMZ19QpZc7s";  // ADD API KEY HERE
    const url = "https://translation.googleapis.com/language/translate/v2?key=" + APIkey;

    let secondurl = req.url;
    let wordObj = req.query;
    console.log(wordObj);
    if (wordObj.english != undefined) {
        let mystring = wordObj.english;
        let requestObject =
        {
            "source": "en",
            "target": "es",
            "q":
                [
                    mystring
                ]
        }
        //console.log("English phrase: ", requestObject.q[0]);
        APIrequest(
            { // HTTP header stuff
                url: url,
                method: "POST",
                headers: { "content-type": "application/json" },
                // will turn the given object into JSON
                json: requestObject
            },
            // callback function for API request
            APIcallback
        );
        // callback function, called when data is received from API
        function APIcallback(err, APIresHead, APIresBody) {
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
                    //console.log("In Spanish: ",APIresBody.data.translations[0].translatedText);
                    let translatedString = APIresBody.data.translations[0].translatedText;
                    //console.log("\n\nJSON was:");
                    //console.log(JSON.stringify(APIresBody, undefined, 2));
                    console.log(translatedString);
                    res.json({ "English": mystring, "Spanish": translatedString });
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

function insertCallback(err) {
    if (err) { 
        console.log(err); 
    }
} 

function dumpDB() {
    const sqlite3 = require("sqlite3").verbose();  // use sqlite
    const fs = require("fs"); // file system
    const dbFileName = "Flashcards.db";
    // makes the object that represents the database in our code
    const db = new sqlite3.Database(dbFileName);  // object, not database.
    db.all ( 'SELECT * FROM flashcards', dataCallback);
    function dataCallback( err, data ) {console.log(data)}
}

//http://server162.site:port/store?english=example phrase&spanish=예시 문구
function storeHandler(req, res, next) {
    const sqlite3 = require("sqlite3").verbose();  // use sqlite
    const fs = require("fs"); // file system
    const dbFileName = "Flashcards.db";
    console.log("HI IM IN STORE HANDLER");
    // makes the object that represents the database in our code
    const db = new sqlite3.Database(dbFileName);  // object, not database.
    let url = req.url;
    let wordObj = req.query;
    
    let myUser = req.user;
    let myUsername = myUser;
    console.log("??????????? ______"+myUsername);
    console.log(wordObj);
    if ((wordObj.english != undefined) && (wordObj.spanish != undefined)) {
        let eng = wordObj.english;
        let span = wordObj.spanish;
        console.log("HI IM IN STORE HANDLER2222222");
        const cmdStr = 'INSERT into Flashcards (googleID, english,spanish, seen, correct) VALUES (@0, @1, @2, 0, 0)';
        db.run(cmdStr,myUsername,eng, span, insertCallback);
        console.log("We're in boyz");
        dumpDB(); 
        res.json("We put it in the database ");
    }
    else {
        next();
    }
}

function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find ' + url);
}

// put together the server pipeline
app.use(express.static('public'));  // can I find a static file? 



// app.get('start_review', function (req, res) {
//     res.send('Hello World!')
//     // res.sendfile(__dirname + '/public/index.html');
//     // console.log(__dirname + '/public/index.html');
// }); 

// app.get('add', function (req, res) {
//     res.send('Hello World!')
//     // res.sendfile(__dirname + '/public/index.html');
//     // console.log(__dirname + '/public/index.html');
// }); 

// app.get('/start_review', function (req, res) {
//     res.send('/')
// })
// app.get('/add', function (req, res) {
//     res.send('/')
// })
app.get('/query', queryHandler);   // if not, is it a valid query?
app.get('/translate', translateHandler);   // if not, is it a valid translate query?
app.get('/store', storeHandler);   // if not, is it a valid store query?

app.use(fileNotFound);            // otherwise not found

// app.listen(port, function () { console.log('Listening...'); })