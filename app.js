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

/* MIDDLEWARE */
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* ROUTES */
app.get('/', function(req, res) {
	res.render('index', {pageTitle: 'FutureGadgetDB', flavorText: 'Database project for CS340', headerImage: '/assets/android-chrome-192x192.png'});
});

// Character Routes
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
      res.render('characters', {pageTitle: 'CharactersDB', flavorText: 'Information about characters created by our users', headerImage: '/images/noun-character.png', data: characters, players: players});
    });
  });
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

app.put('/put-character', function(req, res, next) {
  let data = req.body;

  let characterId = parseInt(data.characterId);
  let playerId = parseInt(data.playerId);
  let name = data.name;
  let level = parseInt(data.level);
  let experience = parseInt(data.experience);
  let agility = parseInt(data.agility);
  let strength = parseInt(data.strength);
  let magic = parseInt(data.magic);
  let health = parseInt(data.health);

  let queryUpdateCharacter = `UPDATE Characters SET player_id = ?, name = ?, level = ?, experience = ?, agility = ?, strength = ?, magic = ?, health = ? WHERE character_id = ?`;
  let selectCharacter = `SELECT * FROM Characters WHERE character_id = ?`;

  db.pool.query(queryUpdateCharacter, [playerId, name, level, experience, agility, strength, magic, health, characterId], function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } 
    else {
      db.pool.query(selectCharacter, [characterId], function(error, rows, fields) {
       if (error) {
        console.log(error);
        res.sendStatus(400);
       } 
       else {
        res.send(rows);
       }
      });
    }
  });
});

// Player Routes 
app.get('/players', function(req, res) {
  let query1;
  let query2;
  let sessions;
	query1 = "SELECT * FROM Sessions;";
  if (req.query.username == undefined) {
     query2 = `SELECT * FROM Players;`;
  }
  else {
    query2 = `SELECT * FROM Players WHERE username LIKE "${req.query.username}%";`;
  }
  db.pool.query(query1, function(error, rows, fields) {
    sessions = rows;
    db.pool.query(query2, function(error, rows, fields) {
      res.render('players', {pageTitle: 'PlayersDB', flavorText: 'Information about our users', headerImage: '/images/noun-team.png', data: rows, sessions: sessions});
    });
  });
});

app.post('/add-player', function(req, res, next) {
 let data = req.body; 

  let session_id = data.session_id;
  let username = data.username;


  if (isNaN(session_id)) {
    session_id = 'NULL';
  }

  let addPlayerQuery = `INSERT INTO Players (username, session_id) VALUES ("${username}", ${session_id})`;
  let selectQuery = `SELECT * FROM Players`;

  db.pool.query(addPlayerQuery, function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } 
    else {
      db.pool.query(selectQuery, function(error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } 
        else {
          res.send(rows);
        }
      });
    }
  });
});


// Session Routes
app.get('/sessions', function(req, res) {
	let query1 = "SELECT * FROM Sessions;";
  db.pool.query(query1, function(error, rows, fields) {
    res.render('sessions', {pageTitle: 'SessionsDB', flavorText: 'Information about currently running game sessions', headerImage: '/images/noun-server.png', data: rows});
  });
});

app.post('/add-session', function (req, res, next) {
	let data = req.body;
	let startTime = data.start_time;
	let numPlayers = data.num_players;
	let mapLocation = data.map_location;

	if (isNaN(numPlayers)) {
		numPlayers = 0;
	}

	let addSessionQuery = `INSERT INTO Sessions (start_time, num_players, map_location) VALUES ("${startTime}", ${numPlayers}, "${mapLocation}")`	
	let selectQuery = `SELECT * FROM Sessions`;

	db.pool.query(addSessionQuery, function(error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		} else {
			db.pool.query(selectQuery, function(error, rows, fields) {
				if (error) {
					console.log(error);
					res.sendStatus(400);
				} else {
					res.send(rows);
				}
			});
		}
	});
});

// Item Routes
app.get('/items', function(req, res) {
	let query1 = "SELECT * FROM Items;";
  db.pool.query(query1, function(error, rows, fields) {
    res.render('items', {pageTitle: 'ItemsDB', flavorText: 'Information about available in-game items', headerImage: '/images/noun-item.png', data: rows});
  });
});

app.post('/add-item', function(req, res, next) {
  let data = req.body;
  let selectQuery = `SELECT * FROM Items`;

  let item_desc = data.item_desc;
  let item_type = data.item_type;
  let item_stat = data.item_stat;

  if (isNaN(item_stat)) {
    item_stat = 'NULL';
  }

  console.log(data);

  let addItemQuery = `INSERT INTO Items (item_desc, item_type, item_stat) VALUES ("${item_desc}", "${item_type}", ${item_stat})`;

  db.pool.query(addItemQuery, function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    else {
      db.pool.query(selectQuery, function(error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        }
        else {
          console.log(rows);
          res.send(rows);
        }      
      });
    }
  });

});

// Inventory Routes
app.get('/character_items', function(req, res) {
  let query1 = "SELECT * FROM  Character_Items;";
  let query2 = "SELECT * FROM Characters";
  let query3 = "SELECT * FROM Items";

  let characters;
  let items;
  let characterItems;

  db.pool.query(query1, function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      characterItems = rows;
      db.pool.query(query2, function(errors, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          characters = rows; 
          db.pool.query(query3, function(errors, rows, fields) {
            if (error) {
              console.log(error);
              res.sendStatus(400);
            } else {
               items = rows;
               res.render('character_items', {
                pageTitle: 'CharacterItemsDB',
                flavorText: 'Intersection table describing what characters have what items.', 
                headerImage: '/images/noun-character.png',
                data: characterItems,
                characters: characters,
                items: items,
               });
            }
          });
        }
      });
    }
  });
});

app.post('/add-inventory', function(req, res) {
  let data = req.body;

  let character_id = data.character_id;
  let item_id = data.item_id;
  let quantity = data.quantity;

  let addInventory = `INSERT INTO Character_Items (character_id, item_id, quantity) VALUES (${character_id}, ${item_id}, ${quantity})`;
  let selectQuery = `SELECT * FROM Character_Items`;

  db.pool.query(addInventory, function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      db.pool.query(selectQuery, function(error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.send(rows);
        }
      });
    }
  });
});

// Citations Route
app.get('/citations', function(req, res) {
	res.render('citations', {pageTitle: 'Citations', flavorText: 'Because plagiarism bad', headerImage: '/images/noun-scroll.png'});
});




/* Controllers */


/* Listener */
app.listen(PORT, function() {
	console.log(`Express started on http://localhost:${PORT}; press Ctrl-C to terminate.`);
});

