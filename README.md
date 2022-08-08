# QCI App with Nodejs and MariaDB

QCI App is a Multi Page Application using Nodejs and MariaDB. The purpose of this web application is to be applied to an industrial process of saving records

### Installation

```
mysql -u MYUSR "-pMYPASSWORD" < ./database/db.sql # create database
npm i
npm run build
npm start
```

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
