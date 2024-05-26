--CREATE player 
INSERT INTO Players (player_id, username, session_id)

VALUES (
    :player_id,
    :username,
    :session_id_from_the_dropdown_Input
);

--RETRIEVE all players
SELECT player_id, username, session_id FROM Players;

--DELETE player from a session
DELETE FROM Players
WHERE session_id = session_id_from_the_dropdown_Input;

--UPDATE player 
SELECT player_id, username, session_id FROM Players
WHERE player_id = :username_selected_from_table
