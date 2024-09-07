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
    const [burst, setBurst] = useState<number | undefined>(undefined);
    const [arrival, setArrival] = useState<number | undefined>(undefined);
    const [err, setErr] = useState<string>("");

    useEffect(() => {
        const storedProcesses = localStorage.getItem("proc");
        if (storedProcesses) {
            setProcesses(JSON.parse(storedProcesses));
        }
    }, []);

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
            pid: `P${index + 1}`
        }));
        setProcesses(updatedProcessesWithNewPids);
        localStorage.setItem("proc", JSON.stringify(updatedProcessesWithNewPids));
    };

    return (
        <div className="flex items-center justify-center w-full p-6">
           
            
            <form onSubmit={handleFormSubmit} className="w-full max-w-lg p-6 bg-white rounded-xl shadow-md m-10">
            {err && <h1 className="text-red-500 text-lg mb-4">{err}</h1>}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="arrival">
                        Arrival Time
                    </label>
                    <input
                        id="arrival"
                        value={arrival !== undefined ? arrival : ''}
                        type="number"
                        onChange={(e) => setArrival(parseInt(e.target.value))}
                        placeholder="Enter Arrival Time"
                        className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="burst">
                        Burst Time
                    </label>
                    <input
                        id="burst"
                        value={burst !== undefined ? burst : ''}
                        type="number"
                        onChange={(e) => setBurst(parseInt(e.target.value))}
                        placeholder="Enter Burst Time"
                        className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-md shadow-md transform transition duration-300 hover:scale-105"
                >
                    Add Process
                </button>
            </form>

            {processes.length > 0 && (
                <div className="w-full max-w-2xl overflow-x-auto">
                    <table className="min-w-full bg-white rounded-xl shadow-md text-center">
                        <thead>
                            <tr className="bg-indigo-500 text-white text-sm">
                                <th className="px-4 py-2">Process ID</th>
                                <th className="px-4 py-2">Arrival Time</th>
                                <th className="px-4 py-2">Burst Time</th>
                                <th className="px-4 py-2">Completion Time</th>
                                <th className="px-4 py-2">Turn Around Time</th>
                                <th className="px-4 py-2">Waiting Time</th>
                                <th className="px-4 py-2">Close</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processes.map((proc, index) => (
                                <tr key={index} className={`border-t border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
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
                                            className="cursor-pointer w-5 h-5 transform hover:scale-110 transition duration-200"
                                            onClick={() => handleDelete(proc.pid)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InputBox;
