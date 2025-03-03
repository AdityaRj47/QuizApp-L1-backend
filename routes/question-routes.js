
const express = require("express");
const router = express.Router();
const QuestionModel = require("../models/questions-model");

const MAX_QUESTION_COUNT = 10;

// "/" get all questions
router.get("/",async(req,res) =>{
    try{
        const questions = await QuestionModel.aggregate([
            {$sample:{size: MAX_QUESTION_COUNT}},
            {$project:{question:1, options:1}},
        ]);
        res.status(200).json({questions});
    }catch(error){
        console.error("Error fetching questions: ", error.message);
        res.status(500).json({success: false, message: error.message});
    }
});

// "/validate-answer"
 router.post("/validate-answer",async (req,res) =>{
   try{
//1.extract the data i.e. id, answer object, answer .id
     const {id,answer} = req.body;
//2.check the req is valid or not
     if((!id || !answer || !answer.id || !answer.value)){
        return res.status(400).json({message: "Invalid request!!"});
     }   
//3.check if the question exists or not
     const questionObj = await QuestionModel.findById(id);
     if(!questionObj){
        return res.status(400).json({message:"Question does not exists!!"});
     }
//4.validate the user answer
     if( questionObj.answer.id === answer.id && 
        questionObj.answer.value === answer.value
      ) {
//5. return the result
        return res. status(200).json({status:1, message:"Correct ans"});
      }
      return res. status(200).json({status:0, message:"Wrong ans"});
//6. handle the errors
   }catch(error){
      console.error("Error creating task:",error);
      res.status(500).json({success: false, message: error.message});
   }
 });


module.exports =router;
