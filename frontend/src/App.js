import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Error from './components/Error'
import Register from './pages/Register';
import Params from './pages/Params';
import Game from './pages/Game';
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
          <Route exact path="/params/:title" element={<Params />} />
          <Route exact path="/game/:game/:id" element={<Game />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
