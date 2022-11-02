import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import SignupPage from './Pages/User/SignupPage'
import LoginPage from './Pages/User/LoginPage'
function App() {
  return (
    <div className="App">
       <Router>
          <Routes>  
              <Route path='/' element={<SignupPage/>}/> 
              <Route path='/login' element={<LoginPage/>}/>  
          </Routes>
       </Router>
    </div>
  );
}

export default App;
