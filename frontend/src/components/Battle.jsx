import React, { useEffect, useState } from 'react';
import BattleService from '../services/battle.service';
import GameService from '../services/game.service';
import { useParams } from "react-router-dom";
import GameCard from './GameCard';
import { SiBookstack } from 'react-icons/si'

function Battle(props) {

    let params = useParams();
    const [game, setGame] = useState(null);
    const [firstPlayerCard, setFirstPlayerCard] = useState(null);
    const [secondPlayerCard, setSecondPlayerCard] = useState(null);
    const [winner, setWinner] = useState("");

    useEffect(() => {

        GameService.getGame(params.id).then(e => {
            if (e.status == 200) {
                setGame(e.data)
            }
        })
    }, []);


    const play = () => {
        if (game != null && game.manche < game.maxManche) {
            let random = Math.floor(Math.random() * game.playerList[0].hand.length);
            let firstCard = game.playerList[0].hand[random];
            setFirstPlayerCard(firstCard)
            random = Math.floor(Math.random() * game.playerList[1].hand.length);
            let secondCard = game.playerList[1].hand[random];
            setSecondPlayerCard(secondCard);
            let playerCardList = [];
            playerCardList.push(firstCard);
            playerCardList.push(secondCard);
            BattleService.play(params.id, playerCardList).then(e => {
                if (e.status == 200) {
                    setGame(e.data.result)
                    if(e.data.result.manche == e.data.result.maxManche) {
                        winnerResult(e.data.result.winner);
                    }
                }
            })
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

    return (
        <div className="flex h-[91vh] w-full justify-center items-center">
            <div className="flex flex-col w-fit m-2">
                <div className="font-bold text-xl text-center">Manche</div>
                <div className="font-bold text-center text-lg mt-2">{game != null && game.manche + " / " + game.maxManche}</div>
            </div>
            <div className="flex flex-col h-full w-8/12 justify-between items-center">
                <div className="flex w-full justify-between py-4">
                    <div className="w-fit" ><SiBookstack size="180" className="text-slate-500" /></div>
                    {game != null &&
                        <div className="flex flex-col ">
                            <div className="text-xl font-bold text-center p-3"> {game.playerList[1].user == null ? "Ordinateur" : game.playerList[1].user.pseudo}</div>
                            <div className="text-lg text-center p-3"> Score :  {game.playerList[1].score}</div>
                        </div>
                    }
                </div>
                <div className="w-full">

                    {
                        (secondPlayerCard != null && game != null) &&
                        <div className="flex items-center justify-center"><GameCard symbol={secondPlayerCard.symbol} number={secondPlayerCard.number} color={secondPlayerCard.color} size="200" /></div>

                    }
                    <div className="flex  w-full uppercase justify-center">
                        {
                            (firstPlayerCard == null || secondPlayerCard == null) ?
                                <div className="flex font-bold  text-3xl mr-6"><span className="w-fit">Commencez à jouer !</span></div>
                                :
                                (game.manche >= game.maxManche &&
                                    <div className="flex justify-center items-center"><div className="flex font-bold w-full justify-center items-center text-3xl py-4"><span className="w-fit">{winner}</span></div></div>
                                )
                        }

                    </div>
                    {
                        (firstPlayerCard != null && game != null) &&
                        <div className="flex items-center justify-center"><GameCard symbol={firstPlayerCard.symbol} number={firstPlayerCard.number} color={firstPlayerCard.color} size="200" /></div>

                    }

                </div>
                <div className="flex w-full justify-between py-4">
                    {game != null &&
                        <div className="flex flex-col justify-center">
                            <div className="p-3 text-xl font-bold text-center"> {game.playerList[0].user.pseudo}</div>
                            <div className="p-3 text-lg text-center"> Score :  {game.playerList[0].score}</div>
                        </div>
                    }
                    <div className="cursor-pointer w-fit" onClick={() => play()}><SiBookstack size="180" className="text-slate-500 hover:text-slate-600" /></div>
                </div>

            </div>
        </div >
    );
}

export default Battle;