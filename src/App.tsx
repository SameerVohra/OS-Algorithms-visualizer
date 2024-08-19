
import './App.css'
import InputBox from './components/InputBox'
import SelectAlgo from './components/SelectAlgo'

function App() {

  return (
    <>
     <div className='min-h-screen bg-gray-800 flex items-center justify-center flex-col w-auto px-5 py-5 gap-2'>
      { /*TODO: First make an input box,
      take input and store in a temp storage of array
      Run multiple algorithms on it and the input should not change until the user does so
      Make a gantt chart too for the processes */}

      <InputBox/>
      <SelectAlgo/>

       </div>
    </>
  )
}

export default App
