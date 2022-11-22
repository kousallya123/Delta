const Conversation=require('../models/conversation')
const Message=require('../models/message')

const addConversation=async(req,res)=>{
    const newConversation=new Conversation({
        members:[req.body.senderId,req.body.receiverId]
    })
    try {
        const savedConversation=await newConversation.save()
        res.json(savedConversation) 
        
    } catch (error) {
        res.json(error)
    }
}


const getConversation=async(req,res)=>{
    try {
        const conversation=await Conversation.find({
            members:{$in: [req.params.userId]}
        })
        res.json(conversation) 
        
    } catch (error) {
        res.json(error)
    }
}

const sendMessage=async(req,res)=>{
    const newMessage=new Message(req.body)
    try {
        const sendMessage=await newMessage.save()
        res.json(sendMessage)
        
    } catch (error) {
        res.json(error)
    }
}

const getMessage=async(req,res)=>{
    try {
        const messages=await Message.find({
            conversationId:req.params.conversationId
        })
        res.json(messages)
        
    } catch (error) {
        res.json(error)
    }
}



const getTwoConversations=async(req,res)=>{

  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports={addConversation,getConversation,sendMessage,getMessage,getTwoConversations}