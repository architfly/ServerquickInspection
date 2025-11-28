

module.exports.main = async(req ,res)=>{
    try {
        const data = {name: "Aditya" , title:"panday"};
        return res.send(data);
    } catch (error) {
        return res.send(`**************This is error*********** ${error}`);
    }
}   



module.exports.healthchecker = async(req , res)=>{
    try {
        return res.status(200).json({
            message:"Every Thing Good"
        })
    } catch (error) {
       return res.status(404).json({
         message:"Error in Container Health"
       }) 
    }
}

// qijd sukq smib uzav
 

require("dotenv").config();
const nodemailer = require("nodemailer");
const crypto = require("crypto"); // For generating OTP

module.exports.OtpMail = async (req, res) => {
  try {
    console.log(`body hai ye ${req.body.email}`)
    const  email  = req.body.email; // User's email from request

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999);

    // Configure Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER || "atom.data.01@gmail.com", // Your Gmail
        pass: process.env.GMAIL_PASS || "qijd sukq smib uzav", // App Password (Not actual Gmail password)
      },
    });

    // Email content
    const mailOptions = {
      from: "atom.data.01@gmail.com",
      to: email ,
      subject: "Your OTP Code Aditya",
      text: `Your OTP is: ${otp}. This OTP is valid for 10 minutes. Aditya Check`,
    };

    // Send Email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: " + info.response);
    return res.status(200).json({ message: "OTP sent successfully", otp }); // (For dev, remove OTP in production)
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return res.status(500).json({ error: "Failed to send OTP email" });
  }
};





// task mail api G mail logic

module.exports.HandleSendTaskEmail = async (req, res) => {
  try {
    console.log(`body hai ye ${req.body.email}`)
    const  email  = req.body.email; // User's email from request

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999);

    // Configure Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER || "atom.data.01@gmail.com", // Your Gmail
        pass: process.env.GMAIL_PASS || "qijd sukq smib uzav", // App Password (Not actual Gmail password)
      },
    });
    const tasktitle = req.body.tasktitle;

    // Email content
    const mailOptions = {
      from: "atom.data.01@gmail.com",
      to: email ,
      subject: "You Have Been Assigned New Task",
      text: `Hii   
       
      ${tasktitle}
      
      `,
    };

    // Send Email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: " + info.response);
    // return res.status(200).json({ message: "OTP sent successfully", otp }); 
    return res.status(200).json({ message: "Message Email Sent" }); 
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return res.status(500).json({ error: "Failed to send OTP email" });
  }
};
