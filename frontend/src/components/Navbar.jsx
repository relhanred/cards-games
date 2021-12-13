import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import AuthService from '../services/auth.service';
import { setDisconnected, unsetUser } from '../redux/userSlice';
import { GiCardAceSpades } from 'react-icons/gi';

function Navbar() {

    const isConnected = useSelector((state) => state.isConnected);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const logout = (e) => {
        e.preventDefault();

        AuthService.logout();
        dispatch(setDisconnected());
        dispatch(unsetUser());
        navigate("/login");
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <div>
            <nav>
                <div className="">
                    <div className="flex justify-between h-20 px-4 border-2 shadow items-center">
                        <div className="flex justify-items-start items-center space-x-8">
                            <div className="flex flex-row items-center">
                                <GiCardAceSpades size="50" />
                                <h1 className="text-4xl lg:text-4xl font-bold cursor-pointer"><NavLink to="/">Cards Game</NavLink></h1>
                            </div>
                        </div>
                        {!isConnected ?
                            <div className="flex space-x-4 items-center">
                                <NavLink to="/register" className="text-gray-800 hover:bg-slate-100 text-sm text-2xl px-4 py-2 bg-slate-200 rounded lg:text-2xl">
                                    Inscription
                                </NavLink>
                                <NavLink to="/login" className="bg-midnight px-4 py-2 text-2xl lg:text-2xl rounded text-white hover:bg-indigo-500 text-sm">
                                    Connexion
                                </NavLink>
                            </div> :
                            <div className="flex space-x-4 items-center">
                                <div className="font-raleway-sf text-2xl">{capitalizeFirstLetter(user.pseudo)}</div>
                                <button className="bg-indigo-600 px-4 py-2 text-2xl lg:text-2xl rounded text-white hover:bg-indigo-500 text-sm" onClick={logout}>
                                    Déconnexion
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;