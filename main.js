const cityInputForm = document.querySelector('#input-form')
const cityInputField = document.querySelector('#input-field')


function titleCase(astring) {
    let output = ''
    const wordsArray = astring.split(' ')
    for (const word of wordsArray) {
      output += word[0].toUpperCase() + word.substring(1) + ' '
    }
    return output.trim()
  }

cityInputForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const selectedCity = formatInput()
    const coordinates = await getCoordinates(selectedCity)
    const weather = await getWeatherData(coordinates.lat, coordinates.lon)
    console.log(weather)
    addToPage(weather, selectedCity)
})

function formatInput(){ 
    return cityInputField.value
}

async function getCoordinates(selectedCity){
    console.log(selectedCity)
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${selectedCity},3166&limit=5&appid=${apiKey}`,{
        method: "GET",
    })
    if (res.ok){
        const data = await res.json()
        return{
            lat: data[0].lat,
            lon: data[0].lon
        }
    } else window.alert('Bad Request')
}


async function getWeatherData(lat, lon){
    console.log(lat, lon)
    // console.log(`https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=1643803200&appid=${apiKey}`)
    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`,{
    method: "GET",
    })
    if(res.ok){
        const data = await res.json() 
        // console.log(data.current.weather[0].description)
        return{
            humidity: data.current.humidity,
            tempreture: data.current.temp,
            feelsLike: data.current.feels_like,
            UVIndex: data.current.uvi,
            forecast: data.current.weather[0].description
        }
    } else window.alert('Bad Request')
}

function addToPage(weather, selectedCity){
    const city = document.querySelector('#city')
    city.innerText = titleCase(selectedCity) + ':'
    const temp = document.querySelector('#temp-num')
    temp.innerText = weather.tempreture + 'º'
    const forecast = document.querySelector('#forcast-n')
    forecast.innerText = weather.forecast
    const humidity = document.querySelector('#humid-num')
    humidity.innerText = weather.humidity
    const uVI = document.querySelector('#uv')
    uVI.innerText = weather.UVIndex
}