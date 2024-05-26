// Import dependencies.
import Handlebars from 'handlebars';
import { pool } from '../database/db-connector';

// Connect based to port
const port = pool;

// SCHEMA: Define the player's schema with 2 possible NULL.
const playerSchema = Handlebars.Schema({
	player_id:    { type: Number, required: true },
	username:     { type: String, required: true },
	session_id:   { type: Number },
    character_id: { type: Number }
});

// Compile the model from the schema by defining  "players"
const players = Handlebars.model('players', playerSchema);


// CREATE player *****************************************
const createPerson = async (player_id, username, session_id, character_id) => {
    const person = new players({ 
        player_id: player_id, 
        username: username, 
        session_id: session_id, 
        character_id: character_id,
    });
    return person.save();
}

// RETRIEVE player *****************************************
const retrievePerson = async () => {
    const searchPlayers = players.find();
    return searchPlayers.exec();
}

// DELETE player *****************************************
const deletePerson = async (_id) => {
    const result = await players.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE player *****************************************************
const updatePerson = async (_id, player_id, username, session_id, character_id) => {
    const result = await players.replaceOne({_id: _id }, {
        player_id: player_id,
        username: username,
        session_id: session_id,
        character_id: character_id,
    });
    return { 
        player_id: player_id,
        username: username,
        session_id: session_id,
        character_id: character_id
    }
}

// EXPORT the variables for use in the controller file.
export { createPerson, retrievePerson, updatePerson, deletePerson }