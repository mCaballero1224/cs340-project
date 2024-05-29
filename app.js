/* app.js */

/* SETUP */
const db = require('./database/db-connector'); // for db connection
const path = require('path');
require('dotenv').config();

const express = require('express'); // use express lib for the web server
const app = express(); // create an instance of the express obj to interact with the server

const { engine } = require('express-handlebars');
const exphbs = require('express-handlebars'); // import handlebars
app.engine('.hbs', engine({extname: ".hbs"})); // create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs'); // tell express to use the handlebars engine whenever encountering a*.hbs file

PORT = process.env.PORT; // because cyberpunk

/* Middleware */
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* Routes */
app.get('/', function(req, res) {
	res.render('index', {pageTitle: 'FutureGadgetDB', flavorText: 'Database project for CS340'});
});

app.get('/characters', function(req, res) {
	let query1 = "SELECT * FROM Characters;";
  db.pool.query(query1, function(error, rows, fields) {
    res.render('characters', {pageTitle: 'CharactersDB', flavorText: 'Information about characters created by users', data: rows});
  });
});

app.get('/players', function(req, res) {
	let query1 = "SELECT * FROM Players;";
  db.pool.query(query1, function(error, rows, fields) {
	res.render('players', {pageTitle: 'PlayersDB', flavorText: 'Information about our users', data: rows});
  });
});

app.get('/sessions', function(req, res) {
	let query1 = "SELECT * FROM Sessions;";
  db.pool.query(query1, function(error, rows, fields) {
    res.render('sessions', {pageTitle: 'SessionsDB', flavorText: 'Information about currently running game sessions', data: rows});
  });
});

app.get('/items', function(req, res) {
	let query1 = "SELECT * FROM Items;";
  db.pool.query(query1, function(error, rows, fields) {
    res.render('items', {pageTitle: 'ItemsDB', flavorText: 'Information about available in-game items', data: rows});
  });
});

app.get('/character_items', function(req, res) {
  let query1 = "SELECT * FROM  Character_Items;";
  db.pool.query(query1, function(error, rows, fields) {
    res.render('character_items', {pageTitle: 'CharacterItemsDB', flavorText: 'Intersection table describing what characters have what items.', data: rows});
  });
});

app.get('/citations', function(req, res) {
	res.render('citations', {pageTitle: 'Citations', flavorText: 'Because plagiarism bad'});
});

/* Controllers */


/* Listener */
app.listen(PORT, function() {
	console.log(`Express started on http://localhost:${PORT}; press Ctrl-C to terminate.`);
});

