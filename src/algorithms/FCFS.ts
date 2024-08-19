export const FCFS = () => {
    const processes = localStorage.getItem("proc");
    if(processes){
        const proc: { pid: string; burst: number; arrival: number; completion?: number; tat?: number; wt?: number }[] = JSON.parse(processes);
        console.log(typeof proc);
        console.log(proc)
        proc.sort((a:any, b:any)=> a.arrival-b.arrival);
        console.log(proc)

         let ct: number = 0;

         proc.map((p)=>{
            const st : number = Math.max(ct, p.arrival);
            const compTime : number = p.burst+st;
            ct = compTime;
            console.log(`CT: ${compTime}`)
            p.completion = ct;
            p.tat = ct-p.arrival;
            p.wt = p.tat-p.burst;
         })

         localStorage.setItem("proc", JSON.stringify(proc))
    }
    console.log("Running FCFS");
}