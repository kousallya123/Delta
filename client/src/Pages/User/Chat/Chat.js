import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ChatOnline from '../../../Components/Users/ChatOnline/ChatOnline'
import Conversation from '../../../Components/Users/Conversations/Conversation'
import Message from '../../../Components/Users/Message/Message'
import Navbar from '../../../Components/Users/Navbar.js/Navbar'
import './Chat.css'
import {io} from 'socket.io-client'
import InputEmoji from 'react-input-emoji'

function Chat() {
  const user=useSelector(state=>state.user)
  const [conversations,setConversations]=useState([])
  const [currentChat,setCurrentChat]=useState(false)
  const [messages,setMessages]=useState([])
  const [newMessage,setNewMessage]=useState('')
  const [onlineUsers,setOnlineUsers]=useState([])
  const [arrivalMessage,setarrivalMessage]=useState(null)
  const scrollRef=useRef()
  const socket=useRef()
  
  /* -------------------------------------------------------------------------- */
  /*                            for get conversations                           */
  /* -------------------------------------------------------------------------- */
  
  
  useEffect(()=>{
    const getConversations=async()=>{
      try {
        const res=await axios.get(`/chat/${user._id}`)
        setConversations(res.data)
      } catch (error) {
        console.log(error);
      } 
    }
    getConversations()
  },[user._id])



 /* -------------------------------------------------------------------------- */
 /*                            for get the messages                            */
 /* -------------------------------------------------------------------------- */
  
  useEffect(()=>{
    const getMessages=async()=>{
      const res= await axios.get('/chat/message/'+currentChat._id)
      setMessages(res.data)
    }
    getMessages()
  },[currentChat])



   useEffect(()=>{
    socket.current=io("ws://localhost:2002")
    socket.current.on("getMessage",(data)=>{
      setarrivalMessage({
        sender:data.senderId,
        text:data.text,
        createdAt:Date.now()
      })
    })
    
   },[])


   useEffect(()=>{
    arrivalMessage&&currentChat?.members.includes(arrivalMessage.sender)&&
    setMessages((prev)=>[...prev,arrivalMessage])
   },[arrivalMessage,currentChat])

  useEffect(()=>{
    socket.current.emit('addUser',user._id)
    socket.current.on('getUsers',(users)=>{
      setOnlineUsers(user.followings.filter((f)=>users.some((u)=>u.userId===f)));
    })
  },[user])
 

  const handleSend=async(e)=>{
    e.preventDefault()
    const message={
      sender:user._id,
      text:newMessage,
      conversationId:currentChat._id
    }
     
    const receiverId=currentChat.members.find((member)=>member!==user._id)

     socket.current.emit("sendMessage",{
      senderId:user._id,
      receiverId,
      text:newMessage
     })

    try {
      const res=await axios.post(`/chat/message`,message)
      setMessages([...messages,res.data])
      setNewMessage("")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
   scrollRef.current?.scrollIntoView({behaviour:"smooth"})
  },[messages])


  const handleChange=(newMessage)=>{
    console.log(newMessage,'aaaaaaaaaaqqqqqqqqqqqqqq');
    setNewMessage(newMessage)
  }


  return (
    <div>
      <Navbar/>
      <div className='messenger'>
        <div  className='lg chatMenu' >
            <div className='chatMenuWrapper'>
              <input placeholder='Serach for friends' className='chatMenuInput'/>
              {conversations.map((c)=>(
                  <div onClick={()=>setCurrentChat(c)}>
                    <Conversation conversation={c} currentUser={user}/>
                  </div>
              ))}
             
            </div>
        </div>
        <div className='chatBox'>
           <div className='chatBoxWrapper'>
            {
              currentChat?
              <>
              {messages.length!==0?
               <div className='chatBoxTop'>
               {messages.map((m)=>(
                 <div ref={scrollRef}>
                  <Message message={m} own={m.sender===user._id}/>
                  </div>
               ))}
            
             </div>:<div>oops there is no messages...</div>
              }
             
           <div className='chatBoxBottom'>
           <InputEmoji
             placeholder='Message'
             class='block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700'
             value={newMessage}
             onChange={handleChange}
            />
            {/* <textarea className='chatMessageInput' placeholder='write something...' value={newMessage}
            onChange={(e)=>setNewMessage(e.target.value)}
            ></textarea> */}
            {newMessage!==''?<button className='chatSubmitButton' onClick={handleSend}>Send</button>:null}
            
           </div>
           </>:<div className='noConversationText'>Open new conversation to show the messages...</div>
            }
            
           </div>
        </div>
        <div   className=' chatOnline'>
         <div className='chatOnlineWrapper'>
         {/* / {console.log(onlineUsers,'aaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbb')} */}
              <ChatOnline onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
              />
         </div>
        </div>
      </div>
    </div>
  )
}

export default Chat




















// import "./messenger.css";
// import Topbar from "../../components/topbar/Topbar";
// import Conversation from "../../components/conversations/Conversation";
// import Message from "../../components/message/Message";
// import ChatOnline from "../../components/chatOnline/ChatOnline";
// import { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
// import { io } from "socket.io-client";

// export default function Chat() {
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const socket = useRef();
//   const { user } = useContext(AuthContext);
//   const scrollRef = useRef();

//   useEffect(() => {
//     socket.current = io("ws://localhost:8900");
//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);

//   useEffect(() => {
//     socket.current.emit("addUser", user._id);
//     socket.current.on("getUsers", (users) => {
//       setOnlineUsers(
//         user.followings.filter((f) => users.some((u) => u.userId === f))
//       );
//     });
//   }, [user]);

//   useEffect(() => {
//     const getConversations = async () => {
//       try {
//         const res = await axios.get("/conversations/" + user._id);
//         setConversations(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getConversations();
//   }, [user._id]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get("/messages/" + currentChat?._id);
//         setMessages(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMessages();
//   }, [currentChat]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const message = {
//       sender: user._id,
//       text: newMessage,
//       conversationId: currentChat._id,
//     };

//     const receiverId = currentChat.members.find(
//       (member) => member !== user._id
//     );

//     socket.current.emit("sendMessage", {
//       senderId: user._id,
//       receiverId,
//       text: newMessage,
//     });

//     try {
//       const res = await axios.post("/messages", message);
//       setMessages([...messages, res.data]);
//       setNewMessage("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//       <Topbar />
//       <div className="messenger">
//         <div className="chatMenu">
//           <div className="chatMenuWrapper">
//             <input placeholder="Search for friends" className="chatMenuInput" />
//             {conversations.map((c) => (
//               <div onClick={() => setCurrentChat(c)}>
//                 <Conversation conversation={c} currentUser={user} />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="chatBox">
//           <div className="chatBoxWrapper">
//             {currentChat ? (
//               <>
//                 <div className="chatBoxTop">
//                   {messages.map((m) => (
//                     <div ref={scrollRef}>
//                       <Message message={m} own={m.sender === user._id} />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="chatBoxBottom">
//                   <textarea
//                     className="chatMessageInput"
//                     placeholder="write something..."
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     value={newMessage}
//                   ></textarea>
//                   <button className="chatSubmitButton" onClick={handleSubmit}>
//                     Send
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <span className="noConversationText">
//                 Open a conversation to start a chat.
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="chatOnline">
//           <div className="chatOnlineWrapper">
//             <ChatOnline
//               onlineUsers={onlineUsers}
//               currentId={user._id}
//               setCurrentChat={setCurrentChat}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

