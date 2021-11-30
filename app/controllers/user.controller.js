const User = require('../models/user.model.js');

// Create and Save a new user
exports.create = (req, res) => {
    const { name, email, hehe } = req.body
    // Validate request
    if(!name || !email) {
        return res.status(400).send({
            status: "failed",
            message: "Bad request"
        });
    }

    // Create a user
    const user = new User({
        name,
        email
    });

    // Save user in the database
    user.save()
    .then(data => {
        res.send({
            status: "success",
            data
        });
    }).catch(err => {
        res.status(500).send({
            status: "failed",
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        const dataTransformed = users.map((x) => {
            return x.name
        })
        res.send({
            status: "success",
            data: {
                name: dataTransformed
            },
        });
    }).catch(err => {
        res.status(500).send({
            status: "failed",
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    const { userId } = req.params
    User.findById(userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                status: "failed",
                message: "User not found with id " + userId
            });            
        }
        res.send({
            status: "success",
            data: user
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                status: "failed",
                message: "User not found with id " + userId
            });                
        }
        return res.status(500).send({
            status: "failed",
            message: "Error retrieving user with id " + userId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    const { userId } = req.params
    const { name, email } = req.body
    // Validate Request
    if(!name || !email) {
        return res.status(400).send({
            status: "failed",
            message: "Bad request"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(userId, {
        name,
        email
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                status: "failed",
                message: "User not found with id " + userId
            });
        }
        res.send({
            status: "success",
            data: user
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                status: "failed",
                message: "User not found with id " + userId
            });                
        }
        return res.status(500).send({
            status: "failed",
            message: "Error updating user with id " + userId
        });
    });
};

