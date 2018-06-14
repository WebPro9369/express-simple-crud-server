const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: Number,
    value: String,
    lastActivity: Date
}, {
    timestamps: true
});

UserSchema.index({
    lastActivity: -1,
    updatedAt: -1,
    id: 1,
    value: 1
}, {
    unique: true
})
module.exports = mongoose.model('User', UserSchema);