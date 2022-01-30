import React, { useEffect } from 'react';
import blackjack from '../Assets/blackjack.png'
import bataille from '../Assets/bataille.png'
import shifumi from '../Assets/chifumi2.png'
import { useNavigate } from 'react-router';
import Card from '../components/Card';

function Home(props) {

    const navigate = useNavigate();

    return (
        <div className="flex ">
            {
                props.connected == "true" ?
                    <main className="grid h-92vh items-center bg-gradient-to-t from-blue-200 to-indigo-900 p-5">
                        <div>
                            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                                <Card name="Blackjack" image={blackjack} route="/params/blackjack" />
                                <Card name="Bataille" image={bataille} route="/params/bataille" />

                                <div className="flex flex-col bg-gray-900  group relative shadow-lg rounded p-3" onClick={() => navigate('/params/shifumi')}>
                                    <div className="p-5 mx-auto">
                                        <h1 className="text-white text-5xl">Chi-Fu-Mi</h1>
                                    </div>
                                    <div className="mx-auto mt-12">
                                        <img className="w-full h-full 7xl:h-[58vh] 6xl:h-[54vh] 5xl:h-[50vh] 4xl:h-[46vh] 3xl:h-[42vh] 2xl:h-[42vh] xl:h-[30vh] md:w-full block rounded" src={shifumi} alt="chifumi" />
                                        <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 group-hover:cursor-pointer w-full h-full top-0 right-0.5 flex items-center group-hover:opacity-100 transition justify-evenly">
                                        </div>
                                    </div>
                                </div>

                            </section>
                        </div>
                    </main>

                    :
                    <div className="w-full flex justify-center items-center h-92vh">
                        <div className=" cursor-pointer ">
                            <h1 className="text-white font-sans font-bold  bg-indigo-400 text-center text-4xl p-4 border border-slate-300 rounded-xl" onClick={() => { navigate("/login") }}> Veuillez vous connecter</h1>
                        </div>
                    </div>
            }

        </div>
    );
}

export default Home;