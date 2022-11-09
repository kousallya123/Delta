import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import SignupPage from './Pages/User/SignupPage'
import LoginPage from './Pages/User/LoginPage'
import Homepage from './Pages/User/Homepage';
import AdminUsers from './Components/Admin/User/User';
import Sidebar from './Components/Users/Sidebar/Sidebar';
import AdminLogin from './Components/Admin/Login/Login'
import AdminHomePage from './Pages/Admin/AdminHomePage';
import ProfilePage from './Pages/User/ProfilePage';

function App() {
  return (
    <div className="App">
       <Router>
          <Routes>  
              <Route path='/signup' element={<SignupPage/>}/> 
              <Route path='/' element={<LoginPage/>}/>  
              <Route path='/home' element={<Homepage/>}/>
              <Route path='/profile' element={<ProfilePage/>}/>
          </Routes>
          <Routes>  
          <Route path='/sidebar' element={<Sidebar/>}/>
              <Route path='/admin-users' element={<AdminHomePage/>}/> 
              <Route path='/admin-login' element={<AdminLogin/>}/>  
          </Routes>
       </Router>
    </div>
  );
}

export default App;
