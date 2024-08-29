interface Process {
    pid: number;
    arrival: number;
    burst: number;
    remainingBurst: number;
    completion?: number;
    tat?: number;
    wt?: number;
}

interface Gantt {
    pid: string;
    start: number;
    end: number;
}

export const RR = (quant: number | undefined) => {
    if (quant !== undefined) {
        const process = localStorage.getItem("proc");
        if (process) {
            const processes: Process[] = JSON.parse(process);
            let sum = 0;
            let count = 0;
            let completedProcesses = 0;
            let tat = 0;
            let wt = 0;
            const n = processes.length;
            const ganttChart: Gantt[] = [];

            const temp: number[] = processes.map(p => p.burst);

            while (completedProcesses < n) {
                for (let i = 0; i < n; i++) {
                    if (temp[i] > 0) {
                        const start = sum;

                        if (temp[i] <= quant) {
                            sum += temp[i];
                            temp[i] = 0;
                            count = 1;
                        } else {
                            temp[i] -= quant;
                            sum += quant;
                        }

                        const end = sum;
                        ganttChart.push({ pid: `${processes[i].pid}`, start, end });

                        if (temp[i] === 0 && count === 1) {
                            completedProcesses++;
                            processes[i].completion = sum;
                            processes[i].tat = sum - processes[i].arrival;
                            processes[i].wt = (processes[i].tat ?? 0) - (processes[i].burst ?? 0);
                            wt += processes[i].wt ?? 0;
                            tat += processes[i].tat ?? 0;
                            count = 0;
                        }
                    }
                }
            }

            localStorage.setItem("proc", JSON.stringify(processes));
            localStorage.setItem("rrGantt", JSON.stringify(ganttChart));
            
            console.log("Gantt Chart:", ganttChart);
        }
    }
};
