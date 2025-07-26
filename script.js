//const apiKey = "1eb1a2a21b622e977cc6cf9d92b87109"; // ✅ Your real API key
const weatherDiv = document.getElementById("weather");
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const apiKey = "1eb1a2a21b622e977cc6cf9d92b87109";



// 🔍 Search on button click or enter
searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather();
});

function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log("Fetching weather for:", city);

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) throw new Error("Invalid API key 🔑");
        else if (res.status === 404) throw new Error("City not found 🌍");
        else throw new Error("Something went wrong ❌");
      }
      return res.json();
    })
    .then((data) => {
      console.log("API Response:", data);
      const { name, main, weather } = data;
      const weatherType = weather[0].main;
      updateBackground(weatherType);

      weatherDiv.innerHTML = `
        <h2>${name}</h2>
        <p>${weather[0].description}</p>
        <p>Temperature: ${main.temp} °C</p>
        <p>Humidity: ${main.humidity}%</p>
      `;
    })
    .catch((err) => {
      console.error(err.message);
      weatherDiv.innerHTML = `<p>${err.message}</p>`;
      document.body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
    });
}

// 🌤 Background transitions for different weather
function updateBackground(type) {
  type = type.toLowerCase();
  console.log("Weather Type:", type);
  switch (type) {
    case "clear":
      document.body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
      break;
    case "clouds":
      document.body.style.background = "linear-gradient(to right, #d7d2cc, #304352)";
      break;
    case "rain":
      document.body.style.background = "linear-gradient(to right, #4e54c8, #8f94fb)";
      break;
    case "snow":
      document.body.style.background = "linear-gradient(to right, #e6dada, #274046)";
      break;
    case "thunderstorm":
      document.body.style.background = "linear-gradient(to right, #141e30, #243b55)";
      break;
    default:
      document.body.style.background = "linear-gradient(to right, #a1c4fd, #c2e9fb)";
  }
}
