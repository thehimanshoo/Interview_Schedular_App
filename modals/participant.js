const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    interviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Interview"}],
}, {timestamps : true});

module.exports = mongoose.model('Participant' , participantSchema);

