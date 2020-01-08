require('dotenv').config()

var express = require('express');
var port = process.env.PORT || 3000

var usersRouter = require('./routes/users');
var journalsRouter = require('./routes/journals');



var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/user', usersRouter);
app.use('/api/journal', journalsRouter);

app.listen(port, () => {
    console.log(`Server started on port :`+port+``);
});
