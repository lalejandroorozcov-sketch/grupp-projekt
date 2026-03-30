import { useState, useEffect } from 'react';

function TimeWeather() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [weather, setWeather] = useState(null)

    const getWeatherIcon = (code) => {
    const weatherIcons = {
        1: '☀️',    // Klart
        2: '🌤️',    // Lätt molnighet  
        3: '⛅',    // Halvklart
        4: '☁️',    // Molnigt
        5: '🌦️',    // Mycket molnigt
        6: '☁️',    // Mulet
        7: '🌫️',    // Dimma
        8: '🌦️',    // Lätt regnskur
        9: '🌧️',    // Måttlig regnskur
        10: '🌧️',   // Kraftig regnskur
        11: '⛈️',   // Åska
        12: '🌨️',   // Lätt snöblandat regn
        13: '🌨️',   // Måttligt snöblandat regn
        14: '❄️',   // Kraftigt snöblandat regn
        15: '🌨️',   // Lätt snöfall
        16: '❄️',   // Måttligt snöfall
        17: '❄️',   // Kraftigt snöfall
        18: '🌧️',   // Regn
        19: '⛈️',   // Åska
        20: '🌨️',   // Lätt slask
        21: '❄️',   // Måttlig slask
        22: '❄️',   // Kraftig slask
        23: '🌨️',   // Lätt snö
        24: '❄️',   // Måttlig snö
        25: '❄️',   // Kraftig snö
        26: '⛈️',   // Åska
        27: '🌫️'    // Dimma
    };
    
    return weatherIcons[code] || '🌤️';
};

    const fetchWeather = async () => {
        try {
            const response = await fetch('https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/13.0007/lat/55.6059/data.json');
            const data = await response.json();
            console.log("Väderdata från SMHI:", data);
            setWeather(data);
        } catch (error) {
            console.log('Fel vid hämtning av väder:', error)
        }
    }

    useEffect(() => {
        fetchWeather();
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000)

        return () => clearInterval(timer);
    }, [])

    return (
        <div className='time-weather' style={{
          
        }}>
            {currentTime.toLocaleString('sv-SE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            })}
            {weather && (
                <div>
                    <br />
                    {/* {weather && - visar bara väder om data finns
                    weather.timeSeries[0] - första tidpunkten (nu)
                    .parameters.find(p => p.name === 't') - hittar temperatur-parametern
                    .values[0] - första värdet
                    Math.round() - avrundar till närmaste heltal
                    °C - lägger till grader Celsius */}
                    {getWeatherIcon(weather.timeSeries[0].parameters.find(p => p.name === 'Wsymb2')?.values[0])} 
                    {Math.round(weather.timeSeries[0].parameters.find(p => p.name === 't').values[0])}°C
                </div>
            )}
        </div>
    )
}

export default TimeWeather;