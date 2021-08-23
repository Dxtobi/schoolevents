const jwt = require( 'jsonwebtoken' );

/*
Token generator function.
This is a simple case application, so this token management is for illustration purposes.
For a production-grade application, more robust methods would be applied, including a token refresh event handler.
*/

const generateToken = ( id ) => {
    return jwt.sign( { id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    } );
};

module.exports = generateToken;