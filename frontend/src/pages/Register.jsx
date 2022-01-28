import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { useNavigate } from "react-router-dom";

function Register() {

    const [registerForm, setRegisterForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [disableForm, setDisableForm] = useState(true);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPasswordSynthax, setErrorPasswordSynthax] = useState(false);
    const [errorSignIn, setErrorSignIn] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (formNotEmpty() && formValid()) {
            setDisableForm(false);
        } else {
            setDisableForm(true);
        }
        if (!validateEmail() && registerForm.email !== "") {
            setErrorEmail(true);
        } else {
            setErrorEmail(false);
        }

        if(!passwordValid() && registerForm.password !== "" && registerForm.confirmPassword !== "")  {
            setErrorPassword(true);
        }else {
            setErrorPassword(false);
        }

        if(!validPassword() && registerForm.password !== "") {
            setErrorPasswordSynthax(true);
        } else {
            setErrorPasswordSynthax(false);
        }
    });

    const formValid = () => {
        return (!errorEmail && !errorPassword);
    }

    const validateEmail = () => {
        return String(registerForm.email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validPassword = () => {
        return String(registerForm.password)
        .match(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        );
    }

    const formNotEmpty = () => {
        return (registerForm.username !== "" && registerForm.email !== "" && registerForm.password !== "" && registerForm.confirmPassword !== "");
    }

    const passwordValid = () => {
        return (registerForm.password === registerForm.confirmPassword);
    }

    const signUp = (e) => {
        e.preventDefault();
        console.log("bouton")
        if (formNotEmpty && passwordValid && validateEmail) {
            AuthService.signUp({
                email: registerForm.email, 
                password: registerForm.password,
                pseudo: registerForm.username
            }).then(e => {
                if(e.status === 201) {
                    navigate("/login");
                }else {
                    setErrorSignIn(e.data.message);
                }
            })
        }
    }

    return (
        <div className="h-[92vh] bg-gray-100  flex justify-center items-center">
            <div className="lg:w-2/5 md:w-1/2 w-2/3">
                <form className="bg-white p-10 rounded-2xl shadow-xl min-w-full" onSubmit={signUp}>
                    <h1 className="text-center text-4xl mb-6 text-gray-600 font-bold font-sans">Inscription</h1>
                    <div>
                        <input className="w-full bg-gray-100 px-4 mb-8 py-2 rounded-lg outline-gray-700" autoComplete="off" type="text" name="username" id="username" placeholder="Pseudo" onChange={e => setRegisterForm({ ...registerForm, username: e.target.value })} value={registerForm.username} />
                    </div>
                    <div>
                        <input className={"w-full bg-gray-100 mb-3 px-4 py-2 rounded-lg " + (!errorEmail ? "outline-gray-700" : "focus:outline-red-500 outline-red-500")} autoComplete="off" type="text" name="email" id="email" placeholder="Adresse email" onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })} value={registerForm.email} />
                        <p className={"text-red-500 text-xs italic pb-2 " + (errorEmail ? "visible" : "invisible")}>L'adresse email n'est pas valide !</p>
                    </div>
                    <div>
                        <input className={"w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none " + (((!errorPassword) && !errorPasswordSynthax) ? "outline-gray-700" : "focus:outline-red-500 outline-red-500")} type="password" autoComplete="off" name="password" id="password" placeholder="Mot de passe" onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })} value={registerForm.password} />
                        <p className={"text-xs italic py-2 " + (errorPasswordSynthax ? "text-red-500" : "text-black-500")}> Utilisez au moins huit caractères avec des lettres majuscules et minuscules et des chiffres</p>
                    </div>
                    <div>
                        <input className={"w-full bg-gray-100 px-4 py-2 mb-1 rounded-lg focus:outline-none " + (!errorPassword ? "outline-gray-700" : "focus:outline-red-500 outline-red-500")} type="password" autoComplete="off" name="confirm" id="confirm" placeholder="Confirmer mot de passe" onChange={e => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })} value={registerForm.confirmPassword} />
                        <p className={"text-red-500 text-xs italic " + (errorPassword ? "visible" : "invisible")}>Les deux mots de passe ne correspondent pas !</p>
                        <p className="text-red-500 text-xs italic ">{errorSignIn}</p>
                    </div>
                    {disableForm ?
                        <input className="w-full mt-6 bg-gray-300 rounded-xl px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans" type="submit" value="Inscription" disabled />
                        :
                        <input className="w-full mt-6 bg-indigo-600 rounded-xl px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans cursor-pointer" type="submit" value="Inscription"/>
                    }

                    <NavLink to="/login"><button className="w-full mt-6 mb-3 bg-indigo-500 rounded-xl px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans">Connexion</button></NavLink>
                </form>
            </div>
        </div>
    );
}

export default Register;