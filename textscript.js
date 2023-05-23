//

"use strict";
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: "your_email@example.com", // your real email address
		pass: "your_password", // your real password
	},
});

// send mail with defined transport object
transporter.sendMail(
	{
		from: '"Fred Foo 👻" <foo@example.com>', // sender address
		to: "bar@example.com, baz@example.com", // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Hello world?", // plain text body
		html: "<b>Hello world?</b>", // html body
	},
	function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent: %s", info.messageId);
			// Preview only available when sending through an Ethereal account
			console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
		}
	}
);
