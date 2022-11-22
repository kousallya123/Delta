const router=require('express').Router()
const {authCtrlGetAccessToken,authCtrlLogin,authCtrlRegister,authCtrlLogout,updateUser,deleteUser,getUser,followUser,unFollowUser,getFriends}=require('../controllers/authCtrl')

router.post('/register',authCtrlRegister)

router.post('/login',authCtrlLogin)

router.post('/logout',authCtrlLogout)

router.post('/refresh_token',authCtrlGetAccessToken)

router.put('/:id',updateUser)

router.delete('/:id',deleteUser)

router.get('/:id',getUser)

router.put('/follow/:id',followUser)

router.put('/unfollow/:id',unFollowUser)

router.get('/friends',getFriends)

module.exports=router
