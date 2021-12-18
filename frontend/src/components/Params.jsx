import React , {useState} from 'react';
import computer from '../Assets/computer.png';
import persons from '../Assets/persons.png';
import { useParams , useNavigate } from "react-router-dom";
import Card from './Card'
import { BsArrowLeftSquareFill } from 'react-icons/bs';


function Params(props) {

    let params = useParams();
    const navigate = useNavigate();

    const [gameType, setGameType] = useState("")

    const display = (e) => {
        console.log(e);
    }

    const backReturn = (e) => {
        navigate("/");
    } 

    return (
        <div>
            <div className="bg-indigo-900 flex"> 
                    <BsArrowLeftSquareFill size="75" color="white" className ="ml-2 mt-2 border-2 border-indigo-900 cursor-pointer" onClick={backReturn} />
            </div>
            <main className="grid h-92vh items-center bg-gradient-to-t from-blue-200 to-indigo-900 p-5">
                <div>
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card name="Ordinateur" image={computer} route="/login" bg="bg-slate-300 text-black" textColor="text-black" onClick={display}/>
                        <Card name="En ligne" image={persons} route="/login" bg="bg-slate-300 text-black"/>
                    </section>
                </div>
            </main>

        </div>
    );
}

export default Params;