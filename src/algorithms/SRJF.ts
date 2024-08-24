interface Process {
    pid: string;
    burst: number;
    arrival: number;
    completion?: number;
    tat?: number;
    wt?: number;
    remainingBurst?: number;
}

interface srjfArr {
    time: number;
    pid: string;
}

export const SRJF = () => {
    const processes = localStorage.getItem("proc");
    if (processes) {
        let proc: Process[] = JSON.parse(processes);
        let srjfArr: srjfArr[] = [];

        proc.forEach(p => p.remainingBurst = p.burst);

        const procQueue: Process[] = [...proc];
        let time = 0;
        let numTasks = 0;

        procQueue.sort((a, b) => a.arrival - b.arrival);

        while (numTasks < proc.length) {
            const arrivedProcesses = procQueue.filter(p => p.arrival <= time && p.remainingBurst && p.remainingBurst > 0);
            if (arrivedProcesses.length > 0) {
                arrivedProcesses.sort((a, b) => (a.remainingBurst || 0) - (b.remainingBurst || 0));

                const currentProcess = arrivedProcesses[0];
                const currentIdx = procQueue.indexOf(currentProcess);

                procQueue[currentIdx].remainingBurst! -= 1;
                time += 1;

                const tmpArr = { pid: procQueue[currentIdx].pid, time };
                srjfArr.push(tmpArr);

                if (procQueue[currentIdx].remainingBurst === 0) {
                    procQueue[currentIdx].completion = time;
                    procQueue[currentIdx].tat = procQueue[currentIdx].completion - procQueue[currentIdx].arrival;
                    const originalBurst = proc.find(p => p.pid === procQueue[currentIdx].pid)?.burst || 0;
                    procQueue[currentIdx].wt = procQueue[currentIdx].tat - originalBurst;
                    numTasks += 1;

                    const originalProcIdx = proc.findIndex(p => p.pid === procQueue[currentIdx].pid);
                    if (originalProcIdx !== -1) {
                        proc[originalProcIdx].completion = procQueue[currentIdx].completion;
                        proc[originalProcIdx].tat = procQueue[currentIdx].tat;
                        proc[originalProcIdx].wt = procQueue[currentIdx].wt;
                    }
                }
            } else {
                time += 1;
            }
        }

        localStorage.setItem("srjfArr", JSON.stringify(srjfArr));
        localStorage.setItem("proc", JSON.stringify(proc));

        console.log(proc);
    }
};
