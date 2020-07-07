## Singledoctor

<img src='./logo.png' height='100'>

[docs](http://localhost:5000/api-docs/) • [demo]()<br><br>

This is the best platform for finding the best doctor that get to know more about your illness and give you an adequate treatment.
<br/>

## The Application specfications

- Blog CRUD
  - Create new Blog
    - Authenticated Users only
    - Must have a Role Admin or Publisher
    - Publisher can create multiple blog
  - Update a Blog
    - Admin Only
  - Delete Blog
    - Admin Only
  - Filter a specific Blog
    - Everyone
- Forum CRUD
  - Create new Forum Post
    - Only admin can create a forum post
  - Delete
- Doctor Services CRUD
  - patient can schedule a treatment Appointmnt with the doctor.
    - Collect the patient name
    - Schedule a time
    - Collect the treatment details.
    - Patient email if not a registered user
    - Cost: free, discounted,
    - Generate a treatment appointment link with Google Meet and send to the patient.
- User & Authentication

  - Authentication will be done using JWT/cookies
  - Database Setup with Mongodb Atlas
  - User Model/schema/methods
  - Doctor Registration

    - Register a doctor as "user"
    - validate the inputs provided by the user
    - Once registered, a token will be sent along with a cookie(token)
    - Passwords must be harshed

  - Doctor Activation

    - An email will be sent to confirm a doctor registration before saving in the database
    - Once Activated, then doctor can login

  - Doctor Register with Gmail
    - Get Google client ID and Client Secret
    - Collect the user Info from the API
    - Check if the user already exist and Login
    - if the user does not exist, register the user.
  - Doctor Login with Gmail
    - verify if the email exists and allow to login if exists.
  - Doctor Login
    - verify unregisered users before login
    - Verify Incorrect password
    - User must activate email before login
    - user can Login with Google gmail account
    - user can Login with email and password
    - Plain text will be compare with stored hashed password
    - Once Logged in, a token will be sent along with a cookie.
    - redirect to the home page
  - Doctor logout
    - Cookie will be sent to set token = none
  - Get the currently logged in doctor
    - Route to get the currently logged in user (via token)
  - Doctor Reset/Update password (lost pasword)
    - Check if the user exits in the database
    - send an email link for retrieving password.
    - A hashed token will be emailed to the users registered email address
    - Take the user to a reset password page(url) where user can input new details
    - Resend Forget password by user if the link has expired
    - Verify OTP and Resend OTP
    - A hashed token will be emailed to the user registered email address
  - Update User info
    - Authenticated user only
    - Seperate routes to update password.
  - User CRUD

## Documentation

- Postman for documentation
- docgen to generate html files from published postman documentation
- Swagger Auto-generate documentation

## Deployment (AWS) & Automation

- Push to Github
- deploy through circleci job and workflow
- Dockerize with and push image to docker hub

## Security

- Encrypt passwords and reset tokens
- protect urls for only login users with thier token and specify the expire time.
- Prevent cross site scripting -XSS
- Prevent NoSQL Injections
- Protect against http param polution
- Add heades for security (helmet)
- Use cors to make API public

## Suggestions

- session flash connect
- express-session

## Installation

`npm run dev`
`http://localhost:5000/api-docs/`
