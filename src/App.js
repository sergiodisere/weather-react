import React, {useState} from 'react'
const api = {
  key: "6a43b73c4c25446ef47fb972a70cde85",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const handleSearch = (event) => {
    if(event.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&lang=es&units=metric&APPID=${api.key}`)
        .then(
          res=> res.json()
        ).then(result => {
          console.log(result)
          setWeather(result)
          setQuery('')
        })
    }
  }

  const dateFormat = (d) => {
    let months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
    let days = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    
    <div className={weather && weather.main && weather.main.temp > 16 ? 'App warm' : 'App'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Buscar..."
            onChange={e=>setQuery(e.target.value)}
            value={query}
            onKeyPress={handleSearch}
          />
        </div>
        {weather.name &&
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateFormat(new Date())}</div>
          </div>

          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)} ºC</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        }

      <div className="footer">
        Creado por <a href="https://github.com/sergiodisere"> Sergio Díaz</a>
      </div>
    
      </main>
      
      
    </div>
  );
}

export default App;
