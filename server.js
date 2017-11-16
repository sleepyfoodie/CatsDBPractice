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


app.listen(8081, () => {
    console.log('server is running on 8081');
})


// app.post('/felines', (req,res) => {
//     let newFeline = new Feline(req.body);
//     Feline.find({breed: req.body.breed})
//         .then(object=> {
//             if(object[0].breed === req.body.breed) {
//                 res.send({match: true});
//             }
//             else {
//                 newFeline.save()
//                     .then(savedObject => {
//                         res.json(savedObject);
//                     })
//                     .catch(err => {
//                         console.log(err);
//                         res.status(400).json({err})
//                     })
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(400)
//             .json({ err});
//         })
// })


// app.post('/links', (req,res) => {
//     let newLink = new Link(req.body);
//     newLink.save()
//         .then(savedObject => {
//             res.json(savedObject);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(400).json({err})
//         })
// })