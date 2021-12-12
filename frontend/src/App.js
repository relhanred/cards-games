import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import Error from './components/Error';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';

function App() {
  return (
    <div >
      <Router>
          <Navbar />
          <Routes>
             <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>} />
            <Route path="*" element={<Error/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
