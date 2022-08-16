const nodemailer = require("nodemailer");
//require("dotenv").config()

const sendEmail = (options) => {
  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'support@weinvestbtc.com', //process.env.EMAIL,// generated ethereal user
      pass:'1Connected.'// process.env.PASSWORD, // generated ethereal password
    },
  });
  let details = {
    from:'support@weinvestbtc.com',//process.env.EMAIL,
    to: options.to,
    subject:  options.subject,
    html:  options.text,
  }
  
  transporter.sendMail(details, (err) => {
    if (err) {
     // console.log(err)
      return
    } else {
      return
      console.log('sent', err)
     // return navigate("/error");
    }
  })
  
 
};


const sendBulkMessage = ({ mails, text }) => {
    
    console.log(mails, text)
   // mails.map((e, i) => {
   //     sendEmail({to:e, subject:"New School Activity", text:text})
   // })
}


module.exports = sendBulkMessage;