# Demo Credit

Demo Credit is a mobile lending app that requires wallet functionality. This is needed as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.

## Routes
POST /users/signup — create a user\
POST /users/login — auth a user

POST /accounts — create an account\
GET /accounts/:id — get account balance\
POST /deposit — make a deposit\
POST /withdraw — make a withdrawal

POST /transfers — create a transfer\
GET /transfers — get all transactions

![](img/entity-relationship_diagram.png)