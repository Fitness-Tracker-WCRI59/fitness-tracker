const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// sets a schema for the username/password

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  userStats_id: {
    type: Schema.Types.ObjectId,
    ref: 'health'
  },
});

const User = mongoose.model('user', userSchema)

// sets a schema for the user health stats

const statsSchema = new Schema({
  height: Number,
  weight: { type: Number, required: true },
  sex: { type: String, required: true },
  targetWeight: { type: Number, required: true },
  targetDate: { type: Number }
});

const Stats = mongoose.mode('stats', statsSchema);

/*


*/