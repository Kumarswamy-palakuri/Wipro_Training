// Part 1: Fetch employee data and log it
fetch("https://dummy.restapiexample.com/api/v1/employees")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log("Employee Data:", data); // Logs the JSON object
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
