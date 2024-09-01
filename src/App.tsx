
import './App.css'
import InputBox from './components/InputBox'
import SelectAlgo from './components/SelectAlgo'

function App() {

  return (
    
    <div  className='w-full h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300'>
      
      <div className="flex-1 w-full h-full p-4 ">
        <InputBox />
        <SelectAlgo />
      </div>

    </div>
  )
}

export default App
