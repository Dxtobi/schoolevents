const jwt = require( 'jsonwebtoken' );
const User = require( '../models/userModel' );
const asyncHandler = require( 'express-async-handler' );

/*
This is a middleware with the purpose to intercept and validate 
user access rights before executing the actions to the database.
*/

const protect = asyncHandler( async ( req, res, next ) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith( "Bearer" )
    ) {
        try {
            // Split the header authorization ("Bearer"[0] "Token"[1]) argument
            token = req.headers.authorization.split( " " )[ 1 ];

            //Decode the token id
            const decoded = jwt.verify( token, process.env.JWT_SECRET );

            req.user = await User.findById( decoded.id ).select( "-password" );

            next();
        } catch ( error ) {
            res.status( 401 );
            console.log( error );
            throw new Error( "Not authorized, token failed" );
        }
    }

    if ( !token ) {
        res.status( 401 );
        throw new Error( "Not authorized, no token" );
    }
} );

module.exports = { protect };