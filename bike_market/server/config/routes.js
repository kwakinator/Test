//requirements
const mongoose = require('mongoose');
const path = require('path');
//classes & controllers
const user = mongoose.model('User')
const userController = require('./../controllers/user');
const bike = mongoose.model('Bike')
const bikeController = require('./../controllers/bike');

module.exports = function(app) {

    app.get('/users', userController.show);
    app.post('/user', userController.getById);
    app.post('/users', userController.create);

    app.post('/login', userController.login);

    app.get('/bikes', bikeController.show);
    app.post('/bikes', bikeController.create);
    app.delete('/bikes/:id', bikeController.destroy);
    app.put('/bikes/:id', bikeController.update);
    // app.get('/players/:name', playerController.getByName);
    // app.delete('/players/:id', playerController.delete);

    app.all("*", (request, response) => { response.sendFile(path.resolve("./angular-app/dist/index.html")) });

}
