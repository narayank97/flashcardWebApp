// Globals
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName2 = "Users.db";
// makes the object that represents the database in our code
const db2 = new sqlite3.Database(dbFileName2);  // object, not database.

// Initialize table.
// If the table already exists, causes an error.
// Fix the error by removing or renaming Flashcards.db

const cmdStr2 = 'CREATE TABLE Users (googleID INT PRIMARY KEY,firstName CHAR(25), lastName CHAR(25))';

db2.run(cmdStr2,tableCreationCallback);

// Always use the callback for database operations and print out any
// error messages you get.
// This database stuff is hard to debug, give yourself a fighting chance.
function tableCreationCallback(err) {
    if (err) {
	    console.log("Table creation error",err);
    } else {
	    console.log("Database created");
        db2.close();
    }
}
