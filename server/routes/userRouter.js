const router=require('express').Router()
const {authCtrlLogin,authCtrlRegister,updateUser,deleteUser,getUser,followUser,unFollowUser, getUserbyId}=require('../controllers/userCtrl')
const check = require('../middleware/verify');

router.post('/register',authCtrlRegister)

router.post('/login',authCtrlLogin)

router.put('/:id',check,updateUser)

router.delete('/:id',check,deleteUser)

router.get('/:id',getUser)

router.put('/follow/:id',check,followUser)

router.put('/unfollow/:id',check,unFollowUser)

router.get('/findUser/:id',check,getUserbyId)




module.exports=router
