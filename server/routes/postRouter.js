const express=require('express')
const router=express.Router()
const multer=require('multer')
const {addPost,updatePost,deletePost,likePost,getPost,timelinePost,userPost}=require('../controllers/postCtrl')


const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, '../client/public/images');
    },
    filename(req, file, callback) {
        callback(null, fileName);
    },
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {
    console.log('upppppppppppp');
    console.log(req.body);
})

router.post("/",addPost)

router.put('/:id',updatePost) 

router.delete('/:id',deletePost) 

router.put('/like/:id',likePost) 

router.get('/:id',getPost)

router.get('/timeline/:userId',timelinePost)

router.get('/userpost/:userId',userPost)


module.exports=router