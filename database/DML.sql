--DML file that will be used for changes with no actual data to CRUD

-- Create data, insert something into each table
INSERT INTO Sessions (session_id, start_time, num_players, map_location)

VALUES (
    :session_id,
    :start_time_from_dropdown_Input,
    :num_players,
    :map_location
);

INSERT INTO Players (player_id, username, session_id)

VALUES (
    :player_id,
    :username,
    :session_id_from_the_dropdown_Input
);

INSERT INTO Characters (character_id, player_id, name, level, experience, agility, strength, magic, health)

VALUES (
    :character_id,
    :player_id_from_dropdown_Input,
    :name,
    :level,
    :strenght,
    :agility,
    :magic,
    :health,
    :experience
);

INSERT INTO Items (item_desc, item_type, item_stat)

VALUES (
    :item_desc, 
    :item_type, 
    :item_stat
);

INSERT INTO Character_Items (character_id, item_id, quantity)

VALUES (
    :character_id_from_dropdown_Input,
    :item_id_from_dropdown_Input,
    :quantity
);


--Get all information in each table/page 
SELECT session_id, start_time, num_players, map_location FROM Sessions;

SELECT player_id, username, session_id FROM Players;

SELECT character_id, player_id, name, level, experience, agility, strength, magic, health FROM Characters;

SELECT item_id, item_desc, item_type, item_stat FROM Items;

SELECT character_id, item_id, quantity FROM Character_Items;

--Dynamic read, get all players in a specific session
SELECT player_id FROM Players
WHERE session_id = :session_id_from_the_dropdown_Input;

-- Delete an item
DELETE FROM Items
WHERE item_desc = :item_desc_selected_from_the_items_page;

-- Update a session
UPDATE Sessions
SET num_players = :num_players
WHERE session_id = :session_id_from_the_dropdown_Input;
