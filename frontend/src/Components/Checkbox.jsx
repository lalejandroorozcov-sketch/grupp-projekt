function Checkbox({ todo, onUpdate }) {
    const handleChange = (e) => {
        if (onUpdate) {
            onUpdate(todo.id, { completed: e.target.checked });
        }
    };

    return (
        <input
            type="checkbox"
            className="checkbox"
            checked={todo.completed || false}
            onChange={handleChange}
        />
    );
}

export default Checkbox;