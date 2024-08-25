import React, { useState } from "react";
import { FCFS, SJF, SRJF, RR } from "../algorithms/algos";    
import GanttChart from "./GanttChart";
import GanttChartSRJF from "./GantChartSRJF";

const SelectAlgo: React.FC = () => {
    const [algo, setAlgo] = useState<string>("FCFS");
    const [makeGantt, setMakeGantt] = useState<boolean>(false);
    const [ganttKey, setGanttKey] = useState<number>(0);
    const [quantTime, setQuantTime] = useState<number | undefined>(undefined);
    const [isQuant, setIsQuant] = useState<boolean>(false);

    localStorage.setItem("algo", algo);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setMakeGantt(false);
        localStorage.setItem("algo", e.target.value);
        setAlgo(e.target.value);
        if(e.target.value === "RR") setIsQuant(true);
        else setIsQuant(false);
    };

    const handleRun = () => {
        setMakeGantt(false);

        switch (algo) {
            case "FCFS":
                FCFS();
                setMakeGantt(true);
                setGanttKey(ganttKey + 1);
                break;
            
            case "SJF":
                SJF();
                setMakeGantt(true);
                setGanttKey(ganttKey + 1);
                break;

            case "SRJF":
                SRJF();
                setMakeGantt(true);
                setGanttKey(ganttKey + 1);
                break;

            case "RR":
                RR(quantTime);
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
                {isQuant && 
                <input type="number" placeholder="Enter Quant Time" className="rounded-xl border-2 border-black text-center" value={quantTime} onChange={(e) => setQuantTime(+e.target.value)} />}
                <button
                    className="border-2 border-black px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-700 text-md font-bold transition duration-200 hover:border-gray-500 text-gray-300 hover:text-white"
                    onClick={handleRun}
                >
                    RUN
                </button>

                {makeGantt && (algo === "SRJF" ? <GanttChartSRJF key={ganttKey} /> : <GanttChart key={ganttKey} />)}
            </div>
        </>
    );
};

export default SelectAlgo;
