# DevTinder APIs
authRouter
- POST/signup
- POST/login
- POST/logout

Profile-Router
- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password

Connection-Requests
- POST/request/send/intereted/:userId
- POST/request/send/ignored/:userId
- POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId

userRouter
- GET/user/connections
- GET/user/requests
- GET/user/Feed

status: ignored, interested, accepted, rejected