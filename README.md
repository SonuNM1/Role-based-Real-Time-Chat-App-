## Seeding 

- Seeding means inserting initial default data into the database - usually: 

    - Admins 
    - Roles
    - Test data 

- In this project, we'll seed one default admin user into the database when the server starts (so there's always at least one admin)

- Seeding ensures we have a default verified admin at server start 

- Admins can't sign up - only created manually or via dashboard 

- Signup flow stays safe for users only 

#### Why are we seeding an Admin? 

According to this project: 

- Only users can sign up 

- Admins cannot sign up

- Admins can only be created by other admins 

So we need at least 1 initial admin in the database to begin with. 

#### Process flow 

- When server starts, check if admin user exists. 

- If not, create it (with default name/email/password)

- Admin data is not exposed via signup - only through protected routes 


## Admin creates another admin 

Only an authenticated admin can create a new admin via a POST request like /api/admin/create 

- Client (admin) makes a POST request to /api/admin/create with new admin details 

- Request includes JWT in headers 

- Middleware verifies token and checks if the user has 'admin' role 

- If valid: Create new admin (mark as verified)

- Return success response 

-----------------------------------------------

admin id : 681cb965819a8793e32dd35d 
admin jwt : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODFjYjk2NTgxOWE4NzkzZTMyZGQzNWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDY3MzIyNDAsImV4cCI6MTc0NjczNTg0MH0.lVoMOVIpopQuEk00IngEX-GCwAQFGjQSb6fpqa-Kvlc

garima id: 681ce3f986d13a26e1ebf0ea
garima jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODFjZTNmOTg2ZDEzYTI2ZTFlYmYwZWEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc0NjczMjMyNiwiZXhwIjoxNzQ2NzM1OTI2fQ.Jaoyo5np843KFSpirkVrP5eHZ_ZX7O0SOsmkUW3jyZs