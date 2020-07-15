const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;
const db = require("./models");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.get("/api/workouts", function (req, res) {
    db.Workout.find({})
        .then( data =>  res.json(data) )
        .catch( err => res.json(err) )
});

app.post("/api/workouts", function (req, res) {
    db.Workout.create({})
        .then(data => {
            console.log(`POST api/workouts HERE ${data}`)
            res.json(data)
        })
        .catch(err => {
            console.log("err", err)
            res.json(err)
        })
});

app.put("/api/workouts/:id", ({ body, params }, res) => {
    console.log('ID ===== ', params.id)
    console.log(`-----BODY------`, body.reps)
    db.Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body }, $inc: {totalDuration: body.duration} },
        { new: true, runValidators: true }
    )
        .then(data => {
            res.json(data)
            console.log(`PUT api/workouts/id HERE ${data}`)
        })
        .catch(err => {
            console.log("PUT Error occurs ", err)
            res.json(err)
        })
});

app.get("/api/workouts/range", function(req, res){
    console.log('[[GET]] /workouts/range', req.body);
    db.Workout.find({})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
})

app.post("/api/workouts/range", function(req, res){
    console.log('[[GET]] /workouts/range', req.body);
    db.Workout.create({})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
})

// APP GET PATH TO DIRECT HTML
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", function (req,res){
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", function(req, res){
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});