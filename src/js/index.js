import "../css/styles.css"

const apiKeyWeather = "abdecbd2a4a4083f2619b71a19fec61f"
const apiKeyGIPHY = "5diNNEPaUWHtKMQoeSCyt5ykinbrsNjE"
const form = document.getElementById("form")
const weatherDiv = document.getElementById("weather")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const nameLocation = document.getElementById("nameLocation")

  if (nameLocation.value) {
    const codes = await getGeocoding(nameLocation.value)

    // check if the object(codes) is not empty
    if (Object.keys(codes).length > 0) {
      const { lat = "", lon = "" } = codes

      getWeather(lat, lon)
    }

    nameLocation.value = ""
  }
})

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyWeather}`
  )
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      const { weather, name } = response

      HTMLResponse(weatherDiv, name, weather[0].description)
    })
    .catch((error) => {
      console.error("Error: ", error)
    })
}

async function getGeocoding(location) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKeyWeather}`
  )
  const codes = await response.json()

  if (codes.length > 0) {
    return codes[0]
  }

  return {}
}

async function getGifWeather(query) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${query}&limit=1&api_key=${apiKeyGIPHY}`
  )
  const gifs = await response.json()
  const { data } = gifs

  if (data.length > 0) {
    const url = data[0].images.original.url
    return url
  }

  return ""
}

async function HTMLResponse(mainDiv, name, description) {
  const url = await getGifWeather(description)

  mainDiv.innerHTML = ""

  const divName = document.createElement("div")
  divName.classList.add("weather")

  const pName = document.createElement("p")
  pName.classList.add("title")
  pName.textContent = `${name}`
  divName.appendChild(pName)

  const div = document.createElement("div")
  div.classList.add("weather")

  const p = document.createElement("p")
  p.textContent = `${description}`

  const image = document.createElement("img")
  image.classList.add("gif")
  image.src = url

  div.appendChild(p)
  div.appendChild(image)

  mainDiv.appendChild(divName)
  mainDiv.appendChild(div)
}
