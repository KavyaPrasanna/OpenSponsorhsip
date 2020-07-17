const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {uuid} = require('uuidv4');

var athleteSchema = new Schema({
  basic_info: {
        athlete_id: { type: String,
                      default: uuid()},
        name : { type: String,
                required: true},
        // dob : {type: Date,
        //       required: false},
        nationality : { type: String,
                      required: true},
        location : { type: String,
                    required: true},
        association : { type: String,
                      required: true},
        team : { type: String,
                required: true},
        gender : {type: String,
                  enum: ['male', 'female', 'prefer_not_to_say'],
                      required: true},
        sports : { type: String,
                    enum : ["Golf",
                      "Tennis",
                      "Cricket",
                      "Basketball",
                      "Baseball",
                      "American Football",
                      "Aquatics",
                      "Archery",
                      "Automobile Racing",
                      "Badminton",
                      "Beach Volleyball",
                      "Bobsleigh",
                      "Body Building",
                      "Boxing",
                      "Cross_Country_Running",
                      "Cross Country Skiing",
                      "Curling",
                      "Cycling",
                      "Darts",
                      "Decathlon",
                      "Down_Hill_Skiing",
                      "Equestrianism",
                      "eSports",
                      "Fencing",
                      "Field Hockey",
                      "Figure Skating",
                      "Gymnastics",
                      "Ice Hockey",
                      "Martial Arts",
                      "Mixed Martial Arts",
                      "Modern Pentathlon",
                      "Motorcycle Racing",
                      "Netball",
                      "Polo",
                      "Racquetball",
                      "Rowing",
                      "Rugby",
                      "Sailing",
                      "Softball",
                      "Shooting",
                      "Skateboarding",
                      "Skeet Shooting",
                      "Skeleton",
                      "Snow Boarding",
                      "Soccer (Football)",
                      "Squash",
                      "Surfing",
                      "Swimming",
                      "Track and Field"],
                    required: true}
  },
  about : {
    interests : { type: String,
                  required: true},
    charities : { type: String,
                  required: true},
    pets : { type: String,
                  required: true},
    drinks_alcohol : { type: String,
                  enum : ['yes', 'no'],
                  required: true},
    married : { type: String,
                  enum : ['yes', 'no'],
                  required: true}
  },

  social_media_handles : { type: String,
                enum : ['Facebook', 'Twitter', 'Instagram', 'Youtube', 'Twitch', 'Snapchat']},

})

module.exports = mongoose.model('Athlete', athleteSchema);
