// Function to delete existing rows from the results
function deleteRow(){
    var tbody = d3.select("tbody");
    tbody.selectAll("*").remove();
}

// Function to get prediction
function handleSubmit() {

    // Select the input element and get the raw HTML node
    var inputManuElement = d3.select("#manufacturer");
    var inputAgeElement = d3.select("#age");
    var inputMileElement = d3.select("#mileage");

    // Get the value property of the input element
    var inputManuValue = inputManuElement.property("value");
    var inputAgeValue = inputAgeElement.property("value");
    var inputMileValue = inputMileElement.property("value");
    var prediction = 0;

    let _data = {
        age: inputAgeValue,
        mileage: inputMileValue
      };
        
    // Get the prediction
    var predictionUrl = "http://127.0.0.1:9999/api";
    console.log(predictionUrl);

    fetch(predictionUrl, {
        method: "POST",
        body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(response => {
        return response.json();
    }).then(prediction => {
        console.log(prediction);

        // Create an variable with the original input values and the predicted value
        var car_prediction = [{
            manufacturer: inputManuValue,
            age: inputAgeValue,
            state: inputMileValue,
            price: prediction,
        },
        ];

        // Get the number of rows in the table.  If more than one row for the header, then call the delete row function
        var x = document.getElementById("car-table").rows.length;
        if (x > 1){ 
        deleteRow();
        }

        car_prediction.forEach((carEntry) => {
            var tbody = d3.select("tbody");
            var row = tbody.append("tr");
            Object.entries(carEntry).forEach(([key, value]) => {
            var cell = tbody.append("td");
            cell.text(value);
            });
        });
     });

}

d3.select("#filter-btn").on("click", handleSubmit);
