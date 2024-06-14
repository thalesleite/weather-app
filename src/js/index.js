import "../css/styles.css"

console.log("Weather App running!!!")

const apiKey = "abdecbd2a4a4083f2619b71a19fec61f"

const codes = await getGeocoding()

const { lat, lon } = codes

fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
)
  .then((response) => {
    return response.json()
  })
  .then((response) => {
    const { weather } = response
    console.log("weather: ", weather)
  })
  .catch((error) => {
    console.log("Error: ", error)
  })

async function getGeocoding() {
  const name = "Dublin"
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${apiKey}`
  )
  const codes = await response.json()
  return codes[0]
}
