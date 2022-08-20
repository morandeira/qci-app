# QCI App with Nodejs and MariaDB

QCI App is a Multi Page Application using Nodejs and MariaDB. The purpose of this web application is to be applied to an industrial process of saving records

### Installation

```
mysql -u MYUSR "-pMYPASSWORD" < ./database/db.sql # create database
npm i
npm run build
npm start
```

# Queries added to .env

INSERT_DEFAULT = "INSERT INTO Defaults set ?"
DELETE_DEFAULT = "DELETE FROM Defaults WHERE id = ?"
RENDER_DEFAULTS = "SELECT * FROM Defaults WHERE user_id = ?"
RENDER_DEFAULT = "SELECT * FROM Defaults WHERE id = ?"
UPDATE_DEFAULT = "UPDATE Defaults set ? WHERE id = ?"

SELECT_DEFAULTS = "SELECT * FROM Defaults"

INSERT_ETICOLOR = "INSERT INTO Eticolors set ?"
DELETE_ETICOLOR = "DELETE FROM Eticolors WHERE id = ?"
RENDER_ETICOLORS = "SELECT * FROM Eticolors WHERE user_id = ?"
RENDER_ETICOLOR = "SELECT * FROM Eticolors WHERE id = ?"
UPDATE_ETICOLOR = "UPDATE Eticolors set ? WHERE id = ?"

SELECT_ETICOLORS = "SELECT * FROM Eticolors"

INSERT_PART = "INSERT INTO Parts set ?"
DELETE_PART = "DELETE FROM Parts WHERE id = ?"
RENDER_PARTS = "SELECT * FROM Parts WHERE user_id = ?"
RENDER_PART = "SELECT * FROM Parts WHERE id = ?"
UPDATE_PART = "UPDATE Parts set ? WHERE id = ?"

SELECT_PARTS = "SELECT * FROM Parts"

INSERT_REGISTER = "INSERT INTO Registers set ?"
DELETE_REGISTER = "DELETE FROM Registers WHERE id = ?"
RENDER_REGISTERS = "SELECT * FROM Registers WHERE user_id = ?" 
RENDER_REGISTER = "SELECT * FROM Registers WHERE id = ?"
UPDATE_REGISTER = "UPDATE Registers set ? WHERE id = ?"

SELECT_USERS_by_USERNAME = "SELECT * FROM Users WHERE username = ?"
INSERT_USER = "INSERT INTO Users SET ?"
SELECT_USERS_by_ID = "SELECT * FROM Users WHERE id = ?"

## File Structure

- database, it the folder with all the sql queries, you can use to recreate the database for this application
- src, it's all the code for the Backend and Frontend Application

## Environment Variables

- queries
- PORT
- Database connection

## Old Versions of this Project

## Todo

1. [x] Improve Links Routes
1. [ ] Write Route Validation with Express Validator
1. [ ] Add docker compose production build
1. [ ] Allows users to signup with email and no username
1. [ ] Add nodemailer for transactional emails

## Tools

- Nodejs
- MariaDB (MySQL)
- Babel
- Docker

# Resources

# qci-app

## Thanks

I want to thank Fazt for displaying his knowledge and publications, which has been the basis of my application.
