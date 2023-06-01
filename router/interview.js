const express = require('express');
const router = express.Router();
const Interview = require("../modals/interview")
const moment = require("moment")

/*
    @usage : to create a interview
    @url : /api/interview/create
    @fields : start , end , [{participantId},{participantId}.....]
    @method : POST
    @access : PUBLIC

 */

router.post('/create',async (request,response)=>{
    try {
        const {start,end,participants} = request.body
        let gmtStart = new Date(start)
        let gmtEnd = new Date(end)

        if(participants.length < 2){
            return response.status(201).json({
                message:"please select atleast two participants"
            })
        }
        const interviews = await Interview.find({})
        const clashedInterviews = [];
        for (const interview of interviews) {
            if(gmtStart < interview.end && gmtStart > interview.start){
                clashedInterviews.push(interview)
            } else if(gmtEnd < interview.end && gmtEnd > interview.start) {
                clashedInterviews.push(interview)
            }
        }
        for (const clashedInterview of clashedInterviews) {
            for (const clashedInterviewParticipant of clashedInterview.participants) {
                for (const participantElement of participants) {
                    if(participantElement._id == clashedInterviewParticipant){
                        return response.status(202).json({
                            message:`time clash ! please select other time slot`
                        })
                    }
                }
            }
        }
        let interview = new Interview({start:gmtStart,end:gmtEnd,participants})
        const result = interview.save()
        console.log("-------------------------------------")
        response.status(200).json({
            message : 'interview created',
            createdInterview:result
        });

    }catch (error)  {
        console.error(error);
        response.status(500).json({errors : [{message : error.message}]});
    }
})


// get all interviews

router.get('/',async (req,response)=>{
    try {
        const interviews = await Interview.find().populate({path:'participants',populate: { path: 'participant' }})
        response.status(200).json({
            msg : 'get all participant success',
            interviews:interviews
        });
    }catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
})

module.exports = router;