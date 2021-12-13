import React, { useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setConnected, setUserPseudo, setUserEmail } from '../redux/userSlice';

function Login() {

    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const isConnected = useSelector((state) => state.isConnected);
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();

        AuthService.login(loginForm)
            .then(e => {
                if (e.status === 401) {
                    setError(e.data.message);
                }
                else {
                    console.log(e);
                    dispatch(setUserPseudo(e.data.message));
                    dispatch(setUserEmail(e.data.result.email));
                    dispatch(setConnected());
                    navigate("/");
                }
            })
    }

    return (
        <div className="h-92vh w-full bg-gray-100 flex justify-center overflow-hidden">
            <div className="py-6 px-8 h-5/6 w-4/12 mt-auto mb-auto bg-white rounded shadow-xl">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-6">
                        <label className="block text-gray-800 font-bold">Adresse email:</label>
                        <input type="text" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" autoComplete="off" onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} value={loginForm.email} id="email" placeholder="Adresse email" />
                    </div>

                    <div>
                        <label className="block text-gray-800 font-bold">Mot de passe:</label>
                        <input type="password" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" autoComplete="off" onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} value={loginForm.password} id="password" placeholder="Mot de passe" />
                        <p className="text-red-500 text-xs italic">{error}</p>
                    </div>
                    <input className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded" type="submit" value="Se connecter" />
                </form>
            </div>
        </div>
    );
}

export default Login;