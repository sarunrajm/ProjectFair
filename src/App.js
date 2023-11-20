import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home'

import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Footer from './Components/Footer';
import Auth from './Components/Auth';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Auth />}></Route>
        <Route path='/register' element={<Auth register/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/projects' element={<Projects/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
