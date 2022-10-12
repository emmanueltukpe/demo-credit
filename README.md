# Demo Credit

Demo Credit is a mobile lending app that requires wallet functionality. This is needed as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.

## Routes
POST /users/signup — create a user\
POST /users/login — auth a user

POST /accounts — create an account\
GET /accounts/:id/balance — get account balance\
POST /transactions/deposit — make a deposit\
POST /transactions/withdraw — make a withdrawal

POST /transactions/transfers — create a transfer\
GET /transactions — get all transactions

## To Run Locally ...

npm ci
npm run watch:tsc
npx knex migrate:latest
npm run start:dev

![](img/entity-relationship_diagram.png)