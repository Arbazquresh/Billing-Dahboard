import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const Selectbar = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl fullWidth sx={{ width: "85%" }}>
      <InputLabel id="demo-simple-select-label">Medicines....</InputLabel>
      <Select
        sx={{ borderRadius: "20px" }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={10}>Paracetamol</MenuItem>
        <MenuItem value={20}>Dolo 650</MenuItem>
        <MenuItem value={30}>Crosin</MenuItem>
      </Select>
    </FormControl>
  );
};
