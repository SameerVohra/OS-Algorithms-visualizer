interface Proc {
    pid: string;
    burst: number;
    arrival: number;
    completion?: number;
    tat?: number;
    wt?: number;
    remainingBurst?: number;
}

interface RrArr {
    time: number;
    pid: string;
}

export const RR = (quantTime: number) => {
    if (isNaN(quantTime) || quantTime <= 0) return;

    const processes = localStorage.getItem("proc");

    if (processes) {
        const process: Proc[] = JSON.parse(processes);

        process.forEach(p => p.remainingBurst = p.burst);

        const procQueue: Proc[] = [...process];
        let numTasks: number = 0;
        let time: number = 0;

        procQueue.sort((a, b) => a.arrival - b.arrival);

        while (numTasks < process.length) {
            const arrivedProcesses = procQueue.filter(p => p.arrival <= time);
            if (arrivedProcesses.length > 0) {
                // Sort only the processes that are currently in the queue
                arrivedProcesses.sort((a, b) => (a.remainingBurst || 0) - (b.remainingBurst || 0));

                const currentProcess = arrivedProcesses[0];
                const currIdx = procQueue.indexOf(currentProcess);

                const timeSlice = Math.min(quantTime, procQueue[currIdx].remainingBurst || 0);
                procQueue[currIdx].remainingBurst! -= timeSlice;
                time += timeSlice;

                if (procQueue[currIdx].remainingBurst! <= 0) {
                    procQueue[currIdx].completion = time;
                    procQueue[currIdx].tat = procQueue[currIdx].completion - procQueue[currIdx].arrival;
                    const orgBurst = process.find(p => p.pid === procQueue[currIdx].pid)?.burst || 0;
                    procQueue[currIdx].wt = procQueue[currIdx].tat - orgBurst;
                    numTasks += 1;
                }
            } else {
                // No process has arrived, move time forward to the arrival of the next process
                const nextProcessArrival = procQueue.find(p => p.arrival > time)?.arrival || time;
                time = nextProcessArrival;
            }
        }

        console.log(process);
    }
    console.log(quantTime);
    console.log("Round Robin");
}
