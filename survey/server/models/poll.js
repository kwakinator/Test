var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PollSchema = new mongoose.Schema({
    question: { type: String, required: true, minlength: 8},
    option1: { type: String, required: true, minlength: 3},
    option2: { type: String, required: true, minlength: 3},
    option3: { type: String, required: true, minlength: 3},
    option4: { type: String, required: true, minlength: 3},
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },{ timestamps: true })

mongoose.model('Poll', PollSchema);
var Poll = mongoose.model('Poll')
