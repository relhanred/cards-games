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
    const [nbManche, setNbManche] = useState(5)
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
            ia: ia
        }
        let err = false;
        if (nbManche < 1 || nbManche > 52 || (params.title == "blackjack" && nbPlayers == "")) {
            err = true;
            setError(true)
        }
        if (err === false) {
            if (params.title == "shifumi") {
                createShifumi(form);
            } else if (params.title == "bataille") {
                createBattle(form);
            } else {
                form = {
                    manche: nbManche,
                    ia: ia,
                    nbPlayers: parseInt(nbPlayers, 10)
                }
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
        console.log(form);
        BattleService.create(form).then(e => {
            if (e.status == 201) {
                navigate("/game/" + params.title + "/" + e.data.result.id)
            }
        })
    }


    const createBlackJack = (form) => {
        console.log(form)
        BlackJackService.create(form).then(e => {
            console.log(e);
            if (e.status == 201) {
                navigate("/game/" + params.title + "/" + e.data.result.id)
            }
        })
    }


    return (
        <div className="flex flex-col w-vh h-[92vh] items-center">
            <div className="flex flex-col border rounded-lg p-6 my-6">
                <h1 className="my-4  font-mono text-5xl p-4 text-center">{capitalizeFirstLetter(params.title)}</h1>
                <div className="flex  my-4">
                    <div className={"flex flex-col cursor-pointer border rounded-lg m-2 " + (ia ? "bg-slate-200" : "bg-white")} onClick={() => setIa(true)}>
                        <RiComputerLine size="300" className="text-slate-400" />
                    </div>
                    <div className={"cursor-pointer border rounded-lg m-2 " + (!ia ? "bg-slate-200" : "bg-white")} onClick={() => setIa(false)}>
                        <BsPersonFill size="300" className="text-slate-400" />
                    </div>
                </div>
                <div className="flex flex-col my-4">
                    <label className="text-xl w-full mb-2 px-2">Manches</label>
                    <input type="number" className={"border rounded-md py-2 px-4 w-full "+((error && (nbManche < 1 || nbManche > 52)) && "border-red-500")} value={nbManche} min="1" max="52" onChange={(e) => setNbManche(e.target.value)} />
                </div>
                {
                    params.title == "blackjack" &&

                    <select className={"border rounded-lg p-2 bg-white my-4 "+((error && nbPlayers == "") && "border-red-500")} value={nbPlayers} onChange={(e) => setNbPlayers(e.target.value)}>
                        <option value="" disabled >Nombre de joueurs</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>

                }
                <button className="bg-indigo-500 my-2 p-2 rounded-lg text-white cursor-pointer" onClick={() => createGame()}>Créer la partie</button>
            </div>
        </div>
    );
}

export default Params;