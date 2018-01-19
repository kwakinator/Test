var mongoose = require('mongoose');
var User = mongoose.model('User');
var ObjectID = require('mongodb').ObjectID;


module.exports = {
    show: (request, response) => {
        User.find({})
            .then( (users) => {
                response.json(users);
            })
            .catch(error => console.log(error))
    },
    login: (request, response) => {
        console.log(request.body);
        User.findOneAndUpdate(
          { _id: new ObjectID()},
          { name: request.body.name },
          {upsert: true, new: true, runValidators: true}
        )
        .then( (user) => {
            response.json(user);
        })
        .catch(error => {
            response.send(400,{error: error})
            console.log(error)
        })
    },
    getById: (request, response) => {
        console.log('getbyid', request.body);
        User.findById(request.body).populate('polls').exec()
        .then( (user) => {
            response.json(user);
        })
        .catch(error => console.log(error))
    }
}
