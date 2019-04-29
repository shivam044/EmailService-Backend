const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(3000, () => {
    console.log("The server started on port 3000 !!!!!!");
});

app.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
        console.log('The mail has beed sent');
        res.send(info);
    });
});

async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: details.email,
            pass: details.password
        }
    });

    let mailOptions = {
        from: user.fromemail, // sender address
        to: user.toemail, // list of receivers
        subject: "Welcome to Email Service", // Subject line
        html: user.editor
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info);
}