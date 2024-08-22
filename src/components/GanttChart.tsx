import { useEffect, useState } from "react";

interface Proc {
    pid: string;
    burst: number;
    arrival: number;
    completion: number;
    tat: number;
    wt: number;
}

const GanttChart: React.FC = () => {
    const [process, setProcess] = useState<Proc[]>([]);
    const [avgWt, setAvgWt] = useState<number>(0);
    const [avgTAT, setAvgTAT] = useState<number>(0);

    useEffect(() => {
        const storedProcesses = localStorage.getItem("proc");
        if (storedProcesses) {
            const procs: Proc[] = JSON.parse(storedProcesses);
            setProcess(procs);
            console.log(procs.length);

            const totalWt:number = procs.reduce((acc, pro) => acc + pro.wt, 0);
            const totalTAT:number = procs.reduce((acc, pro) => acc + pro.tat, 0);

            setAvgTAT(totalTAT/procs.length);
            setAvgWt(totalWt/procs.length);
        }
    }, []);

    return (
        <>
            <div className="border-2 border-white bg-gray-900 rounded-lg shadow-lg p-4 w-full max-w-4xl mx-auto mt-8">
    <h1 className="text-white text-2xl font-semibold text-center mb-4">Gantt Chart</h1>
    <div className="border-2 border-white flex justify-center items-center w-full h-auto px-3 py-3 overflow-x-auto space-x-2">
        {process.map((proc, idx) => (
            <div
                key={idx}
                className="border-2 border-black bg-blue-500 text-center text-white rounded-xl shadow-lg flex flex-col justify-between h-full"
                style={{ width: `${proc.burst * 50}px` }}
            >
                <p className="font-semibold text-lg">{proc.pid}</p>
                <div className="flex justify-between px-1 py-1 bg-gray-800 text-white border-t-2 border-gray-600 rounded-md">
                    <span className="text-sm">{idx === 0 ? proc.arrival : process[idx - 1].completion}</span>
                    <span className="text-sm">{proc.completion}</span>
                </div>
            </div>
        ))}
    </div>
    <div className="mt-6 text-center text-white">
        <h2 className="text-xl font-semibold">Average Wait Time: <span className="text-blue-400">{avgWt.toFixed(2)} ms</span></h2>
        <h2 className="text-xl font-semibold mt-2">Average Turn Around Time: <span className="text-green-400">{avgTAT.toFixed(2)} ms</span></h2>
    </div>
</div>

        </>
    );
}

export default GanttChart;
