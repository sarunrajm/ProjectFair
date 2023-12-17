import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home'

import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Footer from './Components/Footer';
import Auth from './Components/Auth';
import { useContext } from 'react';
import { TokenAuthorisationContext } from './Contexts/TokenAuth';

function App() {
  const {isAuthorized,setIsAuthorized} = useContext(TokenAuthorisationContext)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Auth/>}></Route>
        <Route path='/register' element={<Auth register/>}></Route>
        <Route path='/dashboard' element={isAuthorized?<Dashboard/>:<Home/>}></Route>
        <Route path='/projects' element={isAuthorized?<Projects/>:<Home/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
