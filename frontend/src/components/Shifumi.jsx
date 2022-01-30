import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { FaHandScissors, FaHandPaper, FaHandRock } from 'react-icons/fa'
import ShifumiService from '../services/shifumi.service';
import GameService from '../services/game.service';


function Shifumi() {

    let params = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [card, setCard] = useState("");
    const [ennemyCard, setEnnemyCard] = useState("");
    const [winner, setWinner] = useState("")
    const [game, setGame] = useState(null);
    const symbolEnum = ["ROCK", "SCISSORS", "PAPER"];
    const [hasPlayed, setHasPlayed] = useState(false);

    const play = (Symbol) => {
        if (!hasPlayed && game.manche < game.maxManche) {
            setHasPlayed(true);
            setCard(Symbol)
            const iaSymbol = symbolEnum[Math.floor(Math.random() * 3)]
            setEnnemyCard(iaSymbol)
            let symbolList = [Symbol]
            symbolList.push(iaSymbol);
            ShifumiService
                .play(params.id, symbolList)
                .then(e => {
                    setGame(e.data.result);
                    if (e.data.result.manche === e.data.result.maxManche) {
                        winnerResult(e.data.result.winner)
                    } else {
                        if (e.data.result.lastWinner != null) {
                            if (e.data.result.lastWinner.user != null) {
                                setWinner(e.data.result.lastWinner.user.pseudo + " a gagné la manche")
                            } else {
                                setWinner("L'ordinateur a gagné la manche")
                            }
                        } else {
                            setWinner("Manche nul")
                        }
                    }
                    setTimeout(() => {
                        setHasPlayed(false);
                    }, 250);

                });
        }
    }

    const winnerResult = (winner) => {
        if (winner != null) {
            if (winner.user != null) {
                setWinner(winner.user.pseudo + " a gagné la partie !")
            } else {
                setWinner(" L'ordinateur a gagné la partie !")
            }
        } else {
            setWinner("Match nul !")
        }
    }

    const hand = (symbol, position) => {
        let color = "text-green-500"
        if (position == "TOP") {
            color = "text-red-500"
        }
        if (symbol === "ROCK") {
            return <div className={"border px-6 py-10 mx-auto my-2 rounded-md cursor-pointer " + (color)} ><FaHandRock size="150" /></div>
        } else if (symbol === "SCISSORS") {
            return <div className={"border px-6 py-10 mx-auto my-2 rounded-md cursor-pointer " + (color)} ><FaHandScissors size="150" /></div>
        } else if (symbol === "PAPER") {
            return <div className={"border px-6 py-10 mx-auto my-2 rounded-md cursor-pointer " + (color)} ><FaHandPaper size="150" /></div>
        } else {
            return;
        }
    }

    useEffect(() => {
        GameService.getGame(params.id).then(e => {
            if (e.status == 200) {
                setGame(e.data);
            }
        })
    }, []);


    return (
        <div className="h-[92vh] w-full flex ">
            <div className="flex flex-col m-4 p-4 text-center justify-between text-2xl">
                <div className="flex-col justify-left m-2 p-2 border">
                    <div className="font-bold">{game !== null && (game.playerList[1].user == null ? "Ordinateur" : game.playerList[1].user.pseudo)}</div>
                    <div>Score : <span>{game !== null && (game.playerList[1].user == null ? game.playerList[1].score : "")}</span></div>
                </div>
                <div className="flex flex-col m-4 p-4 text-center justify-center text-2xl"><span> Manche</span><span>{game != null ? game.manche + " / " + game.maxManche : ""}</span></div>
                <div className="flex-col justify-left m-2 p-2 border">
                    <div className="font-bold">{game != null && game.playerList[0].user != null ? game.playerList[0].user.pseudo : "Ordinateur"}</div>
                    <div>Score : <span>{game !== null && (game.playerList[0] != null ? game.playerList[0].score : "")}</span></div>
                </div>
            </div>
            <div className="flex flex-col justify-between border w-[80%] my-4 mx-auto">
                <div className="flex">

                    <div className="flex self-center mx-auto justify-center">
                        <div className={"border px-6 py-10 m-2 rounded-md  text-red-500 " + (ennemyCard === "ROCK" && hasPlayed ? "bg-slate-300 cursor-default" : "bg-white cursor-pointer")} ><FaHandRock size="150" /></div>
                        <div className={"border px-6 py-10 m-2 rounded-md text-red-500 " + (ennemyCard === "SCISSORS" && hasPlayed ? "bg-slate-300 cursor-default" : "bg-white cursor-pointer")} ><FaHandScissors size="150" /></div>
                        <div className={"border px-6 py-10 m-2 rounded-md text-red-500 " + (ennemyCard === "PAPER" && hasPlayed ? "bg-slate-300 cursor-default" : "bg-white cursor-pointer")} ><FaHandPaper size="150" /></div>
                    </div>
                </div>
                <div className="flex items-center mx-4">
                    {
                        card !== "" ?
                            hand(card, "BOT")
                            :
                            <span></span>
                    }
                    <div className="text-3xl uppercase text-center">{winner}</div>
                    {
                        card !== "" ?
                            hand(ennemyCard, "TOP")
                            :
                            <span></span>
                    }
                    {/* <button onClick={() => play("ROCK")}> play </button> */}
                </div>
                <div className="flex">

                    <div className="flex self-center mx-auto justify-center">
                        <div className={"border px-6 py-10 m-2 rounded-md cursor-pointer text-green-500 " + (card === "ROCK" && hasPlayed ? "bg-slate-300" : "bg-white")} onClick={() => play("ROCK")}><FaHandRock size="150" /></div>
                        <div className={"border px-6 py-10 m-2 rounded-md cursor-pointer text-green-500 " + (card === "SCISSORS" && hasPlayed ? "bg-slate-300 " : "bg-white")} onClick={() => play("SCISSORS")}><FaHandScissors size="150" /></div>
                        <div className={"border px-6 py-10 m-2 rounded-md cursor-pointer text-green-500 " + (card === "PAPER" && hasPlayed ? "bg-slate-300 " : "bg-white")} onClick={() => play("PAPER")}><FaHandPaper size="150" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shifumi;