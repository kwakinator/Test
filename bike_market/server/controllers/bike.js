var mongoose = require('mongoose');
var Bike = mongoose.model('Bike');
const User = mongoose.model('User')
const userController = require('./../controllers/user');
module.exports = {
    show: (request, response) => {
        Bike.find({}).populate('user').exec()
            .then( (bikes) => {
                response.json(bikes);
            })
            .catch(error => console.log(error))
    },
    create: (request, response) => {
        console.log('--- about to make a new bike ---')
        let new_bike = request.body;
        new_bike._user = request.body.user._id;

        Bike.create(new_bike)
            .then( (bike) => {
                User.findById({_id: request.body.user._id})
                    .then((user) => {
                        user.bikes.push(bike)
                        user.save();
                    })
                response.json(bike);
                console.log('new bike!', bike);
            })
            .catch(error => console.log(error))
    },
    destroy: (request, response) => {
        console.log('--- about to delete bike ---');
        Bike.findByIdAndRemove(request.params.id)
            .then(bike => {
                User.findById({_id: bike.user})
                    .then((user) => {
                        console.log('removing from bike array', user.bikes.indexOf(bike.id))
                        user.bikes.splice(user.bikes.indexOf(bike.id), 1);
                        user.save();
                    })
                response.json(bike)

            })
            .catch(error => console.log(error))
    },
    update: (request, response) => {
        Bike.findById(request.params.id)
            .then((bike)=>{
                bike.title = request.body.title;
                bike.price = request.body.price;
                bike.image_url = request.body.image_url;
                bike.description = request.body.description;
                bike.location = request.body.location;
                return bike.save()
            })
            .then((saved)=>console.log(saved))
            .catch(error => console.log(error))
    },
}
