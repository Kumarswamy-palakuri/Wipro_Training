// fetchEmployees.js

// URL of the JSON endpoint
const apiUrl = "https://jsonplaceholder.typicode.com/users";

// Fetch data from the API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
        throw new Error("Network response was not ok " + response.status);
    }
    return response.json(); // Convert response to JSON
  })
  .then(data => {
    console.log("User Data:", data); // Display data in the console
  })
  .catch(error => {
    console.error("Error fetching data:", error); // Handle any errors
  });
