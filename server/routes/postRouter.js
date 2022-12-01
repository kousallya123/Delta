const express=require('express')
const router=express.Router()
const multer=require('multer')
const {addPost,updatePost,deletePost,likePost,getPost,timelinePost,userPost,addComment,getPostComments,reportPost,blockPost}=require('../controllers/postCtrl');
const check = require('../middleware/verify');


const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './public/images');
    },
    filename(req, file, callback) {
        callback(null,file.originalname);
    },
});

const upload = multer({ storage:storage});

router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.body,'imagesssssssssssssssssssssssssss');
    try {
        res.json("success")
    } catch (error) {
        res.json(error)
    }
})

router.post("/",check,addPost)

router.put('/:id',updatePost) 

router.delete('/:id',deletePost) 

router.put('/like/:id',check,likePost) 

router.get('/:id',check,getPost)

router.get('/timeline/:userId',check,timelinePost)

router.get('/userpost/:userId',userPost)

router.post('/addcomment/:id',check,addComment)

router.get('/getcomments/:id',check,getPostComments)

router.post('/report/:id',reportPost)

router.get('/blockPost/:id',check,blockPost)


module.exports=router