const express = require( 'express' );
const { registerUser, authUser, updateUserProfile, admins } = require( '../controllers/userControllers' );
const { protect } = require( '../middlewares/authMiddleware' );

/*
These are the sever side routers generated.
To access the events (POST)
*/

const router = express.Router();

router.route( '/' ).post( registerUser );
router.route( '/login' ).post( authUser );
router.route( '/profile' ).post( protect, updateUserProfile );
router.route( '/admins' ).get( protect, admins );
module.exports = router;