const apiKey = "1eb1a2a21b622e977cc6cf9d92b87109";
const weatherDiv = document.getElementById("weatherResult");
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const themeToggle = document.getElementById("themeToggle");

// Search on button click or enter key
searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather();
});

// Toggle dark mode
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", themeToggle.checked);
});

function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then((data) => {
      const { name, main, weather } = data;
      const weatherType = weather[0].main;
      const emoji = getWeatherEmoji(weatherType);

      weatherDiv.innerHTML = `
        <div>
          <div style="font-size: 3rem;">${emoji}</div>
          <h2>${name}</h2>
          <p>${main.temp}°C</p>
          <p>${weather[0].description}</p>
        </div>
      `;
    })
    .catch(() => {
      weatherDiv.innerHTML = `<p>City not found. Try again.</p>`;
    });
}

function getWeatherEmoji(type) {
  switch (type.toLowerCase()) {
    case "clear": return "☀️";
    case "clouds": return "☁️";
    case "rain": return "🌧️";
    case "snow": return "❄️";
    case "thunderstorm": return "⛈️";
    case "drizzle": return "🌦️";
    case "mist":
    case "haze":
    case "fog": return "🌫️";
    default: return "🌈";
  }
}
