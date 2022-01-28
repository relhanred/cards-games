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
                    setError("Adresse email ou mot de passe incorrect !");
                }
                else {
                    dispatch(setUserPseudo(e.data.message));
                    dispatch(setUserEmail(e.data.result.email));
                    dispatch(setConnected());
                    navigate("/");
                }
            })
    }

    return (
        <div className="h-92vh w-full bg-gray-100 flex justify-center overflow-hidden">
            <div className="p-8 h-fit w-4/12 mt-auto mb-auto bg-white rounded-xl shadow-xl">
                <h1 className="text-4xl text-gray-600 text-center font-bold font-sans mb-6">Connexion</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="my-6">
                        <input type="text" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" autoComplete="off" onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} value={loginForm.email} id="email" placeholder="Adresse email" />
                    </div>

                    <div>
                        <input type="password" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" autoComplete="off" onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} value={loginForm.password} id="password" placeholder="Mot de passe" />
                        <p className="text-red-500 text-xs italic pt-2">{error}</p>
                    </div>
                    <input className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded-xl" type="submit" value="Se connecter" />
                </form>
            </div>
        </div>
    );
}

export default Login;