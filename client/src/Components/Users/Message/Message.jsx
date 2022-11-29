import './Message.css'
import {format} from 'timeago.js'
import { useSelector } from 'react-redux'

function Message({message,own}) {
   const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const user=useSelector(state=>state.user)
  return (
<div className={own? "message own":"message"}>
    <div className="messageTop">
       <p className='messageText'>{message.text}</p> 
       {own?<img className='ml-3  messageImage'src={PF+user.profilePicture} alt=''></img>:null } 
    </div>

    <div className="messageBottom">{format(message.createdAt)}</div>
</div>
)
}

export default Message
