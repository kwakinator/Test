var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

module.exports = {
    show: (request, response) => {
        User.find({})
            .then( (users) => {
                response.json(users);
            })
            .catch(error => console.log(error))
    },
    create: (request, response) => {
        let new_user = request.body;
        console.log(new_user);
        new_user.password_hash = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(9));
        User.create(new_user)
            .then( user => {
                response.json(user);
                console.log('new user!', user);
            })
            .catch(error => {
                response.send(400,{error: error})
                console.log(error)
            })
    },
    destroy: (request, response) => {
        User.findByIdAndRemove(request.params.id)
            .then(() => console.log("deleted"))
            .catch(error => console.log(error))
    },
    update: (request, response) => {
        User.findById(request.params.id)
            .then((user)=>{
                user.title = request.body.title;
                user.first_name = request.body.first_name;
                user.last_name = request.body.last_name;
                user.email = request.body.email;
                user.password = request.body.password;
                return user.save()
                    .then(()=>console.log(saved))
            })
            .catch(error => console.log(error))
    },
    login: (request, response) => {
        console.log(request.body);
        User.findOne({ email: request.body.email })
        .then( (user) => {
            if(user === null){
                response.send(400,{error: 'No such user.'})
            }
            console.log('request.body', request.body.password);
            console.log('user.password_hash', user.password_hash);
            if(bcrypt.compareSync(request.body.password, user.password_hash)){
                response.json(user);
            } else {
                response.send(400,{error: 'Incorrect password'})
            }
        })
        .catch(error => console.log(error))
    },
    getById: (request, response) => {
        console.log('getbyid', request.body);
        User.findById(request.body).populate('bikes').exec()
        .then( (user) => {
            response.json(user);
        })
        .catch(error => console.log(error))
    },
    check_pw: (password, hash) => {
        return bcrypt.compareSync(password, hash);
    },
    hash_pw: (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
    }
}
