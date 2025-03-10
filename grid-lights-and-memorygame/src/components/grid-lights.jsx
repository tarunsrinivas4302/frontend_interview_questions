import React, {  useState } from "react";

const GridLights = ({data}) => {
  
  const [selectedCells , setSelectedCell] = useState([]);
  const [isDeactivating , setIsDeactivating] = useState(false);
  
  const rowLength = data.length;
  const colLength = data[0].length;
  const flattenedData = data.flat(rowLength);
  const totalgridDatalength = flattenedData.filter(Boolean).length;


  const handleClick = (index) => {
    if(isSelected(index)) return;
    const activatedCells = [...selectedCells , index];
    setSelectedCell(activatedCells);
    if(totalgridDatalength === activatedCells.length){
      deactivateCells();
    }
  };

  const isSelected = (index) =>  selectedCells.includes(index);

  const deactivateCells = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setSelectedCell((prev) => {
        const alreadyActivatedCells = prev.slice();
        alreadyActivatedCells.pop();
        if (alreadyActivatedCells.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }
        return alreadyActivatedCells;
      });
    }, 300);
  };
  
  return (
    <div className="grid-lights-container" style={{
      "--rowsize" : rowLength,
      "--colsize" : colLength
    }}>
      {data
        .flat(rowLength)
        .map((row, index) =>
          row ? (
            <button
              key={index}
              className={`grid-lights-cell ${isSelected(index) ? "activated" :  ""}` }
              onClick={() => handleClick(index)}
              disabled= {isDeactivating || isSelected(index)}
            ></button>
          ) : (
            <span key={index}></span>
          )
        )}
    </div>
  );
};

export default GridLights;
