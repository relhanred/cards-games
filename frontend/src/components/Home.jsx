import React, { useEffect } from 'react';
import blackjack from '../Assets/blackjack.png'
import bataille from '../Assets/bataille.png'


function Home(props) {

    return (
        <main class="grid h-92vh items-center bg-gradient-to-t from-blue-200 to-indigo-900 p-5">
            <div>
                <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div class="flex flex-col bg-gray-900  shadow-lg rounded p-3">
                        <div class="p-5 mx-auto">
                            <h1 class="text-white text-5xl">Blackjack</h1>
                        </div>
                        <div class="group relative mx-auto">
                            <img class="w-full md:w-full block rounded" src={blackjack} alt="blackjack" />
                            <div class="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 group-hover:cursor-pointer w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">

                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col bg-gray-900  shadow-lg rounded p-3">
                        <div class="p-5 mx-auto">
                            <h1 class="text-white text-5xl">Bataille</h1>
                        </div>
                        <div class="group relative mx-auto mt-5">
                            <img class="w-11/12 md:w-9/12 m-auto block rounded" src={bataille} alt="blackjack" />
                            <div class="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 group-hover:cursor-pointer w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">

                            </div>
                        </div>
                    </div>

                      <div class="flex flex-col bg-gray-900  shadow-lg rounded p-3">
                        <div class="p-5 mx-auto">
                            <h1 class="text-white text-5xl">Shifumi</h1>
                        </div>
                        <div class="group relative mx-auto">
                            <img class="w-full md:w-full block rounded" src={blackjack} alt="blackjack" />
                            <div class="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 group-hover:cursor-pointer w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">

                            </div>
                        </div>
                    </div>

     

                </section>
            </div>
        </main>
    );
}

export default Home;