import React, { useEffect, useRef, useState } from 'react'
import './Wheather.css'

const Wheather = () => {
    const inputRef = useRef()
    const [weatherdata, setWeatherData] = useState(false)
    
    const allicons = {
        "01d": "https://cdn-icons-png.flaticon.com/128/1163/1163661.png",
        "01n": "https://cdn-icons-png.flaticon.com/128/1163/1163661.png",
        "02d": "https://cdn-icons-png.flaticon.com/128/1163/1163661.png",
        "02n": "https://cdn-icons-png.flaticon.com/128/1163/1163661.png",
        "03d": "https://cdn-icons-png.flaticon.com/128/1163/1163661.png",
        "03n": "https://cdn-icons-png.flaticon.com/128/1163/1163661.png",
        "04d": "https://cdn-icons-png.flaticon.com/128/6423/6423015.png",
        "04n": "https://cdn-icons-png.flaticon.com/128/6423/6423015.png",
        "09d": "https://cdn-icons-png.flaticon.com/128/4088/4088981.png",
        "09n": "https://cdn-icons-png.flaticon.com/128/4088/4088981.png",
        "10d": "https://cdn-icons-png.flaticon.com/128/4088/4088981.png",
        "10n": "https://cdn-icons-png.flaticon.com/128/4088/4088981.png",
        "13d": "https://cdn-icons-png.flaticon.com/128/2315/2315309.png",
        "13d": "https://cdn-icons-png.flaticon.com/128/2315/2315309.png",
    }

    const search = async (city) => {
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allicons[data.weather[0].icon] || "https://cdn-icons-png.flaticon.com/128/1163/1163661.png";
            setWeatherData({
              humidity: data.main.humidity,
              windSpeed: data.wind.speed,
              temp: Math.floor(data.main.temp),
              location: data.name,
              icon: icon,
            })

        } catch (error) {
            setWeatherData(false);
            console.error("Error Fetching Data")
        }
    }

    useEffect(() => {
        search("Indore")
    }, []); 

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            search(inputRef.current.value);
        }
    };

  return (
    <div className='wheather'>
        <div className='search-bar'>
            <input ref={inputRef} type="text" placeholder='Search'  onKeyDown={handleKeyDown}/>
            <img src="https://cdn-icons-png.flaticon.com/128/751/751463.png" alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherdata?<>
            <img src={weatherdata.icon} alt="" className='wheather-icon'/>
        <p className='temp'>{weatherdata.temp}*C</p>
        <p className='city'>{weatherdata.location}</p>
        <div className='weather-data'>
            <div className='col'>
                  <img src="https://cdn-icons-png.flaticon.com/128/6142/6142706.png" alt="" />
                  <div>
                    <p>{weatherdata.humidity}%</p>
                    <span>Humidity</span>
                  </div>
            </div>
            <div className='col'>
                  <img src="https://cdn-icons-png.flaticon.com/128/11214/11214591.png" alt="" />
                  <div>
                    <p>{weatherdata.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                  </div>
            </div>
            
        </div>
   
        </>:<></>}
        </div>
  )
}

export default Wheather