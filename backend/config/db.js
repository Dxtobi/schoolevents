const mongoose = require( "mongoose" );

/*
An async function setting up a connection to the Mongo database.
Add private MONGO_CONNECTION to connect to the Mongo service.
*/
const conextDB = async () => {
    try {
        const connect = await mongoose.connect(
            process.env.MONGO_CONNECTION,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
            },
        );
        // Log for informative purpose
        console.log( `MongoDB Connected: ${ connect.connection.host }` );
    } catch ( error ) {
        // Log for informative purpose
        console.log( `Error: ${ error.message }` );
    }
};

module.exports = conextDB;