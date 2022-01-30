import React, { useEffect, useState } from 'react';
import AdminService from '../services/admin.service';
import { FaFilePdf, FaFileCsv } from 'react-icons/fa'



function AdminUsers(props) {

    const [tab, setTab] = useState([])
    const [page, setPage] = useState(1)
    const [max, setMax] = useState(null)
    const [hasCharged, setHasCharged] = useState(false)
    const [itemsPerPages, setItemsPerPages] = useState(8);
    const [pdf, setPdf] = useState("");


    useEffect(() => {
        generatePdf();
        AdminService.getAllUsers().then(e => {
            setTab(e.data.slice(((page - 1) * itemsPerPages), (((page - 1) * itemsPerPages) + itemsPerPages)))
            setMax(e.data.length)
            setHasCharged(true)
        })
    }, [page, max])

    const incrementPage = () => {
        setPage(page + 1)
    }

    const decrementPage = () => {
        setPage(page - 1)
    }

    const deletePlayer = (id) => {
        AdminService.deletePlayer(id).then(e => {
            setMax(max - 1);
            if (e.status == 200) {

            }
        })
    }

    const generatePdf = () => {
        const pdf = AdminService.generatePdf();
        setPdf(pdf);
    }

    return (
        <div>
            <div className="bg-white p-8 rounded-md w-full">
                <div className="grid grid-cols-3 grid-rows-1  ">
                    <div className="flex items-center justify-between">
                        {/* <div className="space-x-8">
                            <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Ajouter Utilisateur</button>
                            <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Ajouter Admin</button>
                        </div> */}
                    </div>
                    <h2 className="text-gray-600 font-semibold uppercase text-xl text-center">Utilisateurs</h2>
                    <div className="h-full w-full flex justify-end space-x-6">
                        <a href={pdf}><FaFilePdf size="50" className="text-red-400 cursor-pointer" /></a>
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
                                            Email
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Pseudo
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Role
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
                                                    <p className="text-gray-900 whitespace-no-wrap">{value.email}</p>
                                                </td>
                                                <td className="p-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {value.pseudo}
                                                    </p>
                                                </td>
                                                <td className="p-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {value.role}
                                                    </p>
                                                </td>
                                                <td className="flex items-center justify-start p-5 border-b text-sm" onClick={() => deletePlayer(value.id)}>
                                                    <span className="flex inline-block py-2 px-4 mr-4 bg-red-500 hover:bg-red-400 font-semibold text-white w-fit rounded-lg leading-tight cursor-pointer">
                                                        Supprimer
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

export default AdminUsers;