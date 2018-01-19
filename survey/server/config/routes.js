//requirements
const mongoose = require('mongoose');
const path = require('path');
//classes & controllers
const user = mongoose.model('User')
const userController = require('./../controllers/user');
const poll = mongoose.model('Poll')
const pollController = require('./../controllers/poll');

module.exports = function(app) {

    app.get('/users', userController.show);
    app.post('/user', userController.getById);

    app.post('/login', userController.login);

    app.get('/polls', pollController.show);
    app.post('/polls', pollController.create);
    app.delete('/polls/:id', pollController.destroy);
    app.post('/polls', pollController.getById);

    app.all("*", (request, response) => { response.sendFile(path.resolve("./angular-app/dist/index.html")) });

}
