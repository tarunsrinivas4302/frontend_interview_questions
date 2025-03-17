async function retryAPI (apiFn , limit = 1) {
    try{
        const result = await apiFn();
        return result;
    }catch(e){
        if(limit <= 0){
            console.log("Max Limit Reached For API CALL")
            return;
        }
        console.log(`API FAILED SO RETRYING , REMAINING ATTEMPTS :: [${limit}]`)
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
        return retryAPI(apiFn, limit - 1);    
    }
}

async function fetchData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = await response.json();
    console.log(data);
}



console.log(retryAPI(fetchData , 3))