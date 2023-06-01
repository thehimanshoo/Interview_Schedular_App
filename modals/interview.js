const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    start : {type : Date , required : true},
    end : {type : Date , required : true},
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Participant", required: 'true' }],
}, {timestamps : true});

module.exports  = mongoose.model('Interview' , interviewSchema);
