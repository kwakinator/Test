var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true, minlength: 3},
    last_name: { type: String, required: true, minlength: 3},
    email: { type: String, required: true, minlength: 3, unique: true,
        validate: {
            validator: function( value ) {
              console.log("checking email");
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( value );
          },
          message: "Email needs to be in the correct format"
        }
    },
    password_hash: { type: String, required: true, minlength: 3,
        validate: {
            validator: function( value ) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
            },
            message: "Password failed validation, you must have at least 1 number, uppercase and special character"
        }
    },
    bikes:[{ type: Schema.Types.ObjectId, ref: 'Bike' }]
},{ timestamps: true })

mongoose.model('User', UserSchema);
var User = mongoose.model('User')
