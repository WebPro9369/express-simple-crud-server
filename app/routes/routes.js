module.exports = (app) => {
    const controller = require('../controllers/controller');

    // Create a new User
    app.post('/api/ping', controller.create);

    // Retrieve all Users
    app.use('/api/users', controller.findAll);

    // Retrieve a single User with userId
    app.get('/api/user/:userId', controller.findOne);

    // Update a User with userId
    app.put('/api/user/:userId', controller.update);

    // Delete a User with userId
    app.delete('/api/delete/:userId', controller.delete);
}