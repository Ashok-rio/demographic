const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  phone:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  },
  gender:{
    type: String,
    required: true
  },
  area:{
    type: String,
    required: true
  },
  state:{
    type: String,
    required:true
  },
  district:{
    type: String,
    required:true
  }
},{timestamps:true});


UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('User', UserSchema);