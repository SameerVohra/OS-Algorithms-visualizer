import React, { useState } from "react";

interface Process {
    pid: string;
    burst: number;
    arrival: number;
}

const InputBox: React.FC = () => {
    const [processes, setProcesses] = useState<Process[]>([]);
    const [burst, setBurst] = useState<number>();
    const [arrival, setArrival] = useState<number>();
    const [err, setErr] = useState<string>("");

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErr("");

        if (burst !== undefined && arrival !== undefined) {
            const newProcess: Process = { pid: `P${processes.length}`, burst: burst || 0, arrival: arrival || 0 };
            setProcesses([...processes, newProcess]);
        } else {
            setErr("Enter a value");
        }
        setBurst(undefined);
        setArrival(undefined);

        processes.forEach((process) => {
            console.log(process);
        });
    };

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
            {err && <h1 className="text-red-500 text-xl mb-4">{err}</h1>}
            <h1 className="text-3xl font-bold mb-8">Enter Process</h1>
        
            <form onSubmit={handleFormSubmit} className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
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

            <table className="mt-8 w-full max-w-md text-center bg-gray-700 rounded-lg shadow-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-800 text-gray-300">
                        <th className="px-4 py-2">Process ID</th>
                        <th className="px-4 py-2">Arrival Time</th>
                        <th className="px-4 py-2">Burst Time</th>
                    </tr>
                </thead>
                <tbody>
                    {processes.map((proc, index) => (
                        <tr key={index} className= {`border-t border-gray-700 ${index%2==0?'bg-gray-700':'bg-gray-500'}`}>
                            <td className="px-4 py-2">{proc.pid}</td>
                            <td className="px-4 py-2">{proc.arrival}</td>
                            <td className="px-4 py-2">{proc.burst}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InputBox;
