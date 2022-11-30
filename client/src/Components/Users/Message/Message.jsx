import './Message.css'
import {format} from 'timeago.js'
import { useSelector } from 'react-redux'

function Message({message,own,pic}) {
   const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const user=useSelector(state=>state.user)
  return (
<div className={own? "message own":"message"}>
    <div className="messageTop">
       {own?null:<img className='ml-3  messageImageReceiver'src={PF+pic} alt=''></img>}
       <p className='messageText'>{message.text}</p> 
       {own&&<img className='ml-3  messageImage'src={PF+user.profilePicture} alt=''></img>}
    </div>

    {own?<div className="messageBottom">{format(message.createdAt)}</div>:<div className="messageBottom">{format(message.createdAt)}</div>}
</div>
)
}

export default Message
