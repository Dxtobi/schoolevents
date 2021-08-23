const mongoose = require( "mongoose" );

/*
Mongo schema (data model) for the database
*/

const eventSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        pic: {
            type: String,
            required: true,
            default:
                "https://res.cloudinary.com/practicaldev/image/fetch/s--P-zvMTgt--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/qyix6eyhrnc8x9c44yp2.jpg",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Event = mongoose.model( "Event", eventSchema );

module.exports = Event;