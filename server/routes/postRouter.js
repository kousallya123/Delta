const express=require('express')
const router=express.Router()
const multer=require('multer')
const {addPost,updatePost,deletePost,likePost,getPost,timelinePost,userPost,addComment,getPostComments}=require('../controllers/postCtrl')


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
    try {
        res.json("success")
    } catch (error) {
        res.json(error)
    }
})

router.post("/",addPost)

router.put('/:id',updatePost) 

router.delete('/:id',deletePost) 

router.put('/like/:id',likePost) 

router.get('/:id',getPost)

router.get('/timeline/:userId',timelinePost)

router.get('/userpost/:userId',userPost)

router.post('/addcomment/:id',addComment)

router.get('/getcomments/:id',getPostComments)


module.exports=router