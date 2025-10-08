import { useState } from "react";

function useInput(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  const onValueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  // Pastikan return statement seperti ini
  return [value, onValueChangeHandler, setValue];
}

export default useInput;