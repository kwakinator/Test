var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3},
    polls:[{ type: Schema.Types.ObjectId, ref: 'Poll' }]
},{ timestamps: true })

mongoose.model('User', UserSchema);
var User = mongoose.model('User')
