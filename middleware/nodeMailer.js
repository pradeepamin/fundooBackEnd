const nodemailer=require('nodemailer');

exports.sendMail=(url,email)=>{
console.log("In node mailer",process.env.EMAIL,process.env.PASS)
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'process.env.EMAIL',
      pass: 'process.env.PASS'
    }
  });
  
  var mailOptions = {
    from: 'process.env.EMAIL',
    to: email,
    subject: 'Re-Set Password for Fundoo Application',
    text: url
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log("ERROR",error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });   
}
