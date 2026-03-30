import { useState, useEffect } from "react";

function Fireworks({ trigger }) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (trigger) {
            setVisible(true)
             setTimeout(() => {
                setVisible(false)
            }, 3000)
        }
    }, [trigger]);

    return (
        visible ? (
            <div className="fireworks" >
                <h2 style={{
                    color: 'white',
                    margin: 0,
                    textAlign: 'center',
                }}>Good Job!</h2>

            </div>
        ) : null

    )
}

export default Fireworks;