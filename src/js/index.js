import "../css/styles.css"

console.log("Weather App running!!!")

const lat = "53.3149033"
const lon = "-6.3143915"
const apiKey = "abdecbd2a4a4083f2619b71a19fec61f"

fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
)
  .then((response) => {
    return response.json()
  })
  .then((response) => {
    console.log("response: ", response)
  })
  .catch((error) => {
    console.log("Error: ", error)
  })
