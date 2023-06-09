const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
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
        required: false
    },
    post_id: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('like', likeSchema)

