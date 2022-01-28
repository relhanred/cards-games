import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import Shifumi from '../components/Shifumi';
import Battle from '../components/Battle';
import BlackJack from '../components/BlackJack';

function Game(props) {

    let params = useParams();
    const navigate = useNavigate();
    const game = useSelector((state) => state.game);


    return (
        <div className="h-full w-full">
            {
                params.game == "shifumi" ?
                <Shifumi />
                : 
                (
                    params.game == "bataille" ?
                    <Battle />
                    :
                    <BlackJack/>
                )
            }

        </div>
    );
}

export default Game;