require('dotenv').config();
let nodemailer = require('nodemailer');
let environment = process.env;

module.exports.EmailTransport = nodemailer.createTransport({
    service: environment.EMAIL_SERVICE_NAME,
    host: environment.EMAIL_SERVICE_HOST,
    secure:environment.EMAIL_SERVICE_SECURE,
    port: environment.EMAIL_SERVICE_PORT,
    auth: {
        user: environment.EMAIL_USER_NAME,
        pass: environment.EMAIL_USER_PASSWORD
    }
});

module.exports.ViewOption = (transport, hbs) => {
    transport.use('compile', hbs({
            viewEngine: {
                extName: '.hbs',
                partialsDir: 'view/email',
                layoutsDir: 'view/email',
                defaultLayout: 'email.hbs',
            },
            viewPath: 'view/email',
            extName: '.hbs'
    }));
}