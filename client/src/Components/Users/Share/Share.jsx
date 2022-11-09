import './Share.css'
import {PermMedia,Label,EmojiEmotions,Room} from '@mui/icons-material'

function Share() {
  return (
    <div className='share'>
      <div className='shareWrapper'>
       <div className="shareTop">
        <img src='/assets/c2.jpg' className='shareProfileImg' alt=""></img>
        <input placeholder="what's in your mind kousallya?" className='shareInput'/>

       </div>
       <hr className='shareHr'/>
       <div className='shareBottom'>
         <div className="shareOptions">
           <div className="shareOptions">
            <PermMedia htmlColor="tomato" className='shareIcon'/>
            <span className='shareOptionText'>Photo</span>
           </div>
         </div>
         {/* <div className="shareOptions">
           <div className="shareOptions">
            <Label htmlColor="blue" className='shareIcon'/>
            <span className='shareOptionText'>Tag</span>
           </div>
         </div>
         <div className="shareOptions">
           <div className="shareOptions">
            <EmojiEmotions htmlColor="green"className='shareIcon'/>
            <span className='shareOptionText'>Feelings</span>
           </div>
         </div>
         <div className="shareOptions">
           <div className="shareOptions">
            <Room htmlColor="goldenrod" className='shareIcon'/>
            <span className='shareOptionText'>Location</span>
           </div>
         </div> */}
         <button className='shareButton'>Share</button>
       </div>
      </div>
    </div>
  )
}

export default Share
