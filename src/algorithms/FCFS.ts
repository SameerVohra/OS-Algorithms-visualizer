export const FCFS = () => {
    const processes = localStorage.getItem("proc");
    if(processes){
        const proc = JSON.parse(processes);
        console.log(typeof proc);
        console.log(proc)
        proc.sort((a:any, b:any)=> a.arrival-b.arrival);
        console.log(proc)
    }
    console.log("Running FCFS");
}