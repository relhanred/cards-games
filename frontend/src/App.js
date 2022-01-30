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
import Profil from './pages/Profil';
import AdminUsers from './pages/AdminUsers';
import AdminGames from './pages/AdminGames';

function App() {

  const isConnected = useSelector((state) => state.isConnected)
  const user = useSelector((state) => state.user)



  return (
    <div >
      <Router>
        <Navbar />
        <Routes>
          {
            isConnected ?
              <Route exact path="/" element={<Home connected="true" />} />
              :
              <Route exact path="/" element={<Home connected="false" />} />
          }
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
          <Route exact path="/profil" element={<Profil />} />
          {
            (isConnected && user.roles[0] == "ADMIN") ?
              <Route exact path="/admin/users" element={<AdminUsers />} />
              :
              <Route exact path="/admin/users" element={<Error error="403" />} />
          }
          {
            (isConnected && user.roles[0] == "ADMIN") ?
              <Route exact path="/admin/games" element={<AdminGames />} />
              :
              <Route exact path="/admin/games" element={<Error error="403" />} />
          }
          <Route path="*" element={<Error error="404" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
