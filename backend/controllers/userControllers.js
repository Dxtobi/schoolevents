const asyncHandler = require( 'express-async-handler' );
const User = require( '../models/userModel' );
const generateToken = require( '../utils/generateToken' );

/*
This is a "controller" (a logic model) where the business logic will occur 
between the entity and API (service layer). 
*/

const registerUser = asyncHandler( async ( req, res ) => {
    console.log('hit')
    const { name, email, password, pic, admin } = req.body;

    //console.log(req.body)
    const userExists = await User.findOne( { email } );

    if ( userExists ) {
        res.status( 400 );
        throw new Error( "User Already Exists" );
    }

    const user = await User.create( {
        name,
        email,
        password,
        pic,
        admin
    } );

    if ( user ) {
        res.status( 201 ).json( {
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            pic: user.pic,
            token: generateToken( user._id )
        } );
    } else {
        res.status(400);
        console.log('error')
        throw new Error( "Error Ocurred" );
    }
} );


const authUser = asyncHandler( async ( req, res ) => {

    const { email, password } = req.body;
    const user = await User.findOne( { email } );

    if ( user && ( await user.matchPassword( password ) ) ) {
        res.json( {
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            pic: user.pic,
            token: generateToken( user._id )
        } );
    } else {
        res.status( 401 );
        throw new Error( "Invalid Email or Password!" );
    }
} );

const admins = asyncHandler(async (req, res) => {
    console.log( req.user)
    const user = await User.findById( req.user._id );

    if ( user.admin === true ) {
        const users = await User.find()
        res.status( 200 ).send(users)
    } else {
        res.status( 404 );
        throw new Error( "User Not Found" );
    }

} );

const updateUserProfile = asyncHandler( async ( req, res ) => {
    const user = await User.findById( req.user._id );

    if ( user ) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.pic = req.body.pic || user.pic;


        if ( req.body.password ) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json( {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            pic: updatedUser.pic,
            isAdmin: updatedUser.isAdmin,
            token: generateToken( updatedUser._id ),
        } );
    } else {
        res.status( 404 );
        throw new Error( "User Not Found" );
    }

} );



module.exports = { registerUser, authUser, updateUserProfile, admins };