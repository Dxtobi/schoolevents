const express = require( 'express' );
const path = require( 'path' );
//const events = require( "./data/events" ); // Static data
const dotenv = require( 'dotenv' );
const connectDB = require( './config/db' );
const userRoutes = require( './routes/userRoutes' );
const eventRoutes = require( './routes/eventRoutes' );
const { notFound, errorHandler } = require( "./middlewares/errorMiddleware" );


/* 
It's a due purpose project. Firstly a prototype for a custom event management solution. 
Secondly, a codebase for future education content (video tutorials). 
Therefore the many comments throughout the project. 
*/

const app = express();
dotenv.config();
connectDB();
app.use( express.json() );

// This is a static fake data for testing purpose only
// app.get( '/api/events', ( req, res ) => {
//     res.json( events );
// } );




app.use( '/api/users', userRoutes );
app.use( '/api/events', eventRoutes );

/* Deployment settings */
__dirname = path.resolve();
if ( process.env.NODE_ENV === 'production' ) {
    app.use( express.static( path.join( __dirname, '/frontend/build' ) ) );
    app.get( '*', ( req, res ) => {
        res.sendFile( path.resolve( __dirname, 'frontend', 'build', 'index.html' ) );
    } );
} else {
    // This route should be running only in development
    app.get( '/', ( req, res ) => {
        res.send( 'API is running' );
    } );
}




/* Deployment settings */

app.use( notFound );
app.use( errorHandler );

const PORT = process.env.PORT || 5000;

app.listen( PORT, console.log( `Server started on PORT ${ PORT }` ) );