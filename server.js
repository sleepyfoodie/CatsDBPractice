const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/data/db/');
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to db at /data/db/")
});


const Feline = require('./models/felines');
const Link = require('./models/links');

//CREATE
app.post('/felines', (req,res) => {
    let newFeline = new Feline(req.body);
    newFeline.save()
        .then(savedObject => {
            res.json(savedObject);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({err})
        })
})

//READ
app.get('/felines', (req,res) => {
    Feline.find({})
        .then(object => {
            res.json(object);
        })
        .catch(err => {
            console.log(err);
            res.status(400)
                .json({err});
        })
})


//For Deployment
//middleware for express server to set up folder to serve static files (for access to all bundle.js and images)
app.use(express.static(__dirname + "/frontend/build"))


app.get("*", (req,res) => {
    console.log("server running on ubuntu")
    res.sendFile('index.html', {root: __dirname + "/frontend/build"});
})

app.listen(process.env.PORT || 8081, () => {
    console.log('SERVER RUNNING ON 8081');
})