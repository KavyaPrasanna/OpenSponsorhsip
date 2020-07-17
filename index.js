const express = require('express');
const app = express();
const port = 3002;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const athlete = require('./Model/athlete');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,content-type, Content-Type, Accept, Authorization');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

mongoose.connect('mongodb://Athlete:Vihaanvihaan123!@ds133622.mlab.com:33622/heroku_529whx69', {useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
mongoose.connection.on('error', err => {
  logError(err);
});

app.get('/profiles', (req, res) => {
  athlete.find({}, (err, resp) => {
    if(err){
      console.error(err);
    }else {
      console.log(resp);
      res.status(200).send(resp);
    }
  })
})

app.post('/profile',(req, res) => {
  console.log("PPPP "+JSON.stringify(req.body));
  const newAthelete = new athlete({
    basic_info: {
      name : req.body.basic_info.name,
      dob : req.body.basic_info.dob,
      nationality : req.body.basic_info.nationality,
      location : req.body.basic_info.location,
      association : req.body.basic_info.association,
      team : req.body.basic_info.team,
      gender : req.body.basic_info.gender,
      sports : req.body.basic_info.sports,
    },
    about : {
      interests : req.body.about.interests,
      charities : req.body.about.charities,
      pets : req.body.about.pets,
      drinks_alcohol : req.body.about.drinks_alcohol,
      married : req.body.about.married
    },
    social_media_handles : req.body.social_media_handles
    // profile_image: req.body.profile_image
  })

  newAthelete.save((err, ans) => {
    if(err){
      console.error(err);
    }else{
      res.status(200).send("Added Successfully!");
    }
  })
})

app.listen(port, () => {
  console.log(`app running on the port ${port}`);
})
