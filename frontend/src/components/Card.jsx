import React from 'react';
import { useNavigate } from 'react-router';

function Card(props) {

    const navigate = useNavigate();   

    return (

        <div className={"flex flex-col group relative shadow-lg rounded p-3 "+ ((props.bg == null) ? "bg-gray-900" : props.bg)} onClick={() => navigate(props.route)}>
            <div className="p-5 mx-auto">
                <h1 className={"font-fuzzy text-5xl " + ((props.bg != null) ? props.textColor : 'text-white')}>{props.name}</h1>
            </div>
            <div className="mx-auto">
                <img className="w-full md:w-full block rounded" src={props.image} alt="blackjack" />
                <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 group-hover:cursor-pointer w-full h-full top-0 right-0.5 flex items-center group-hover:opacity-100 transition justify-evenly">

                </div>
            </div>
        </div>
    );
}

export default Card;