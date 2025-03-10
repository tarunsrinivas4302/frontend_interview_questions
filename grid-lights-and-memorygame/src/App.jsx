
import { useState } from 'react'
import './App.css'
import MemoryGame from './components/memory-game';
import GridLights from './components/grid-lights';
function App() {

  const [showGame , setShowGame] = useState(true);

  const gridData = [
    [1, 1, 1 ],
    [1, 0, 1],
    [1, 1, 1],
    ];


  return (
    <>
      <button type='button' onClick={() => setShowGame(false)}>Show Grid Lights</button>   
      <button type='button' onClick={() => setShowGame(true)}>Show Memory Game</button>   
      {
        showGame ? <MemoryGame /> : <GridLights data={gridData}/>
      }
    
    
    </>
  )
}

export default App
