import { useEffect, useState } from "react";

interface RrGantt {
    pid: string;
    start: number;
    end: number;
}

interface Proc {
    pid: string;
    burst: number;
    arrival: number;
    completion: number;
    tat: number;
    wt: number;
}

const RRGanttChart: React.FC = () => {
    const [rrGantt, setRrGantt] = useState<RrGantt[]>([]);
    const [avgWt, setAvgWt] = useState<number>(0);
    const [avgTAT, setAvgTAT] = useState<number>(0);

    useEffect(() => {
        const storedProcesses = localStorage.getItem("proc");
        const storedGantt = localStorage.getItem("rrGantt");
        if (storedProcesses && storedGantt) {
            const procs: Proc[] = JSON.parse(storedProcesses);
            const ganttData: RrGantt[] = JSON.parse(storedGantt);
            setRrGantt(ganttData);

            const totalWt: number = procs.reduce((acc, pro) => acc + pro.wt, 0);
            const totalTAT: number = procs.reduce((acc, pro) => acc + pro.tat, 0);

            setAvgTAT(totalTAT / procs.length);
            setAvgWt(totalWt / procs.length);
        }
    }, []);

    return (
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-6xl mt-8">
            <h1 className="text-white text-2xl font-semibold text-center mb-6">Round Robin Gantt Chart</h1>
            <div className="flex justify-center items-center w-full h-auto px-4 py-4 overflow-x-auto space-x-4">
                {rrGantt.map((proc, idx) => (
                    <div
                        key={idx}
                        className="bg-blue-600 text-center text-white rounded-lg shadow-md flex flex-col justify-between h-full min-w-[50px] p-2"
                        style={{ width: `${(proc.end - proc.start) * 70}px` }}
                    >
                        <p className="font-bold text-lg">{proc.pid}</p>
                        <div className="bg-gray-800 text-sm mt-2 p-1 rounded-md">
                            <span>{proc.start} - {proc.end} ms</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center text-white">
                <h2 className="text-xl font-semibold">Average Wait Time: <span className="text-blue-400">{avgWt.toFixed(2)} ms</span></h2>
                <h2 className="text-xl font-semibold mt-2">Average Turn Around Time: <span className="text-green-400">{avgTAT.toFixed(2)} ms</span></h2>
            </div>
        </div>
    );
};

export default RRGanttChart;
