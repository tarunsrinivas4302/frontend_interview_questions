
import './App.css'
import {ConfigDrivenForm} from './components/config-driven-form'
import data from './data/data.json'
function App() {
  return <div>
    <h1>Config Driven Forms</h1>
    {/* Add Your Form Components */}

    <ConfigDrivenForm configData={data}/>

  </div>
}

export default App
