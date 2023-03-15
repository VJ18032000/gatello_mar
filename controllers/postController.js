const Post = require('../models/postModel')
const Follow = require('../models/followModel')

const createPost = (req, res, next) => {
    const post = new Post({
        user_id: req.body.user_id,
        username: req.body.username,
        profile_url: req.body.profile_url,
        description: req.body.description,
        name:req.body.name
    })

   
    if (req.files) {
        const reqFiles = [];
        for (var i = 0; i < req.files.length; i++) {
            // if(req.files[i].filename.split('.').pop()==='mp4'){
            //     reqFiles.push('uploads/post/' + req.files[i].filename)
            //     post.video_posts = reqFiles
            // }else{
            //     reqFiles.push('uploads/post/' + req.files[i].filename)
            //     post.image_posts = reqFiles
            // }
            reqFiles.push('uploads/post/' + req.files[i].filename)
        }    
        post.posts = reqFiles
    }
    post.save()
        .then(user => {
            const resdata = {
                "status": "OK",
                "message": "create post successfully",
                "data": `${user}`
            }
            res.json(resdata)
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

const deletePost = (req, res, next) => {
    var user_id = req.body.user_id
    var id = req.body.post_id
    var posts = req.body.posts_url
    Post.findOneAndRemove({ $and: [{ _id: id }, { user_id: user_id }, { posts: posts }] })
        .then(post => {
            post.remove()
            res.send({ message: "post deleted successfull" })
        })
        .catch(err => {
            res.send(err)
        })

}

const editPost = (req, res, next) => {
    var user_id = req.body.user_id
    var id = req.body.post_id

    Post.findOne({ $and: [{ _id: id }, { user_id: user_id }] })
        .then(post => {
            post.description = req.body.description
            post.save()
            res.send(post)
        })
        .catch(err => {
            res.send(err)
        })
}

const details = (req, res, next) => {
    var id = req.query.post_id

    Post.findById({ _id: id })
        .then(post => {
            const resdata = {
                "status": "OK",
                "message": "post details",
                "result": { post },
                "error": {}
            }
            res.json(resdata)
        })
}

const listMyfeed = (req, res, next) => {
    Post.find({ user_id: req.body.user_id })
        .then(value => {
            let image=[]
            let video=[]
            for(let data of value){
                    if(data.posts[0].split('.').pop()==='mp4'){
                        video.push(data)
                    }else{
                        image.push(data)
                    }
            }
            const resdata = {
                "status": "OK",
                "message": "list of my feeds",
                "result": {"image":image,"video":video,"imageNvideo":value},
                "error": {}
            }
            res.json(resdata)
        })
}

const listHomefeed = (req, res, next) => {
 
    const user_id = req.body.user_id
    const followinglist=[]
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
                for(let i=0;i<result.length;i++){
                    followinglist.push(result[i].following_id)
                }
            setTimeout(() => {
                Post.find({ user_id: followinglist })
                .then(value => {
                    const resdata = {
                        "status": "OK",
                        "message": "list of home feeds",
                        "result": value,
                        "error": {}
                    }
                    res.json(resdata)
                })

            }, 1000);
        }
        })
        .catch(err=>{
            res.send(err)
        })


}

module.exports = {
    createPost,
    deletePost,
    editPost,
    details,
    listMyfeed,
    listHomefeed
}