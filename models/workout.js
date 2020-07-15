const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
      type: Date,
      default: () => new Date()
    },
    exercises: [
      {
        type: {
          type: String
        },
        name: {
          type: String
        },
        distance: {
          type: Number
        },
        duration: {
          type: Number
        },
        weight: {
          type: Number
        },
        reps: {
          type: Number
        },
        sets: {
          type: Number
        }
      }
    ],
      totalDuration: {
        type: Number,
        default: 0
      }
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;