const router=require('express').Router()
const {addConversation,getConversation,sendMessage,getMessage,getTwoConversations,getFriends}=require('../controllers/chatCtrl')
const check = require('../middleware/verify');

router.post('/',check,addConversation)

router.get('/:userId',check,getConversation)

router.post('/message',check,sendMessage)

router.get('/message/:conversationId',check,getMessage)

router.get('/find/:firstUserId/:secondUserId',check,getTwoConversations)

router.get('/friendlist/:userId',check,getFriends)

module.exports=router;