const User = require('../models/model');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.id || !req.body.value) {
        return res.status(400).send({
            message: "User value is empty."
        });
    }

    const data = {
        id: req.body.id,        
        value: req.body.value
    };

    User.findOne({ id: req.body.id }, (err, user) =>{
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while finding Users."
            });            
        }
        if (!user) {
            user = new User(data);
            // Save User in the database
            user.save()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the User."
                });
            });
        } else {
            res.status(403).send({
                message: "User with this id is already existing."
            });
        }
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    let fields = [];
    if (req.body.fields) {
        if (typeof req.body.fields === "string") {
            fields = req.body.fields.split(',');
        } else if (Array.isArray(req.body.fields) == true) {
            fields = req.body.fields;
        }
    }
    User.find(
        {},
        fields,
        {
            sort: {
                lastActivity: -1,
                updatedAt: -1
            }
        }    
    )
    .then(users => {
        res.send(users);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.find({
        id: req.params.userId
    })
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.value) {
        return res.status(400).send({
            message: "User value can not be empty"
        });
    }

    // Find user and update it with the request body
    User.update({
            id: req.params.userId
    }, {
        id: req.prams.userId,
        value: req.body.value
    })
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.find({
        id: req.params.userId
    })
    .remove()
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};
