SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Sessions;
-- table for Sessions: records details of a game session
CREATE TABLE Sessions(
    session_id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    start_time datetime DEFAULT NULL,
    num_players int NOT NULL DEFAULT 0,
    map_location varchar(255) DEFAULT NULL
);

-- data for Sessions
INSERT INTO Sessions VALUES
(401, '2024-05-03 23:18:00', 3, 'Tree Top'),
(402, '2024-05-01 16:49:00', 2, 'Bunker');

DROP TABLE IF EXISTS Players;
-- table for Players: records details of users
CREATE TABLE Players(
    player_id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    session_id int,
    FOREIGN KEY (session_id) REFERENCES Sessions(session_id)
);

-- data for Players
INSERT INTO Players VALUES
(643, 'hackNSlash', 402),
(89452, 'der8baur', 402),
(16, 'tux_ledo', 401),
(1801, 'free_dum', 401),
(2576, 'benny_b', 401);

DROP TABLE IF EXISTS Characters;
-- table for Characters: stores available characters for players to choose from
CREATE TABLE Characters(
    character_id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    player_id int,
    name varchar(255),
    level int NOT NULL DEFAULT 1,
    experience int NOT NULL DEFAULT 0,
    agility int NOT NULL DEFAULT 1,
    strength int NOT NULL DEFAULT 1,
    magic int NOT NULL DEFAULT 1,
    health int NOT NULL DEFAULT 1,
    FOREIGN KEY (player_id) REFERENCES Players(player_id)
);

-- data for Characters
INSERT INTO Characters VALUES
(63, 643, 'Wyll', 22, 22000, 50, 65, 65, 100),
(55, 89452, 'Gale', 1, 0, 15, 95, 80, 100),
(91, 16, 'Karlach', 45, 45000, 65, 85, 10, 100),
(65, 1801, 'Lae''zel', 9, 9000, 50, 65, 65, 100),
(8, 2576, 'Minthara', 4, 4000, 55, 65, 90, 100);

DROP TABLE IF EXISTS Items;
-- table for Items: an inventory of items availalbe in-game
CREATE TABLE Items(
    item_id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    item_desc TEXT NOT NULL,
    item_type ENUM('weapon', 'wearable', 'consumable', 'special') NOT NULL,
    item_stat int DEFAULT NULL
);

-- data for Items
INSERT INTO Items (item_desc, item_type, item_stat) VALUES 
('sword', 'weapon', 10),
('armor', 'wearable', 10),
('mushroom', 'consumable', 100),
('bullets', 'weapon', NULL),
('map', 'special', NULL),
('gun', 'weapon', 20),
('glasses', 'wearable', 5);

DROP TABLE IF EXISTS Character_Items;
-- table for Character_Items: an intersection table for characters and items, essentially a character's inventory
CREATE TABLE Character_Items(
    character_id int,
    item_id int,
    quantity int NOT NULL DEFAULT 1,
    FOREIGN KEY (character_id) REFERENCES Characters(character_id),
    FOREIGN KEY (item_id) REFERENCES Items(item_id)
);

INSERT INTO Character_Items VALUES
(63, 1, 1),
(63, 3, 5),
(63, 5, 1),
(55, 3, 5),
(91, 2, 1),
(91, 4, 100),
(91, 6, 1),
(65, 1, 1),
(65, 2, 1),
(65, 3, 5),
(8, 7, 1),
(8, 2, 1),
(8, 1, 1);

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
