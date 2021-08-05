const mongoose = require("mongoose");

const CovidSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  cases: {
    type: Number,
    required:true,
  },
  deaths: {
    type: Number,
    required:true,
  },
  state: {
    type: String,
    required:true,
    default: ""
  },
  date: {
    type: Date,
    required:true,
  }
},
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Covid Data", CovidSchema);