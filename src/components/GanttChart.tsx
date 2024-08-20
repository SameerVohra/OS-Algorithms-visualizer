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

    useEffect(() => {
        const storedProcesses = localStorage.getItem("proc");
        if (storedProcesses) {
            const procs: Proc[] = JSON.parse(storedProcesses);
            setProcess(procs);
            console.log(procs);
        }
    }, []);

    return (
        <>
            <div className="border-2 border-white flex justify-center items-center w-full h-fit px-5 py-2">
                {process.map((proc, idx) => (
                    <div
                        key={idx}
                        className="border-2 border-black bg-blue-500 flex flex-col justify-between h-full"
                        style={{ width: `${proc.burst * 50}px` }}
                    >
                        <p>{proc.pid}</p>
                        <div className="flex justify-between px-1 bg-gray-800 text-white border-2 border-white">
                            <span>{idx === 0 ? proc.arrival : process[idx - 1].completion}</span>
                            <span>{proc.completion}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default GanttChart;
