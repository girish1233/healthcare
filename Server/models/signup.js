const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
const Signup = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    
    
    
    
})
Signup.post("save", async function(doc){
  let transporter = nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    }
  });
  let info = await transporter.sendMail({
    from:'Med',
    to:doc.email,
    subject:"new account created",
    html:`<h1>hello ${doc.name}<h1></br> Your Account is ready to Use`
  })
  console.log(info)
})
module.exports = mongoose.model("signup",Signup);
