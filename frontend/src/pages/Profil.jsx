import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import UserService from '../services/user.service';
import { setUserPseudo, setDisconnected, unsetUser } from '../redux/userSlice';
import AuthService from '../services/auth.service';

function Profil(props) {

    const userStorage = JSON.parse(localStorage.getItem('user'));
    const [password, setPassword] = useState("");
    const [pseudo, setPseudo] = useState(null);
    const user = useSelector((state) => state.user);
    const isConnected = useSelector((state) => state.isConnected)
    const [updated, setUpdated] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setPseudo(user.pseudo)
    }, []);

    const updateProfil = () => {
        setUpdated(true)
        if (pseudo != "") {
            const profil = {
                password: password,
                pseudo: pseudo
            }
            UserService.updateUser(userStorage.id, profil).then(e => {
                if (e.status == 200) {
                    if (e.data.status == true) {
                        setMessage(e.data.message);
                        AuthService.logout();
                        dispatch(setDisconnected());
                        dispatch(unsetUser());
                    } else {
                        setError(e.data.message);
                    }
                } else {
                    setError(e.data.message);
                }
            })
        }
    }

    return (
        <div className="flex h-[92vh] w-full m-4 justify-center items-center">
            {
                isConnected ?
                    <div className="flex flex-col border m-4 p-6 w-fit h-fit rounded-xl">
                        <h1 className="text-2xl font-sans font-bold text-center">Mon profil</h1>
                        <div className="flex flex-col m-6 p-8">
                            <div className="flex items-center p-4 justify-between">
                                <span className="px-2 mx-4 font-sans text-lg">Email </span>
                                <input type="text" value={userStorage.email} className="border p-2 rounded-lg" disabled />
                            </div>
                            <div className="flex items-center p-4 justify-between">
                                <span className="px-2 mx-4 font-sans text-lg">Mot de passe </span>
                                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="border p-2 rounded-lg" />
                            </div>
                            <div className="flex items-center p-4 justify-between">
                                <span className="px-2 mx-4 font-sans text-lg">Pseudo</span>
                                {
                                    pseudo != null &&
                                    <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} className={"border p-2 rounded-lg " + ((updated == true && pseudo == "") && "border-red-500")} />
                                }
                            </div>
                            <div className="flex items-center p-4 justify-between">
                                <span className="px-2 mx-4 font-sans text-lg">Role(s) </span>
                                <div className="uppercase">
                                    {
                                        (userStorage != null) &&
                                        (
                                            userStorage.roles != undefined ?

                                                userStorage.roles.map((value, index) => {
                                                    return <span key={index}>{value == "USER" ? "Utilisateur" : "Administrateur"}</span>
                                                })

                                                :
                                                <span>{userStorage.role}</span>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            {
                                error != "" &&
                                <span className="text-lg font-bold text-red-500">{error}</span>
                            }
                        </div>
                        <div className="flex items-center p-4 justify-center">
                            <button className="border py-2 px-4 rounded-lg text-white text-xl bg-indigo-500" onClick={() => updateProfil()}>Modifier</button>
                        </div>
                    </div>
                    :
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-lg font-bold text-green-500 m-4">{message}</span>
                        <span className="text-lg font-bold text-black m-4">Veuillez vous reconnecter</span>
                        <button className="border py-2 px-4 rounded-lg text-white text-xl bg-indigo-500 m-4" onClick={() => navigate("/login")}>Se connecter</button>
                    </div>
            }
        </div>
    );
}

export default Profil;