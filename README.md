## NodeJs REST API TEMPLATE

[Test the API here](https://rest-api-templates.herokuapp.com/)

## Documentation

[Click here for th documentation]()

## User Authentication and Authorization Features

- User data Model
- Setup all the Auth Routes
- Validate user inputs both for login and signup using @hapi/joi
- Hash pasword with bcrypt
- verify unregisered users before login
- Verify Incorrect password
- User must activate email before login
- complete Login and Signup endpoints
- Forget and Reset Password enpoints
- Resend Forget password by user if the link has expired
- Remeber me :persist Login
- generate token for login users using Jsonwebtoken
- protect urls for only login users with thier token and specify the expire time.

- Oauth with Google using google-auth-library
- Cookies, Session and Local storage for token.
- Session Time Out

## Notes

- authntication : verifying identity (401, unathorized)
- authorization: verifying permission (403, forbidden)
- stateful: session using a cookie with session ID
- stateless: token using JWT/OAuth/other
