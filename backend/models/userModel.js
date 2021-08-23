const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcryptjs' );

/*
Mongo schema (data model) for the database
*/

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        pic: {
            type: String,
            required: true,
            default:
                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
        },
    },
    {
        timestamps: true,
    }
);

// Verify the password
userSchema.methods.matchPassword = async function ( enteredPassword ) {
    return await bcrypt.compare( enteredPassword, this.password );
};

// Encrypt password before it is saved to the database
userSchema.pre( "save", async function ( next ) {
    if ( !this.isModified( "password" ) ) {
        next();
    }
    const salt = await bcrypt.genSalt( 10 );
    this.password = await bcrypt.hash( this.password, salt );
} );

const User = mongoose.model( "User", userSchema );

module.exports = User;