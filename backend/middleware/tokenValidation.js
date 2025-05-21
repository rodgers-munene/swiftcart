const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')


const validateToken = asyncHandler( async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization

    if(authHeader && authHeader.startsWith("Bearer")){
        // split bearer from the token
        token = authHeader.split(" ")[1];

        // validate the jwt token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(401);
                console.log(err)
                throw new Error("User not authorised");
            }
            req.user = decoded.user;
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("User not authorised or token missing");
        }

    } 

 })

 module.exports = validateToken