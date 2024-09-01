import React, { useState } from "react";
import { FCFS, SJF, SRJF, RR } from "../algorithms/algos";
import GanttChart from "./GanttChart";
import GanttChartSRJF from "./GantChartSRJF";
import RRGanttChart from "./RRGanttChart";

const SelectAlgo: React.FC = () => {
  const [algo, setAlgo] = useState<string>("FCFS");
  const [makeGantt, setMakeGantt] = useState<boolean>(false);
  const [ganttKey, setGanttKey] = useState<number>(0);
  const [quantTime, setQuantTime] = useState<number | undefined>(undefined);
  const [isQuant, setIsQuant] = useState<boolean>(false);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAlgo = e.target.value;
    setAlgo(selectedAlgo);
    setMakeGantt(false);
    setIsQuant(selectedAlgo === "RR");
    localStorage.setItem("algo", selectedAlgo);
  };

  const handleRun = () => {
    setMakeGantt(false);

    switch (algo) {
      case "FCFS":
        FCFS();
        break;
      case "SJF":
        SJF();
        break;
      case "SRJF":
        SRJF();
        break;
      case "RR":
        RR(quantTime);
        break;
      default:
        break;
    }

    setMakeGantt(true);
    setGanttKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="flex items-center justify-center w-full p-6 flex-col">
      <div className="flex flex-col m-10">
        <h1 className="text-3xl font-semibold text-gray-700 underline decoration-blue-500">
          {algo} Algorithm
        </h1>
        <div className="flex md:flex-row items-center mt-6 space-x-4">
          <select
            className="text-black bg-gray-200 rounded-lg p-3 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSelect}
            value={algo}
          >
            <option value="FCFS">FCFS</option>
            <option value="SJF">SJF</option>
            <option value="SRJF">SRJF</option>
            <option value="RR">RR</option>
          </select>
          {isQuant && (
            <input
              type="number"
              placeholder="Enter Quantum Time"
              className="rounded-lg border-2 border-gray-300 text-center p-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={quantTime || ""}
              onChange={(e) => setQuantTime(Number(e.target.value))}
            />
          )}
          <button
            className="px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105"
            onClick={handleRun}
          >
            RUN
          </button>
        </div>
      </div>
      {makeGantt && (
        <div className="flex">
          {algo === "RR" ? (
            <RRGanttChart key={ganttKey} />
          ) : algo === "SRJF" ? (
            <GanttChartSRJF key={ganttKey} />
          ) : (
            <GanttChart key={ganttKey} />
          )}
        </div>
      )}
    </div>
  );
};

export default SelectAlgo;
