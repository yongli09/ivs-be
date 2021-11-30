const validator = require("email-validator");
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name    : { type: String },
    email   : { type: String,
                validate: {
                    validator: function(v) {
                        return validator.validate(v)
                    },
                    message: 'Wrong email format.'
                }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);