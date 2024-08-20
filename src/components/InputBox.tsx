import React, { useState, useEffect } from "react";
import icon from "../icons8-close.svg";

interface Process {
    pid: string;
    burst: number;
    arrival: number;
    completion?: number;
    tat?: number;
    wt?: number;
}

const InputBox: React.FC = () => {
    const [processes, setProcesses] = useState<Process[]>([]);
    const [burst, setBurst] = useState<number>();
    const [arrival, setArrival] = useState<number>();
    const [err, setErr] = useState<string>("");

    useEffect(() => {
        const storedProcesses = localStorage.getItem("proc");
        if (storedProcesses) {
            setProcesses(JSON.parse(storedProcesses));
        }
    }, );

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErr("");

        if (burst !== undefined && arrival !== undefined) {
            const newProcess: Process = {
                pid: `P${processes.length + 1}`,
                burst: burst,
                arrival: arrival
            };
            const updatedProcesses = [...processes, newProcess];
            setProcesses(updatedProcesses);
            localStorage.setItem("proc", JSON.stringify(updatedProcesses));
        } else {
            setErr("Please enter both Arrival Time and Burst Time");
        }
        setBurst(undefined);
        setArrival(undefined);
    };

    const handleDelete = (pid: string) => {
        const updatedProcesses = processes.filter(p => p.pid !== pid);
        const updatedProcessesWithNewPids = updatedProcesses.map((p, index) => ({
            ...p,
            pid: `P${index+1}`
        }));
        setProcesses(updatedProcessesWithNewPids);
        localStorage.setItem("proc", JSON.stringify(updatedProcessesWithNewPids));
    };

    return (
        <>
         {err && <h1 className="text-red-500 text-xl mb-4">{err}</h1>}
        
            <div className="flex flex-row items-center justify-center text-white md:gap-20">
           
            <form onSubmit={handleFormSubmit} className="w-full max-w-xl bg-gray-800 p-6 rounded-3xl shadow-xl">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="arrival">
                        Set Arrival Time
                    </label>
                    <input
                        id="arrival"
                        value={arrival || ''}
                        type="number"
                        onChange={(e) => setArrival(parseInt(e.target.value))}
                        placeholder="Arrival Time"
                        className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="burst">
                        Set Burst Time
                    </label>
                    <input
                        id="burst"
                        value={burst || ''}
                        type="number"
                        onChange={(e) => setBurst(parseInt(e.target.value))}
                        placeholder="Burst Time"
                        className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-900 hover:rounded-xl hover:text-gray-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                >
                    Add Process
                </button>
            </form>

            {processes.length > 0 && (
                <table className="w-full max-w-2xl text-center bg-gray-700 rounded-3xl overflow-hidden border-t">
                    <thead>
                        <tr className="bg-gray-500 text-white">
                            <th className="px-4 py-2">Process ID</th>
                            <th className="px-4 py-2">Arrival Time</th>
                            <th className="px-4 py-2">Burst Time</th>
                            <th className="px-4 py-2">Completition Time</th>
                            <th className="px-4 py-2">Turn Around Time</th>
                            <th className="px-4 py-2">Waiting Time</th>
                            <th className="px-4 py-2">Close</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processes.map((proc, index) => (
                            <tr key={index} className={`border-t border-white ${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}`}>
                                <td className="px-4 py-2">{proc.pid}</td>
                                <td className="px-4 py-2">{proc.arrival}</td>
                                <td className="px-4 py-2">{proc.burst}</td>
                                <td className="px-4 py-2">{proc?.completion}</td>
                                <td className="px-4 py-2">{proc?.tat}</td>
                                <td className="px-4 py-2">{proc?.wt}</td>
                                <td className="px-4 py-2">
                                    <img
                                        src={icon}
                                        alt="Close icon"
                                        className="cursor-pointer w-6 h-6 inline"
                                        onClick={() => handleDelete(proc.pid)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </>
    );
};

export default InputBox;
