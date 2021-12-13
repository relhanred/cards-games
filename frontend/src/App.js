import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Error from './components/Error'
import Register from './components/Register';
import { useSelector } from 'react-redux'

function App() {

  const isConnected = useSelector((state) => state.isConnected)


  return (
    <div >
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          {
            !isConnected && (
              <Route exact path="/login" element={<Login />} />
            )
          }
          {
            !isConnected && (
              <Route exact path="/register" element={<Register />} />
            )
          }
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
