const router=require('express').Router()
const {authCtrlLogin,authCtrlRegister,updateUser,deleteUser,getUser,followUser,unFollowUser, getUserbyId,searchUser,Notifications,getNotifications,deleteNotifications,sendPasswordLink,updatePassword
,getSuggestions,verifyOtp,resendOTP,ReadNotification}=require('../controllers/userCtrl')
const check = require('../middleware/verify');

router.post('/register',authCtrlRegister)

router.post('/login',authCtrlLogin)

router.put('/:id',updateUser)

router.delete('/:id',check,deleteUser)

router.get('/:id',getUser)

router.put('/follow/:id',check,followUser)

router.put('/unfollow/:id',check,unFollowUser)

router.get('/findUser/:id',check,getUserbyId)

router.put('/search/User',searchUser)

router.post('/notification',Notifications)

router.get('/notification/:id',getNotifications)

router.delete('/notification/:id',deleteNotifications)

router.post('/sendPasswordLink',sendPasswordLink)

router.put('/updatePassword/:id',updatePassword)

router.get('/suggestions/:id',getSuggestions)

router.post("/verifyOtp", verifyOtp);

router.post("/resendOtp", resendOTP);

router.put('/notification/viewed/:id',ReadNotification)

module.exports=router
