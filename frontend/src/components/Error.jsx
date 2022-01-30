import React from 'react';
import { useNavigate } from 'react-router';

function Error(props) {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col  h-[92vh] items-center justify-around">
            <div className="flex flex-col items-center justify-center">
                <h1 className="sm:text-[8em] 5text-xl font-bold text-indigo-400">{props.error} ERREUR</h1>
                <div className="flex items-center justify-center w-full text-5xl font-bold text-indigo-700"><span>{props.error == "404" ? "Page non trouvée" : "Vous n'avez pas les droits"}</span></div>
            </div>

            <button className="text-white rounded-xl bg-blue-700 p-4" onClick={() => {navigate("/")}}>Retour à l'accueil</button>
        </div>
    );
}

export default Error;