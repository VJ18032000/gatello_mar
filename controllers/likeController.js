const Like = require('../models/likeModel')
const Post = require('../models/postModel')

const like = (req, res, next) => {
    var post_id = req.body.post_id;
    const like = new Like({
        user_id: req.body.user_id,
        username: req.body.username,
        profile_url: req.body.profile_url,
        post_id: req.body.post_id,
        name:req.body.name
    })
    Like.find({ $and: [{ post_id: req.body.post_id }, { user_id: req.body.user_id }] })
        .then((result) => {
            if (result == 0) {
                Post.findOneAndUpdate({ _id: post_id }, { $inc: { likes_count: 1 } })
                .then(user => {
                    like.save()
                    const resdata = {
                        "status": "OK",
                        "message": "like successfully",
                        "result": `${like}`
                    }
                    res.json(resdata)
                })
                .catch((err) => {
                    res.json(err)
                })
                
            } else {
                const resdata = {
                    "status": "OK",
                    "message": "Already liked ",
                    "result": "{}"
                }
                res.json(resdata)
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

const unLike = (req, res, next) => {
    var post_id = req.body.post_id;
    var user_id = req.body.user_id;
    Like.deleteOne({ $and: [{ post_id: post_id }, { user_id: user_id }] })
        .then((result) => {
            if(result.deletedCount===1){
                Post.findOneAndUpdate({ _id: post_id }, { $inc: { likes_count: -1 } })
                .then((result) => {
                    const resdata = {
                        "status": "OK",
                        "message": "Unlike successfully",
                        "result": `{}`
                    }
                    res.json(resdata)
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
            }else {
                const resdata = {
                    "status": "OK",
                    "message": "Already Unliked ",
                    "result": "{}"
                }
                res.json(resdata)
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

const likedUser = (req, res, next) => {
    var id = req.body.post_id

    Like.find({ post_id: id })
        .then((result) => {
            const resdata = {
                "status": "OK",
                "message": `${result != 0 ? 'list of all liked users' : 'no likes available'}`,
                result,
                "error":"{}"
            }
            res.json(resdata)
        }).catch((err) => res.send(err))
}

const likedPost = (req, res, next) => {
    var id = req.body.user_id

    Like.find({ user_id: id })
        .then((result) => {
            let value=[]
            for(let i=0;i<result.length;i++){
                value.push(result[i].post_id)
            }
            const resdata = {
                "status": "OK",
                "message": "liked post by user",
                "result": value,
                "error": `{}`
            }
            res.send(resdata)
        }).catch((err) => res.send(err))
}

module.exports = {
    like,
    unLike,
    likedUser,
    likedPost
}
