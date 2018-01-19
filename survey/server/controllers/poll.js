var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');
const User = mongoose.model('User')
const userController = require('./../controllers/user');
module.exports = {
    show: (request, response) => {
        Poll.find({}).populate('user').exec()
            .then( (polls) => {
                response.json(polls);
            })
            .catch(error => console.log(error))
    },
    create: (request, response) => {
        console.log('--- about to make a new poll ---')
        let new_poll = request.body;
        new_poll._user = request.body.user._id;

        Poll.create(new_poll)
            .then( (poll) => {
                User.findById({_id: request.body.user._id})
                    .then((user) => {
                        user.polls.push(poll)
                        user.save();
                    })
                response.json(poll);
                console.log('new poll!', poll);
            })
            .catch(error => console.log(error))
    },
    destroy: (request, response) => {
        console.log('--- about to delete poll ---');
        Poll.findByIdAndRemove(request.params.id)
            .then(poll => {
                User.findById({_id: poll.user})
                    .then((user) => {
                        console.log('removing from poll array', user.polls.indexOf(poll.id))
                        user.polls.splice(user.polls.indexOf(poll.id), 1);
                        user.save();
                    })
                response.json(poll)

            })
            .catch(error => console.log(error))
    },
    getById: (request, response) => {
        console.log('getbyid', request.body);
        Poll.findById(request.body).populate('options').exec()
        .then( (poll) => {
            response.json(poll);
        })
        .catch(error => console.log(error))
    }
}
