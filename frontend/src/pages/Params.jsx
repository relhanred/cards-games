import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ShifumiService from '../services/shifumi.service';
import { useSelector, useDispatch } from 'react-redux'
import { RiComputerLine } from 'react-icons/ri';
import { BsPersonFill } from 'react-icons/bs';
import { setGame, unsetGame } from '../redux/gameSlice';
import BattleService from '../services/battle.service';
import BlackJackService from '../services/blackjack-service';


function Params(props) {

    let params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ia, setIa] = useState(true)
    const [nbManche, setNbManche] = useState(3)
    const [nbPlayers, setNbPlayers] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {

    });

    const backReturn = (e) => {
        navigate("/");
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const createGame = () => {
        dispatch(setGame(params.title))
        let form = {
            manche: nbManche,
        }
        let err = false;
        if (nbManche < 1 || nbManche > 52 ) {
            err = true;
            setError(true)
        }
        if (err === false) {
            if (params.title == "shifumi") {
                createShifumi(form);
            } else if (params.title == "bataille") {
                createBattle(form);
            } else {
                createBlackJack(form);
            }
        }


    }

    const createShifumi = (form) => {
        ShifumiService.create(form).then(e => {
            if (e.status == 201) {

                navigate("/game/" + params.title + "/" + e.data.result.id)
            }
        })
    }

    const createBattle = (form) => {
        BattleService.create(form).then(e => {
            if (e.status == 201) {
                navigate("/game/" + params.title + "/" + e.data.result.id)
            }
        })
    }


    const createBlackJack = (form) => {
        BlackJackService.create(form).then(e => {
            if (e.status == 201) {
                navigate("/game/" + params.title + "/" + e.data.result.id)
            }
        })
    }


    return (
        <div className="flex flex-col h-[92vh] items-center">
            <div className="flex flex-col  p-6 my-6">
                <h1 className="my-4 border rounded-lg font-mono text-5xl p-4 text-center">{capitalizeFirstLetter(params.title)}</h1>
                <div className="flex  my-4">
                    <RiComputerLine size="400" className="text-slate-400" />
                </div>
                <div className="flex flex-col my-4 ">
                    <label className="text-xl w-full mb-2 px-2">Manches</label>
                    <input type="number" className={"border rounded-md py-2 px-4 w-full " + ((error && (nbManche < 1 || nbManche > 52)) && "border-red-500")} value={nbManche} min="1" max="52" onChange={(e) => setNbManche(e.target.value)} />
                </div>
                <button className="bg-indigo-500 my-2 p-2 rounded-lg text-white cursor-pointer" onClick={() => createGame()}>Créer la partie</button>
            </div>
        </div>
    );
}

export default Params;