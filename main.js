const inputBox = document.querySelector('#input');
const submit = document.querySelector('.searchIcon');

// texts
const myLocation = document.querySelector('.cityNow');
const degrees = document.querySelector('.degreesNow');
const myHumidity = document.querySelector('.humidityNow');
const windSpeed = document.querySelector('.windSpeedNow');
const weatherType = document.querySelector('.weatherType');

//images
const weatherIcon = document.querySelector('.weatherIcon');

//blocks
const noError = document.querySelector('.noerror');
const ifError = document.querySelector('.error');

fetchingData = async (city = "Kolkata") => {
    const API_KEY = "adc5c50c3d6426a544f681045f75eb82";
    const fetchedData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
        .then(response => response.json()) // Return the parsed JSON data
        .catch(error => console.log(error));

    console.log(fetchedData);

    if (fetchedData.cod === "404") {
        noError.style.display = "none";
        ifError.style.display = "block";
    }

    else {
        noError.style.display = "";
        ifError.style.display = "";
    }
    const kelvin = fetchedData.main.temp;
    let celcius = Math.round(kelvin - 273.15);

    degrees.innerHTML = `${celcius}&deg C`;
    myLocation.innerHTML = `<strong>${fetchedData.name}</strong>`;

    const wind = Math.round((3.6) * (fetchedData.wind.speed));

    windSpeed.innerHTML = `${wind} kmph`;
    myHumidity.innerHTML = `${fetchedData.main.humidity} %`;


    const choice = fetchedData.weather[0].main;
    weatherType.innerHTML = `${choice}`;

    switch (choice) {
        case "Clouds":
            weatherIcon.src = "img/cloudy.png";
            break;
        case "Clear":
            weatherIcon.src = "img/clear.png";
            break;
        case "Drizzle":
        case "Rain":
            weatherIcon.src = "img/rain.png";
            break;
        case "Mist":
        case "Fog":
        case "Haze":
            weatherIcon.src = "img/mist.png";
            break;
        case "Snow":
            weatherIcon.src = "img/snow.png";
            break;
        default:
            weatherIcon.src = "img/question.png";
            break;
    }
}

submit.addEventListener('click', (event) => {
    // prevents default behaviour of submit by which it reloads the page
    event.preventDefault();
    let city = inputBox.value;
    fetchingData(city);
})



