const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profile_url: {
        type: String,
        default: false
    },
    following_id: {
        type: String,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('follow', followSchema)

