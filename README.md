# CS340 Portfolio Project - FutureGadgetDB

## Table of Contents
[Technologies Used](##-technologies-used)
[The Database](##-the-database)
    [Sessions](###-sessions)
        [Relationship with Players](####-relationship-with-players)
    [Players](###-players)
        [Relationship with Sessions](####-relationship-with-sessions)
        [Relationship with Characters](####-relationship-with-characters)

This project revolves around ocnnecting a normalized atabase to a web application. This project was
done in collaboration with [Tiffany Gorseth](https://github.com/togrseth).

## Technologies Used
- Node.js with the following packages/modules
    - Express to run the web server
    - Handlebars for templating
    - Forever for keepign the site live
    - MySQL for database integration
- MariaDB to host the database

## The Database
![Database Schema]()

### Sessions
Session entities represent game sessions running on a server. They contain attributes for the session's
start time, the number of players within the session, and the current map location of the session.

#### Relationship with Players
The Sessions table has a 1:M relationship with Players table. Multiple players can be assigned to
one session, but each player can only be part of one session. 

### Players
Player entities represent players both in and out of sessions. You can think of them as a user account.
This implementation is pretty simple, containing only a username attribute, and a foreign key attribute
representing the session id of the server assigned to the player. This foreign key can also be NULL, 
meaning that the player is not within any session. 

#### Relationship with Sessions
See [Sessions Relationship with Players](####relationship-with-players) section.

#### Relationship with Characters
Players have a 1:M relationship with Characters, as Players can have mutliple Characters tied to their
account. However, Characters can only be tied to one account.
