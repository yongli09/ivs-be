module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const auth = require('../../middleware/auth.js');

    // Create a new user
    app.post('/ivs-be/users', users.create);

    // Retrieve all users
    app.get('/ivs-be/users', auth, users.findAll);

    // Retrieve a single user with UserId
    app.get('/ivs-be/users/:userId', auth, users.findOne);

    // Update a user with userid
    app.put('/ivs-be/users/:userId', auth, users.update);


}