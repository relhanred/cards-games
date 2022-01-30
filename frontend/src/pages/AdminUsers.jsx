import React, { useEffect, useState } from 'react';
import AdminService from '../services/admin.service';
import { FaFilePdf, FaFileCsv } from 'react-icons/fa'
import { BiArrowBack } from 'react-icons/bi'




function AdminUsers(props) {

    const [tab, setTab] = useState([])
    const [page, setPage] = useState(1)
    const [max, setMax] = useState(null)
    const [hasCharged, setHasCharged] = useState(false)
    const [itemsPerPages, setItemsPerPages] = useState(8);
    const [pdf, setPdf] = useState("");
    const [admin, setAdmin] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")


    useEffect(() => {
        generatePdf();
        AdminService.getAllUsers().then(e => {
            setTab(e.data.slice(((page - 1) * itemsPerPages), (((page - 1) * itemsPerPages) + itemsPerPages)))
            setMax(e.data.length)
            setHasCharged(true)
        })
    }, [page, max, admin])

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

    const addAdmin = () => {
        AdminService.addAdmin({
            email: email, 
            password: password,
            pseudo: pseudo
        }).then(e => {
            console.log(e)
            if(e.status == 201) {
                setAdmin(false)
                setPseudo("")
                setEmail("")
                setPassword("")
            }
        })
    }

    return (
        <div className="flex flex-col">
            <BiArrowBack size="40" onClick={() => setAdmin(false)} className={"mx-4 my-2 cursor-pointer "+(!admin && "hidden")}/>
            {
                !admin ?
                    <div className="bg-white p-8 rounded-md w-full">
                        <div className="grid grid-cols-3 grid-rows-1  ">
                            <div className="flex items-center justify-between">
                                <div className="space-x-8">
                                    {/* <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Ajouter Utilisateur</button> */}
                                    <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" onClick={() => setAdmin(true)}>Ajouter Admin</button>
                                </div>
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
                    :
                    <div className="flex h-[92vh] w-full justify-center items-center">
                        <div className="flex flex-col border shadow p-6 rounded-xl w-[45%]">
                            <h1 className="uppercase text-2xl text-center text-bold font-sans text-slate-600 m-4">Ajouter administrateur</h1>
                            <input type="text" placeholder="Pseudo" className="border p-2 rounded-lg m-4" value={pseudo} onChange={(e) => setPseudo(e.target.value)}/>
                            <input type="text" placeholder="Adresse email" className="border p-2 rounded-lg m-4" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" placeholder="Mot de passe" className="border p-2 rounded-lg m-4" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <button className="bg-indigo-600 p-2 text-white rounded-lg text-xl m-4" onClick={() => addAdmin()}>Ajouter</button>
                        </div>
                    </div>
            }
        </div>
    );
}

export default AdminUsers;