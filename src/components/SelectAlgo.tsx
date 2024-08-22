import React, { useState } from "react";
import { FCFS, SJF } from "../algorithms/algos";    
import GanttChart from "./GanttChart";

const SelectAlgo: React.FC = () => {
    const [algo, setAlgo] = useState<string>("FCFS");
    const [makeGantt, setMakeGantt] = useState<boolean>(false);
    const [ganttKey, setGanttKey] = useState<number>(0);

    localStorage.setItem("algo", algo);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setMakeGantt(false);
        localStorage.setItem("algo", e.target.value);
        setAlgo(e.target.value);
    };

    const handleRun = () => {
        setMakeGantt(false);
        switch (algo) {
            case "FCFS":
                FCFS();
                setMakeGantt(true);
                setGanttKey(ganttKey+1);
                break;
            
            case "SJF":
                SJF();
                setMakeGantt(true);
                setGanttKey(ganttKey+1);
                break;
        }
    };

    return (
        <>
            <div className="mt-5 text-center flex justify-center items-center flex-col gap-5">
                <h1 className="text-gray-400 text-2xl underline">{algo}</h1>
                <select className="text-black bg-gray-300 rounded-lg p-2 w-fit" onChange={handleSelect} value={algo}>
                    <option value="FCFS">FCFS</option>
                    <option value="SJF">SJF</option>
                    <option value="SRJF">SRJF</option>
                    <option value="RR">RR</option>
                </select>
                <button
                    className="border-2 border-black px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-700 text-md font-bold transition duration-200 hover:border-gray-500 text-gray-300 hover:text-white"
                    onClick={handleRun}
                >
                    RUN
                </button>

               {makeGantt && <GanttChart key={ganttKey}/>} {/* Passing key so that the gantt chart get refresh when clicked on run */}
               
            </div>
        </>
    );
};

export default SelectAlgo;
