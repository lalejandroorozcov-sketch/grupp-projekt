import { useState, useEffect } from 'react';

function TimeWeather() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000)

        return () => clearInterval(timer);
    }, [])

    return (
        <div style={{
            border: '1px solid black',
            padding: '10px',
            borderRadius: '5px',
            display: 'inline-block',
            backgroundColor: 'lightblue',
            top: '10px',
            right: '10px',
            position: 'absolute'
        }}>
            {currentTime.toLocaleString('sv-SE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            })}
        </div>
    )
}

export default TimeWeather;