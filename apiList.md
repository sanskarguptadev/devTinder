# Dev Tinder Apis

#   authRouter
    - POST /signup
    - POST /login
    - POST /logout

#    profileRouter
    - PATCH /profile/edit
    - GET /profile/view
    - PATCH /profile/password

#    connectionRequestRouter
    - POST  /request/send/interested/:profileId
    - POST /request/send/ignore/:profileId
    - POST /request/review/accept/:requestId
    - POST /request/review/rejected/:requestId

#    userRouter
    - GET /user/connections
    - GET /user/requests/received
    - GET /user/feed 