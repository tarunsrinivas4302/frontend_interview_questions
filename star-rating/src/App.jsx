import { useState } from 'react'
import './App.css'
import StarRatingComponent from './components/star-rating-component';
function App() {
  // eslint-disable-next-line no-unused-vars
  const [starLength, setStarLength] = useState(5);
  return (
    <div>
      <StarRatingComponent length={starLength} color="gold" />
    </div>
  )
}

export default App
