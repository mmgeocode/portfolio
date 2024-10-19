const { text } = require("express");
const nodemailer = require("nodemailer");

// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account.' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...')
    
    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass,
        },
    });

    // Message object
    let message = {
        from: 'Sender Name <sender@example.com>',
        to: 'Recipient <recipient@example.com>',
        subject: 'Nodemailer test',
        text: 'Hello there!',
        html: '<p><b>Hello</b> there!</p>'
    }

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occured. ' + err.message);
            return process.exit(1)
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    })
    
})

// async function main() {
//     const info = await transporter.sendMail({
//         from: '""<>', // sender address
//         to: "", // list of receivers
//         subject: "", // subject line
//         text: "Hello World", // plain text body
//         html: "<b>Hello world?</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);
// }

// main().catch(console.error);