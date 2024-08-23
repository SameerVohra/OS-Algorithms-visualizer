export const SJF = () => {
    console.log("Running SJF");

    const processes = localStorage.getItem("proc");

    if (processes) {
        const proc: { pid: string; burst: number; arrival: number; completion?: number; tat?: number; wt?: number }[] = JSON.parse(processes);

        console.log("Original Processes:", proc);

        proc.sort((a, b) => a.arrival - b.arrival);

        console.log("Sorted Processes:", proc);

        let currentTime = 0;
        let processQueue: { pid: string; burst: number; arrival: number; completion?: number; tat?: number; wt?: number }[] = [];
        let index = 0;

        while (index < proc.length || processQueue.length > 0) {
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

            processQueue.sort((a, b) => a.arrival - b.arrival);

            const currentProcess = processQueue.shift()!;
            currentProcess.completion = currentTime + currentProcess.burst;
            currentProcess.tat = currentProcess.completion - currentProcess.arrival;
            currentProcess.wt = currentProcess.tat - currentProcess.burst;

            currentTime += currentProcess.burst;
        }

        console.log("Processes after SJF calculations:", proc);

        localStorage.setItem("proc", JSON.stringify(proc));
    }
};
