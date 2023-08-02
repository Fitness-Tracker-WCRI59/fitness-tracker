const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// sets a schema for the username/password

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: {type: String, required: true},
  age: { type: Number },
  height: {type: Number },
  weight: { type: Number },
  sex: { type: String },
  goal: { type: Number },
  // userStats_id: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'stats'
  // },
  // stats: statsSchema
});

// stats: [ statsSchema ]

const User = mongoose.model('user', userSchema)

// sets a schema for the user stats

// const statsSchema = new Schema({
//   height: Number,
//   weight: { type: Number, required: true },
//   sex: { type: String, required: true },
//   targetWeight: { type: Number, required: true },
// });

// const Stats = mongoose.model('stats', statsSchema);


// create potential schema for progress / goal tracking

module.exports = {
  User,
//   Stats,
}