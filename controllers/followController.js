const User = require('../models/userModel')
const Follow = require('../models/followModel')

const followUser = (req, res, next) => {
    var user_id = req.body.user_id;
    var following_id = req.body.following_id
    User.findOneAndUpdate({ user_id: user_id }, { $inc: { following_count: 1 }})
        .then(user => {
            if(user==null){
                const resdata = {
                    "status": "ERROR",
                    "message": "Something went wrong",
                    "result": "{}",
                    "error": err
                }
                res.json(resdata)
            }else{
            User.findOneAndUpdate({ user_id: following_id }, { $inc: { followers_count: 1 } }).then(data => {
                const follow = new Follow({
                    user_id: req.body.user_id,
                    username: data.username,
                    name: data.name,
                    profile_url: data.profile_url,
                    following_id: data.user_id
                })
                follow.save()
                const resdata = {
                    "status": "OK",
                    "message": "Follow successfully",
                    "result": "{}",
                    "error": "{}"
                }
                res.json(resdata)
            })
        }
        })
        .catch((err) => {
            const resdata = {
                "status": "ERROR",
                "message": "Something went wrong",
                "result": "{}",
                "error": err
            }
            res.json(resdata)
        })
}

const unfollowUser = (req, res, next) => {
    var user_id = req.body.user_id;
    var following_id = req.body.following_id
    // const like = new Follow({
    //     user_id: req.body.user_id,
    //     username: req.body.username,
    //     profile_url: req.body.profile_url,
    //     post_id: req.body.post_id
    // })
    User.findOneAndUpdate({ user_id: user_id }, { $inc: { following_count: -1 }})
        .then(user => {
            if(user==null){
                const resdata = {
                    "status": "ERROR",
                    "message": "Something went wrong",
                    "result": "{}",
                    "error": err
                }
                res.json(resdata)
            }else{
            User.findOneAndUpdate({ user_id: following_id }, { $inc: { followers_count: -1 } }).then(data => {
                Follow.deleteOne({ $and: [{ user_id: user_id }, { following_id: following_id }] }).then(result => {
                    const resdata = {
                        "status": "OK",
                        "message": "Unfollow successfully",
                        "result": "{}",
                        "error": "{}"
                    }
                    res.json(resdata)
                })
            })
        }
        })
        .catch(err => {
            const resdata = {
                "status": "ERROR",
                "message": "Something went wrong",
                "result": "{}",
                "error": err
            }
            res.json(resdata)
        })
}

const followingList = (req, res, next) => {
    const user_id = req.body.user_id
    Follow.find({ user_id: user_id })
        .then(result => {
            if(result==0){
                const resdata={
                    "status": "ERROR",
                    "message": "no followings available",
                    "result": {},
                    "error": "EMPTY ERROR"
                }
                res.send(resdata)
            }else{
            setTimeout(() => {
                const resdata = {
                    status: "OK",
                    message: "all followings listed",
                    result:result,
                    error: {}
                }
                res.send(resdata)
            }, 1000);
        }
        })
        .catch(err=>{
            const resdata = {
                "status": "ERROR",
                "message": "Something went wrong",
                "result": "{}",
                "error": err
            }
            res.json(resdata)
        })
}

const followerList=(req,res,next)=>{
    const follower_id = req.body.user_id
    Follow.find({ following_id: follower_id })
    .then(result => {
        if(result==0){
            const resdata={
                "status": "ERROR",
                "message": "no followers available",
                "result": {},
                "error": "EMPTY ERROR"
            }
            res.send(resdata)
        }else{
        setTimeout(() => {
            const resdata = {
                status: "OK",
                message: "all followers listed",
                result:result,
                error: {}
            }
            res.send(resdata)
        }, 1000);
    }
    })
    .catch(err=>{
        const resdata = {
            "status": "ERROR",
            "message": "Something went wrong",
            "result": "{}",
            "error": err
        }
        res.json(resdata)
    })
}

const checkList=(req,res,next)=>{
    var user_id = req.body.user_id;
    var following_id = req.body.following_id
    Follow.find({ $and: [{ user_id: user_id }, { following_id: following_id }] })
    .then((result)=>{
        if(result==0){
            const resdata = {
                "status": "OK",
                "message": "0",
                "result": [],
                "error": "{}"
            }
            res.json(resdata)
        }else{ 
            const resdata = {
                "status": "OK",
                "message": "1",
                "result": [],
                "error": "{}"
            }
            res.json(resdata)
        }
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports = {
    followUser,
    unfollowUser,
    followingList,
    followerList,
    checkList
}