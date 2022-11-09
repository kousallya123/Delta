const express = require('express')
const { getUsers, blockUser, UnblockUser,adminLogin } = require('../controllers/adminCtrl')
const router = express.Router()


router.get('/users',getUsers)

router.post('/blockUsers/:id',blockUser)

router.post('/UnblockUsers/:id',UnblockUser)

router.post('/login',adminLogin)


module.exports = router