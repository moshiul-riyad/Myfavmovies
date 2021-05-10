// DEVELOPMENT MODE
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/boilerplate');
app.use(expressLayouts);
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error!!!:"));
db.once("open", () => {
    console.log("Database Connected!!!");
})

app.use('/', indexRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`SERVER IS LISTENING ON PORT ${port}`);
})