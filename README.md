## NodeJs REST API TEMPLATE

[Test the API here](https://rest-api-templates.herokuapp.com/)

## Dcumentation

[Clicl here for th documentation]

## List of Functions

- SignUp and Login
- Forget and Reset password
- Email Account verification
- Login with Google, Facebook etc
- JWT Authentication for API
- Integrating chat
- Database
  - Mongodb CRUD
  - Firebase CRUD
  - MySQL CRUD
- data validations
- API calls/request
- hashing passwords
- Setting Up routes
- creating private routes
- Authentication with jwt
- validation
- File Upload

## Projects Steps

- Setup the folder strcuture to follow MVC pattern

  - Routes
  - Validations
  - Models
  - Controllers
  - Middlewares
  - erros
  - setup the .env file to save sensitive data
  - import/ require all the neccesary packages needed.

- Add a CI/CD Pipeline

  - Travis CI for CI/CD Pipeline
  - Circlici for Ci/CD Pipeline

- Connect to database
  - MongoDb
  - Firebase
  - MySQL
- Requirements
  - Login
  - Signup/ Register
  - Validation
  - Authentication
- Deploy/ Dockerize
  - Heroku
    - Create a Procfile to give an Instruction of how to run the App
    - Specify the port for heroku to use with process.env.PORT
  - AWS
  - GCP
  - Azure
- Test
  - Automated Test for the endpoints

## Done Features

- Standard and scalable folder structure setup
- Validate user inputs both for login and signup using @hapi/joi
- Hash pasword with bcrypt
- verify unregisered users
- Verify Incorrect password
- complete Login and Signup endpoints successfully
- generate token for login users using Jsonwebtoken
- protect urls for only login users
