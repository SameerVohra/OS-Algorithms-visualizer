import { useEffect, useState } from "react";

interface Proc{
    pid: string;
    burst: number;
    arrival: number;
    completition: number;
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
        }
    }, []);
    return(
        <>
        Gantt Chart
        <div className="border-2 border-red-500 flex justify-center items-center w-full">
            
        </div>
        </>
    )
}

export default GanttChart;