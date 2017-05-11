/* 
Recicla, app for Questions & Answers regarding rubbish
Usage: node recicla.js
MRS, 2/5/2017
*/


/* Global variables */

var express = require('express');
var app = express();
var fs = require('fs');
var recicla = [];
var path = require('path');
var debug = 0;


/* Functions */

//Return random index of recicla[], from 0 to length-1
function getRandomIndex() {
    var idx = Math.floor(Math.random() * recicla.length);
    return idx;
}


/* Initialization */

//Load the file recicla.txt containing the question:X:answer rows in array
//The pop removes a blank line added by split
recicla = fs.readFileSync('./recicla.txt').toString().split('\n');

if (debug == 1) console.log('initialization:', recicla);


/* Routes */

//Route for the main page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//Route for the images
app.use('/img', express.static(path.join(__dirname + '/img')));

//Route for the API, get a plain Q&A
app.get('/qa', function(req, res) {
    var i = getRandomIndex();
    if (debug == 1) console.log('sending index:', i);
    res.send(recicla[i]);
});

//Listen on port 8080
app.listen(8080, function () {
    console.log('App started, listening on port 8080');
})
