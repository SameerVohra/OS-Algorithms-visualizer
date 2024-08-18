const SelectAlgo: React.FC = () => {
    return(
        <>
        <h1>Select the algorithm</h1>
        <select className="text-black rounded-lg p-2 w-fit">
        <option>FCFS</option>
        <option>SJF</option>
        <option>SRJF</option>
        <option>RR</option>
        </select>
        </>
    );
}

export default SelectAlgo;