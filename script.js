const apiKey = 'c1dd64edd9d3de69dbea6a2cf784953d'; 
const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const unitSelect = document.getElementById('unitSelect');
const weatherInfo = document.getElementById('weatherInfo');

weatherForm.addEventListener('submit', function (event) {
  event.preventDefault();
  try {
    getWeather();
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
});

async function getWeather() {
  const location = locationInput.value;
  const unit = unitSelect.value;

  try {
    const weatherData = await fetchWeatherData(location, unit);
    displayWeatherInfo(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherInfo.textContent = 'An error occurred. Please try again.';
  }
}

async function fetchWeatherData(location, unit) {
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${unit}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message || 'Failed to fetch weather data');
  }

  return data;
}

function displayWeatherInfo(data) {
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const city = data.name;

  weatherInfo.innerHTML = `
    <h2>${city}</h2>
    <p>Temperature: ${temperature}°</p>
    <p>Description: ${description}</p>
  `;
}


