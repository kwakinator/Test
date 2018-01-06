var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BikeSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3},
    price: { type: Number, required: true},
    image_url: { type: String, minlength: 3},
    description: { type: String, required: true, minlength: 3},
    location: { type: String, required: true, minlength: 3},
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
},{ timestamps: true })

mongoose.model('Bike', BikeSchema);
var Bike = mongoose.model('Bike')
