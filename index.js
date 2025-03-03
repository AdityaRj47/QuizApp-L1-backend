require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require ("cors");

const port = process.env.PORT || 6001;
const mongodbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/QUIZ";

mongoose
    .connect(mongodbUrl)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) =>{
        console.error("MongoDB connection failed: ", error.message);
    });

const app = express();
app.use(express.json(), cors());

//Add the Default route
app.get("/",(req,res) =>{
  res.json({message: "Server is running"});
});

//Import and use route
const questionRoutes = require("./routes/question-routes");
app.use("/v1/questions", questionRoutes);
// To send the route from the same endpoints, For example:
//http://localhost:4000/v1/questions/
//http://localhost:4000/v1/questions/validate-answer
  

const startTime = Date.now();
app.listen(port, ()=>{
     const endTime = Date.now();
     console.log(`Server running on port ${port}, Time Taken: ${endTime - startTime}ms`);
});
