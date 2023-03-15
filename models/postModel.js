const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
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
    description: {
        type: String,
        required: true
    },
    posts:{
        type: Array,
        required: true
    },
    // image_posts: {
    //     type: Array,
    //     required: false
    // },
    // video_posts: {
    //     type: Array,
    //     required: false
    // },
    likes_count: {
        type: Number,
        required: false,
        default:0
    },
    comments_count: {
        type: Number,
        required: false,
        default:0
    },
    current_page: {
        type: Number,
        required: false,
        default:0
    },
    // likes_status:{
    //     type:Boolean,
    //     default:false,
    //     required: true
    // }
},{timestamps: true})

module.exports = mongoose.model('post', postSchema)

