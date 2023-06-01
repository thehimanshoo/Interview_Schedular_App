const express = require('express');
const router = express.Router();
const Participant = require("../modals/participant")

/*
    @usage : to create a participant
    @url : /api/participant/create
    @fields : name , email , [{interview},{interview}.....]
    @method : POST
    @access : PUBLIC

 */
router.post('/create',async (request,response)=>{
    try{
        const {name,email,interviews} = request.body;
        let participant = new Participant({name,email,interviews})
        const result = await participant.save()
        response.status(200).json({
            msg : 'participant created',
            result:result
        });
    }catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
})


router.get('/',async (req,response)=>{
    try {
        const participants = await Participant.find()
        response.status(200).json({
            msg : 'get all participant success',
            participants:participants
        });
    }catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
})

module.exports = router;