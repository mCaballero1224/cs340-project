/* app.js */

/* SETUP */
const path = require('path');
const express = require('express'); // use express lib for the web server
const app = express(); // create an instance of the express obj to interact with the server
const db = require('./database/db-connector'); // for db connection
const { engine } = require('express-handlebars');
const exphbs = require('express-handlebars'); // import handlebars
app.engine('.hbs', engine({extname: ".hbs"})); // create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs'); // tell express to use the handlebars engine whenever encountering a*.hbs file
PORT = 2077; // because cyberpunk

/* Middleware */
app.use(express.static(path.join(__dirname, '/public')));

/* Routes */
app.get('/', function(req, res) {
	res.render('index', {pageTitle: 'FutureGadgetDB', flavorText: 'Database project for CS340'});
});

app.get('/characters', function(req, res) {
	let query1 = "SELECT * FROM Characters;";
	res.render('characters', {pageTitle: 'CharactersDB', flavorText: 'Information about characters created by users'});
});

app.get('/players', function(req, res) {
	res.render('players', {pageTitle: 'PlayersDB', flavorText: 'Information about our users'});
});

app.get('/sessions', function(req, res) {
	res.render('sessions', {pageTitle: 'SessionsDB', flavorText: 'Information about currently running game sessions'});
});

app.get('/items', function(req, res) {
	res.render('items', {pageTitle: 'ItemsDB', flavorText: 'Information about available in-game items'});
});

app.get('/character_items', function(req, res) {
	res.render('index', {pageTitle: 'CharacterItemsDB', flavorText: 'Intersection table describing what characters have what items.'});
});

app.get('/citations', function(req, res) {
	res.render('citations', {pageTitle: 'Citations', flavorText: 'Because plagiarism bad'});
});

/* Controllers */
app.post ('/players', (req, res) => { 
    players.createEntry(
        req.body.player_id, 
        req.body.username, 
        req.body.session_id
        )
});

/* Listener */
app.listen(PORT, function() {
	console.log(`Express started on http://localhost:${PORT}; press Ctrl-C to terminate.`);
});

