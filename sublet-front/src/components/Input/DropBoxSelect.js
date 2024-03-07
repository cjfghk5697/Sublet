import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DropBoxSelect = ({state, setState, labelName, labelId, id, menuItems}) => {
  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={labelId}>{labelName}</InputLabel>
        <Select
          labelId={labelId}
          id={id}
          value={state}
          label={labelName}
          onChange={handleChange}
        >
            {menuItems.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default DropBoxSelect;