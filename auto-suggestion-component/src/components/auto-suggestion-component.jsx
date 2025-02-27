import { useCallback, useEffect, useState } from "react";

const AutoSuggestionComponent = () => {
    const [data , setData] = useState([]);
    const [searchTxt , setSearchTxt] = useState("");
    const [showRes , setShowRes] = useState(false);
    const [cachedRes , setCachedRes] = useState({});
    const [highlightedIndex ,setHighlightedIndex] = useState(-1)
    const fetchData = async () => {
    try{
        // If the Keyword Exists in Cached Results
        if (cachedRes[searchTxt]) {
            const data = cachedRes[searchTxt];
            setData(data);
            return;
          }
            const res = await fetch(`https://dummyjson.com/recipes/search?q=${searchTxt}`);
            const jsonData  = await res.json();
            setData(jsonData?.recipes);
            setCachedRes((prev) => {
                return {...prev , [searchTxt] : jsonData?.recipes}
            })
        }catch(e){
            console.log(e);
        }
    }
   
    const memoizedCB = useCallback(fetchData , [searchTxt])
    
    // Handling Key Down Events 
    const handleKeyDown = (e) => {
        if (e.key === "ArrowUp") {
            setHighlightedIndex((prev) => Math.max(prev - 1, 0));
          } else if (e.key === "ArrowDown") {
            setHighlightedIndex((prev) => Math.min(prev + 1, data.length - 1));
          } else if (e.key === "Enter") {
            if (highlightedIndex >= 0) {
              const name = data[highlightedIndex].name;
              if (name) {
                setSearchTxt(name);
              } else {
                return;
              }
            }
          }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown" , handleKeyDown)
    } , [data , highlightedIndex])

    useEffect(() => {
        const timer =setTimeout(memoizedCB , 300);
        return () => {
            clearTimeout(timer)
        }
    } , [memoizedCB])

    return (
        <div className="auto-suggestion-component">
            <input type="text"  
                className="search-input" 
                placeholder="Enter Your Recipe" 
                value={searchTxt}
                onChange={(e) => setSearchTxt(e.target.value)} 
                onFocus={() => setShowRes(true)} 
                onBlur={() => setShowRes(false)}
            />
            {showRes && <div className="results-container"> 
            { data.length > 0  ? (
                data.map((recipe , index) => (
                    <div className={`recipe-item ${highlightedIndex == index ? "highlight" : ""}`} key={recipe.id} aria-selected={highlightedIndex === index}>{recipe.name}</div>
                ))) : <p>No Results Found</p>
            }
            </div>
        }
        </div>
    )
}

export default AutoSuggestionComponent
