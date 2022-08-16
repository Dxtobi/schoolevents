const express = require( 'express' );
const { getEvents, createEvent, getEventById, updateEvent, deleteEvent, getMyEvents} = require( '../controllers/eventController' );
const { protect } = require( '../middlewares/authMiddleware' );

/*
These are the sever side routers generated.
To access the events (GET, POST, PUT, DELETE)
*/

const router = express.Router();
router.route('/').get(protect, getEvents);
router.route( '/allmine' ).get( protect, getMyEvents );
router.route( '/all' ).get( getEvents );
router.route( '/create' ).post( protect, createEvent );
router.route( '/:id' ).get( getEventById ).put( protect, updateEvent ).delete( protect, deleteEvent );


module.exports = router;