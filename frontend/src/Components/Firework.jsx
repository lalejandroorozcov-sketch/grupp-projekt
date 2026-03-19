import { useState, useEffect } from "react";

function Fireworks({ trigger }) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (trigger) {
            setVisible(true)
            const timer = setTimeout(() => {
                setVisible(false)
            }, 3000)
        }
    }, [trigger]);

    return (
        visible ? (
            <div style={{
                backgroundImage: "url('/Fireworks.gif')",
                backgroundColor: "black",
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                position: 'absolute',
                top: '25%',
                right: '40%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                pointerEvents: 'none',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <h3 style={{
                    color: 'white',
                    margin: 0,
                    textAlign: 'center',
                }}>Good Job!</h3>

            </div>
        ) : null

    )
}

export default Fireworks;