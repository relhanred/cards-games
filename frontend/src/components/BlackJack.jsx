import React, { useEffect, useState } from 'react';
import BlackJackService from '../services/blackjack-service';
import GameService from '../services/game.service';
import { useParams } from "react-router-dom";
import GameCard from './GameCard';
import { SiBookstack } from 'react-icons/si'
import { CgCardClubs } from 'react-icons/cg'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { HiMinusCircle } from 'react-icons/hi'

function BlackJack(props) {


    let params = useParams();
    const [game, setGame] = useState(null);
    const [play, setPlay] = useState(false);
    const [computer, setComputer] = useState(null);
    const [player, setPlayer] = useState(null);
    const [stayed, setStayed] = useState(false)
    const [lost, setLost] = useState(false);

    useEffect(() => {
        GameService.getGame(params.id).then(e => {
            if (e.status == 200) {
                setGame(e.data)
                setPlayers(e.data.playerList)
            }
        })
    }, []);

    const initGame = () => {
        BlackJackService.initGame(params.id).then(e => {
            if (e.status == 200) {
                setPlay(true)
                setLost(false)
                setStayed(false)
                setGame(e.data.result)
                setPlayers(e.data.result.playerList)
            }
        })
    }


    const setPlayers = (playerList) => {
        if (playerList != null && playerList.length >= 2) {
            playerList.forEach(player => {
                if (player != null && player.user == null) {
                    setComputer(player)
                } else {
                    setPlayer(player)
                }
            });
        }
    }

    const hasAce = (hand) => {
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].number == 1) {
                return true;
            }
        }
        return false;

    }

    const isAce = (card) => {
        return (card.number == 1);
    }

    const pickCard = (player) => {
        BlackJackService.pickCard(params.id, { playerId: player.id }).then(e => {
            if (e.status == 200) {
                setGame(e.data.result)
                setPlayers(e.data.result.playerList)
                let p = e.data.result.playerList[0];
                if (p.user == null) {
                    p = e.data.result.playerList[1];
                }
                if (p.score > 21) {
                    setLost(true);
                    setStayed(true)
                }
            }
        })

    }

    const stay = () => {
        if (computer.score < 17) {
            BlackJackService.pickCard(params.id, { playerId: computer.id }).then(e => {
                if (e.status == 200) {
                    setGame(e.data.result)
                    setPlayers(e.data.result.playerList)
                    let p = e.data.result.playerList[0];
                    if (p.user != null) {
                        p = e.data.result.playerList[1];
                    }
                    if (p.score < 17) {
                        BlackJackService.pickCard(params.id, { playerId: computer.id }).then(e => {
                            if (e.status == 200) {
                                setGame(e.data.result)
                                setPlayers(e.data.result.playerList)
                                let p = e.data.result.playerList[0];
                                if (p.user != null) {
                                    p = e.data.result.playerList[1];
                                }
                                if (p.score < 17) {
                                    BlackJackService.pickCard(params.id, { playerId: computer.id }).then(e => {
                                        if (e.status == 200) {
                                            setGame(e.data.result)
                                            setPlayers(e.data.result.playerList)
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }
        setLost(true)
        setStayed(true);

    }

    const replay = () => {
        initGame();
    }


    return (
        <div className="flex flex-col justify-between items-center h-full w-full">
            <div className="flex flex-col justify-between bg-green-600 rounded-b-full h-[88vh] my-2 m-6 w-[90%]">
                <div className="grid grid-cols-3 grid-rows-1">
                    <div className="flex flex justify-center items-center font-bold font-sans text-3xl">
                        <span className="text-white" >{game != null && ("Manche : " + game.manche + "/" + game.maxManche)}</span>
                    </div>
                    <div className="flex bg-green-400 rounded-b-3xl p-4 items-center justify-center">
                        {
                            computer != null &&
                            computer.hand.map((value, index) => {
                                if (index == 0) {
                                    return <GameCard key={index} symbol={value.symbol} number={value.number} color={value.color} size="160" />
                                } else {
                                    return <div key={index}>
                                        {
                                            stayed ?
                                                <GameCard symbol={value.symbol} number={value.number} color={value.color} size="160" />
                                                :
                                                <CgCardClubs size="160" />
                                        }
                                    </div>
                                }
                            })
                        }
                    </div>

                    <div className="flex items-center justify-items-end mx-auto w-fit my-2 pr-2 rounded-r-xl">
                        <div className="mx-6">
                            <SiBookstack size="160" className="text-slate-700" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center h-28">
                    {

                        (computer != null && play === true && stayed == false) ?
                            <div className="flex items-start justify-center">
                                <span className="border border-yellow-500 text-yellow-500 rounded-lg bg-slate-800 px-4 py-2 text-center font-sans font-bold">
                                    {computer.hand[0] != null && (isAce(computer.hand[0]) == true ? computer.hand[0].number + " / " + (parseInt(computer.hand[0].number) + 10) : (computer.hand[0].number < 10 ? computer.hand[0].number : "10"))}
                                </span>
                            </div>
                            :
                            (
                                (computer != null && play === true && stayed == true) &&
                                <div className="flex items-start justify-center">
                                    <span className="border border-yellow-500 text-yellow-500 rounded-lg bg-slate-800 px-4 py-2 text-center font-sans font-bold">
                                        {computer.score}
                                    </span>
                                </div>
                            )
                    }
                </div>
                <div className="text-white uppercase text-xl text-center">{
                    (lost == true && game.manche < game.maxManche) &&
                    <div>
                        {(computer.score > player.score && computer.score <= 21 || (computer.score < player.score && player.score > 21))?
                        <div>L'ordinateur a gagn??</div>
                        : 
                        player.score < computer.score && player.score <= 21 &&
                        <div>{player.user.pseudo + " a gagn?? !"}</div>
                        }
                    </div>
                }</div>
                <div className="flex justify-around">
                    {/* <div className="flex rotate-45 pt-20 hidden">
                        <GameCard symbol="CLUB" number={5} color="RED" size="160" />
                        <GameCard symbol="CLUB" number={3} color="BLACK" size="160" />
                    </div> */}
                    <div className="flex items-center justify-center ">
                        {
                            play == false ?
                                <button className="border bg-indigo-300 p-4 text-xl font-sans uppercase text-white rounded-xl" onClick={() => initGame()}>Jouer</button>
                                :
                                (
                                    lost == false ? (
                                        <div className="grid grid-cols-2 grid-rows-1">
                                            <div className="flex flex-col  px-4 py-6 cursor-pointer" onClick={() => pickCard(player)}>
                                                <BsFillPlusCircleFill size="80" className="text-green-300 hover:text-green-100" />
                                                <span className="text-white text-2xl text-center mt-4">Tirer</span>
                                            </div>

                                            <div className="flex flex-col px-4 py-4 cursor-pointer" onClick={() => stay()}>
                                                <HiMinusCircle size="94" className="text-red-600 mb-2 hover:text-red-400" />
                                                <span className="text-white text-2xl text-center ">Rester</span>
                                            </div>
                                        </div>
                                    )
                                        :
                                        (game.manche < game.maxManche) ?
                                        <button className="border bg-indigo-300 p-4 text-xl font-sans uppercase text-white rounded-xl" onClick={() => replay()}>Rejouer</button>
                                        : 
                                        <div className="text-white uppercase text-center text-3xl"> La partie est termin??e !</div>
                                )
                        }
                    </div>
                    {/* <div className="flex rotate-[-45deg] pt-20 hidden">
                        <GameCard symbol="CLUB" number={1} color="RED" size="160" />
                        <GameCard symbol="CLUB" number={2} color="BLACK" size="160" />
                    </div> */}

                </div>
                <div className="flex flex-col items-center justify-center pb-10">
                    {
                        (player != null && play === true && stayed == false) ?
                            <div className="flex items-center justify-center">
                                <span className="border border-yellow-500 text-yellow-500 rounded-lg bg-slate-800 px-4 py-2 text-center font-sans font-bold">{(hasAce(player.hand) == true ? (parseInt(player.score) - 10) + " / " + player.score : player.score)}</span>
                            </div>
                            : (
                                (player != null && play === true && stayed == true && (player.score + 10) < 21) ?
                                    <div className="flex items-center justify-center">
                                        <span className="border border-yellow-500 text-yellow-500 rounded-lg bg-slate-800 px-4 py-2 text-center font-sans font-bold">{(hasAce(player.hand) == true ? (parseInt(player.score) + 10) + " / " + player.score : player.score)}</span>
                                    </div>
                                    :
                                    ((player != null && play === true && stayed == true && (player.score + 10) >= 21)) &&
                                    <div className="flex items-center justify-center">
                                        <span className="border border-yellow-500 text-yellow-500 rounded-lg bg-slate-800 px-4 py-2 text-center font-sans font-bold">{player.score}</span>
                                    </div>
                            )
                    }
                    <div className="flex overflow-hidden justify-center items-center w-fit">
                        {
                            player != null &&
                            player.hand.map((value, index) => {
                                return <GameCard key={index} symbol={value.symbol} number={value.number} color={value.color} size="160" />
                            })
                        }
                    </div>
                    <div className="font-sans font-bold text-yellow-500 text-xl">
                        <span>{player != null && player.user.pseudo}</span>
                    </div>
                </div>

            </div>
        </div >
    );
}

export default BlackJack;