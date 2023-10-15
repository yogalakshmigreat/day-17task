<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Country Information</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-4">
        <div class="row" id="countryCards"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>


document.addEventListener("DOMContentLoaded", function() {
    const countryContainer = document.getElementById("countryCards");

    // Fetch data from Rest Countries API
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                // Create a Bootstrap card for each country
                const card = document.createElement("div");
                card.className = "col-md-4 mb-3";

                card.innerHTML = `
                    <div class="card">
                        <img src="${country.flags.png}" class="card-img-top" alt="${country.name.common}">
                        <div class="card-body">
                            <h5 class="card-title">${country.name.common}</h5>
                            <p class="card-text">Region: ${country.region}</p>
                            <p class="card-text">Capital: ${country.capital}</p>
                            <p class="card-text">Latlng: ${country.latlng.join(", ")}</p>
                            <p class="card-text">Country Codes: ${JSON.stringify(country.cca2)}</p>
                            <button data-country="${country.name.common}" class="btn btn-primary">Get Weather</button>
                        </div>
                    </div>
                `;

                // Add an event listener to fetch weather data on button click
                const getWeatherButton = card.querySelector("button");
                getWeatherButton.addEventListener("click", function() {
                    const countryName = this.getAttribute("data-country");
                    getWeatherData(countryName);
                });

                countryContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching data from Rest Countries API:", error));

    function getWeatherData(countryName) {
        // Fetch data from OpenWeatherMap API
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=YOUR_API_KEY`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Display weather information as needed
            })
            .catch(error => console.error("Error fetching weather data:", error));
    }
});
