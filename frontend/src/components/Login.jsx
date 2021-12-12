import React, { useState , useEffect} from 'react';
import AuthService from '../services/auth.service';
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { setConnected } from '../redux/userSlice';

function Login(props) {

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
                    navigate("/");
                    dispatch(setConnected());
                }
            })
    }

    useEffect(() => {
        console.log(isConnected);
    });

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex justify-center bg-gray-100 items-center w-screen h-screen">
                <div className="flex flex-col justify-between content-between w-2/6 h-2/6 bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                    <div>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 h-14 mt-6 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline" onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} value={loginForm.email} id="username" type="text" placeholder="Adresse email" />
                    </div>
                    {/* <p>{login.email} <br /> {login.password} <br/> {error}</p> */}
                    <div>
                        <input className="shadow appearance-none border  rounded w-full h-14 py-2 px-3 text-gray-700 text-lg mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} value={loginForm.password} type="password" placeholder="Mot de passe" />
                        <p className="text-red-500 text-xs italic">{error}</p>
                    </div>
                    <div className="mt-4">
                        <input className="bg-blue-500 hover:bg-blue-700 text-white w-full text-lg h-14 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Se connecter" />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Login;