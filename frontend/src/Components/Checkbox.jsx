import { useState, useEffect} from "react";

function Checkbox({ todo }){

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(todo.completed);
  }, [todo.completed]);


  return (
    <input
      type="checkbox"
      className="checkbox"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}

export default Checkbox;