import logo from './img/loginlogo2.gif';
import './App.css';
import LoginComponent from './pages/loginComponent';
import RegisterComponent from './pages/registerComponent';
import UserPage from './pages/userPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App(){

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Routes>
            <Route path='/' element={<LoginComponent />}></Route>
            <Route path='/registerComponent' element={<RegisterComponent />}></Route>
            <Route path='/userPage' element={<UserPage />}></Route>
          </Routes>
        </header>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
