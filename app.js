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

PORT = process.env.PORT || 2077; // because cyberpunk

/* Middleware */
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* Routes */
app.get('/', function(req, res) {
	res.render('index', {pageTitle: 'FutureGadgetDB', flavorText: 'Database project for CS340'});
});

app.get('/characters', function(req, res) {
  let query1;
  let query2;
  let characters;
  let players;

  query1 = `SELECT * FROM Players;`;

  if (req.query.name === undefined) {
    query2 = `SELECT * FROM Characters;`;
  }
  else {
    query2 = `SELECT * FROM Characters WHERE name LIKE "${req.query.name}%";`;
  }
  db.pool.query(query1, function(error, rows, fields) {
    let players = rows;
    db.pool.query(query2, function(error, rows, fields) {
      let characters = rows;
      res.render('characters', {pageTitle: 'CharactersDB', flavorText: 'Information about characters created by our users', data: characters, players: players});
    });
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

app.post('/add-character', function(req, res) {
  let data = req.body;
  // capture NULL values
  let playerId = data.player_id;
  if (isNaN(playerId)) {
    playerId = 'NULL'
  }
  
  let level = data.level;
  if (isNaN(level)) {
    level = 'NULL'
  }
  
  let experiencePoints = data.experience;
  if (isNaN(experiencePoints)) {
    experiencePoints = 'NULL'
  }
  
  let agility = data.agility;
  if (isNaN(experiencePoints)) {
    agility = 'NULL'
  }
  
  let strength = data.strength;
  if (isNaN(strength)) {
    strength = 'NULL'
  }
  
  let magic = data.magic;
  if (isNaN(magic)) {
    magic = 'NULL'
  }
  
  let health = data.health;
  if (isNaN(health)) {
    health = 'NULL'
  }
  
  query1 = `INSERT INTO Characters (player_id, name, level, experience, agility, strength, magic, health) VALUES (${playerId}, '${data.name}', ${level}, ${experiencePoints}, ${agility}, ${strength}, ${magic}, ${health});`;
  db.pool.query(query1, function(error, rows, fields) {
    if (error) {
        console.log(error);
	res.sendStatus(400);
    } else {
      // if there was no error, perform a SELECT * on Characters
      query2 = `SELECT * FROM Characters;`;
      db.pool.query(query2, function(error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          console.log(rows);
          res.send(rows);
        }
      });
    }
  });
});

app.delete("/delete-character", function(req, res, next) {
  let data = req.body;
  let characterId = parseInt(data.id);
  let deleteCharacter = `DELETE FROM Characters WHERE character_id = ?;`;
  let deleteCharacterItems = `DELETE FROM Character_Items WHERE character_id = ?;`;
  let foreignKeyCheckDisable = `SET FOREIGN_KEY_CHECKS = 0;`;
  let foreignKeyCheckEnable = `SET FOREIGN_KEY_CHECKS = 1;`;

  db.pool.query(foreignKeyCheckDisable, function(error){
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    else {
      console.log('Foreign key check disabled.');
      db.pool.query(deleteCharacterItems, [characterId], function(error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } 
        else {
          console.log(`Deleted inventory items associated with ${characterId}.`);
          db.pool.query(deleteCharacter, [characterId], function(error, rows, fields) {
            if (error) {
              console.log(error);
              res.sendStatus(400);
            }
            else {
              console.log(`Character of id #${characterId} deleted.`);
              db.pool.query(foreignKeyCheckEnable, function(error) {
                if (error) {
                  console.log(error);
                  res.sendStatus(400);
                }
                else {
                  console.log(`Foreign key check enabled.`);
                  res.sendStatus(204);
                }
              });
            }
          });
        }
      });
    }
  });
});





/* Controllers */


/* Listener */
app.listen(PORT, function() {
	console.log(`Express started on http://localhost:${PORT}; press Ctrl-C to terminate.`);
});

