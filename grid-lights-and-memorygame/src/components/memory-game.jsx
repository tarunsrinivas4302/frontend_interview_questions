import React, { useEffect, useState } from "react";

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [flipped ,setFlipped] = useState([]);
  const [solved , setSolved] =useState([]);
  const [isDisabled , setDisabled] = useState(false);
  const [won ,setWon] = useState(false);
  const [lost , setLost] = useState(false)
  const [totalMoves , setTotalMoves ] = useState(10);
  const [remainingMoves , setRemainingMoves] = useState(0);
  
  const handleGridSizeChange = (e) => {
    const val = parseInt(e.target.value);
    if (val >= 2 && val <= 10) setGridSize(val);
  };

  const handleClick = (item) => {
    setRemainingMoves(prev => prev+ 1)
    const {id} = item;
    if(isDisabled || won || lost) return;

    if(flipped.length === 0){
      setFlipped([id]);
      return;
    }
    if(flipped.length === 1){
      if(id !== flipped[0]){
        setDisabled(true);
        setFlipped([...flipped , id]);
        checkMatch(id);
      }else{
        setFlipped([]);
        setDisabled(false);
      }
    }
     
  }
  
  const checkMatch = (secondId) =>{ 
    const [firstId]  = flipped;
    if(cards[firstId].number === cards[secondId].number){
      setFlipped([])
      setSolved([...solved , firstId , secondId])
      setDisabled(false);
    }else{
      setTimeout(() => {
          setFlipped([]);
          setDisabled(false)
      }, 900);
    }
  
  }

  useEffect(() => {
    if(cards.length >  0 && solved.length === cards.length){
      setWon(true);
    }
  } , [cards ,solved])


  useEffect(() => {
    if (totalMoves === remainingMoves) {
      setLost(true);
      setDisabled(true);
    }
  }, [remainingMoves]);


  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);

    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({
        id: index,
        number,
      }));
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setDisabled(false)
    setWon(false)
    setRemainingMoves(0);
    setTotalMoves(10)
    setLost(false)
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  const isFlipped = (id) => flipped.includes(id);
  const isSolved = (id) => solved.includes(id)
  return (
    <>
      <div className="inputs">
        <label htmlFor="">Gird Size (max : 10) </label>
        <input
          type="number"
          min={2}
          max={10}
          className="size-input"
          value={gridSize}
          onChange={handleGridSizeChange}
        />

        <button type="button" onClick={initializeGame} className="reset">Reset Game</button>
        <div className="moves">
          <label>Moves :: </label>
          <input type="number" max="150" min="4" value={totalMoves}  onChange={(e) => setTotalMoves(e.target.value)} />
          <p>Total Moves {remainingMoves} / {totalMoves}</p>
        </div>
     
      </div>
      <div
        className="game-grid"
        style={{ gridTemplateColumns: `repeat(${gridSize} , 1fr)` }}
      >
        {cards.map((item, index) => (
          <button 
            className={`${isFlipped(item.id) ? "flipped" : (isSolved(item.id) ? "solved" :'')}  game-cell`} 
            key={index}
            onClick={() => handleClick(item)}
            disabled={isDisabled || won || lost}
          >
            {isFlipped(item.id) ?  item.number : (isSolved(item.id) ? item.number : "?") }
          </button>
        ))}


      </div>

      {won && <h2 className="won">You Won</h2>}
      {lost && <h2 className="lost">You Lost</h2>}
    </>
  );
};

export default MemoryGame;
