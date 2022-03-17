import logo from './img/loginlogo2.gif';
import './App.css';
import LoginComponent from './pages/loginComponent';
import RegisterComponent from './pages/registerComponent';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';



function App(){

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Routes>
            <Route path='/' element={<LoginComponent />}></Route>
            <Route path='/registerComponent' element={<RegisterComponent />}></Route>
          </Routes>
        </header>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
