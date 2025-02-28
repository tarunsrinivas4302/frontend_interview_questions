
import './App.css'
import ProgressBar from './components/progressbar'

function App() {
  const percentageArr = [10 , 5, 30 , 60 , 20 , 40 ,80 , 100]; 
      
    return <div>
      {
        percentageArr.map((item , index) => (
          <ProgressBar percentage={item} key={index} />
        ))
      }
    </div>
}

export default App
