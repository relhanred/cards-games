import React, { useEffect, useState } from 'react';
import GameService from '../services/game.service';
import { useNavigate } from 'react-router';

function UserGames(props) {


    const [tab, setTab] = useState([])
    const [page, setPage] = useState(1)
    const [max, setMax] = useState(null)
    const [hasCharged, setHasCharged] = useState(false)
    const [itemsPerPages, setItemsPerPages] = useState(8);
    const navigate = useNavigate();


    useEffect(() => {
        GameService.getGames().then(e => {
            if (e.status == 200) {
                setTab(e.data.slice(((page - 1) * itemsPerPages), (((page - 1) * itemsPerPages) + itemsPerPages)))
                setMax(e.data.length)
                setHasCharged(true)
            }
        })
    }, [page, max])

    const incrementPage = () => {
        setPage(page + 1)
    }

    const decrementPage = () => {
        setPage(page - 1)
    }

    const gameName = (game) => {
        if (game == "battle") {
            return "bataille";
        } else if (game == "chifumi") {
            return "shifumi"
        } else {
            return game;
        }

    }

    return (
        <div>
            <div className="bg-white p-8 rounded-md w-full">
                <div className=" flex items-center justify-center pb-6">
                    <div>
                        <h2 className="text-gray-600 font-semibold uppercase text-xl">Parties</h2>
                    </div>
                </div>
                <div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Créateur
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Manche
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Etat
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (hasCharged && tab != null) &&
                                        tab.map((value, index) => {
                                            return <tr key={index}>
                                                <td className="p-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {value.name}
                                                    </p>
                                                </td>
                                                <td className="p-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {
                                                            value != null && (
                                                                (value.playerList != null && value.playerList.length > 1) && (
                                                                    value.playerList[0].user != null ? value.playerList[0].user.pseudo : (value.playerList[1].user != null && value.playerList[1].user.pseudo)
                                                                )
                                                            )
                                                        }

                                                    </p>
                                                </td>
                                                <td className="p-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {value.manche} / {value.maxManche}
                                                    </p>
                                                </td>
                                                <td className="p-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap uppercase">
                                                        {value.finished ? "terminée" : "en cours"}
                                                    </p>
                                                </td>
                                                <td className="flex items-center justify-start p-5 border-b text-sm" onClick={() => navigate("/game/" + gameName(value.name.toLowerCase()) + "/" + value.id)}>
                                                    <span className="flex inline-block py-2 px-4 mr-4 bg-indigo-500 hover:bg-indigo-400 font-semibold text-white w-fit rounded-lg leading-tight cursor-pointer">
                                                        Reprendre
                                                    </span>
                                                </td>
                                            </tr>
                                        })

                                    }

                                </tbody>
                            </table>
                            <div
                                className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                                <div className="inline-flex mt-2 xs:mt-0">
                                    <button className={"text-sm text-indigo-50 transition duration-150  font-semibold py-2 px-4 rounded-l-lg " + (page == 1 ? "cursor-default bg-indigo-300" : "hover:bg-indigo-500 cursor-pointer bg-indigo-600")} disabled={page == 1} onClick={() => { decrementPage() }}>
                                        Prev
                                    </button>
                                    &nbsp; &nbsp;
                                    <button className={"text-sm text-indigo-50 transition duration-150 font-semibold py-2 px-4 rounded-r-lg " + ((page * itemsPerPages) >= max ? "cursor-default bg-indigo-300" : "hover:bg-indigo-500 cursor-pointer bg-indigo-600")} disabled={(page * itemsPerPages) >= max} onClick={() => { incrementPage() }}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserGames;