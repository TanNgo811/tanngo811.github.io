async function fetchData() {
    console.log("Start");
    const response2 = await Promise.resolve().then(() => {
        console.log("Inside Promise");
        // Simulating an asynchronous operation
        // In a real-world scenario, this could be an API call
        
        return fetch('https://jsonplaceholder.typicode.com/posts/2');
    });
    console.log("Start 2");
    const data2 = await response2.json();
    console.log("Start 3");
    console.log("Data 2:", data2);    
    console.log("Start 4");
    const response = await Promise.resolve().then(() => {
        console.log("Inside Promise");
        // Simulating an asynchronous operation
        // In a real-world scenario, this could be an API call
        
        return fetch('https://jsonplaceholder.typicode.com/posts/1');
    });
    console.log("Start 5");
    const data = await response.json();
    console.log("Start 6");
    console.log("Data:", data);    
}


fetchData();
console.log("This runs immediately");