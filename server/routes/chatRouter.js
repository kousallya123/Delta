const router=require('express').Router()
const {addConversation,getConversation,sendMessage,getMessage,getTwoConversations}=require('../controllers/chatCtrl')

router.post('/',addConversation)


router.get('/:userId',getConversation)


router.post('/message',sendMessage)


router.get('/message/:conversationId',getMessage)

router.get('/find/:firstUserId/:secondUserId',getTwoConversations)


module.exports=router;