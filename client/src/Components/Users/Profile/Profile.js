import './Profile.css'

function Profile() {
  return (
    <div className='profileRightTop'>
        <div className="profileCover">
           <img className='profileCoverImage' src="assets/b2.webp" alt=""/>
           <img className='profileUserImage' src="assets/b1.jpg" alt=""/>
           <div className="profileInfo">
            <h4 className='profileInfoName'>Kousallya B</h4>
            <p className='profileInfoDesc'>Hello my friends!
            </p>
        </div>
        </div>
        
    </div>
  )
}

export default Profile
