interface Process {
    pid: string;
    burst: number;
    arrival: number;
    completion?: number;
    tat?: number;
    wt?: number;
}

export const SRJF = () => {
    console.log("Running SRJF");

    const processesJson = localStorage.getItem("proc");

    if (processesJson) {
        const proc: Process[] = JSON.parse(processesJson);

        const remainingBurst = new Map<string, number>();
        proc.forEach(p => remainingBurst.set(p.pid, p.burst));

        proc.sort((a, b) => a.arrival - b.arrival);

        let currentTime = 0;
        let processQueue: Process[] = [];
        let index = 0;
        let isCompleted = 0;

        while (isCompleted < proc.length) {
            while (index < proc.length && proc[index].arrival <= currentTime) {
                processQueue.push(proc[index]);
                index++;
            }

            if (processQueue.length === 0) {
                if (index < proc.length) {
                    currentTime = proc[index].arrival;
                    continue;
                }
            }

            processQueue.sort((a, b) => (remainingBurst.get(a.pid) || 0) - (remainingBurst.get(b.pid) || 0));

            const currentProcess = processQueue[0];
            currentTime++;
            const newBurst = (remainingBurst.get(currentProcess.pid) || 0) - 1;
            remainingBurst.set(currentProcess.pid, newBurst);

            if (newBurst === 0) {
                currentProcess.completion = currentTime;
                currentProcess.tat = currentProcess.completion - currentProcess.arrival;
                currentProcess.wt = currentProcess.tat - currentProcess.burst;
                processQueue.shift();
                isCompleted++;
            }
        }

        console.log("Processes after SRJF calculations:", proc);
        localStorage.setItem("proc", JSON.stringify(proc));
    }
};
