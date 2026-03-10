import { useState, useEffect } from "react";

function Checkbox({ todo, onUpdate }) {
    const [checked, setChecked] = useState(todo.completed);

    useEffect(() => {
        setChecked(todo.completed);
    }, [todo.completed]);

    const handleChange = (e) => {
        const newChecked = e.target.checked;
        setChecked(newChecked);

        // Uppdatera backend
        if (onUpdate) {
            onUpdate(todo.id, { completed: newChecked });
        }
    };

    return (
        <input
            type="checkbox"
            className="checkbox"
            checked={checked}
            onChange={handleChange}
        />
    );
}

export default Checkbox;