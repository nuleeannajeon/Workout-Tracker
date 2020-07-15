const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
      type: Date,
      default: () => new Date()
    },
    exercises: [
      {
        type: String,
        name: String,
        distance: Number,
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number
      }
    ],
    totalDuration: {
      type: Number
    }
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;