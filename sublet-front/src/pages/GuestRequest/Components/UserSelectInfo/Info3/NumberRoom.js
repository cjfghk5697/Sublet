import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function NumberRoom() {
    return (
        <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
            <InputLabel id="demo-simple-select-label">
                층수 이거 중복이어야하는데
            </InputLabel>
            <Select
                name={'number_room'}
                value={number_room}
                label="number_room"
                onChange={requestHandle}>
                <MenuItem value={'one'}>1층</MenuItem>
                <MenuItem value={'two'}>2층</MenuItem>
                <MenuItem value={'three'}>3층</MenuItem>
                <MenuItem value={'four'}>4층</MenuItem>
                <MenuItem value={'five'}>5층</MenuItem>
            </Select>
        </FormControl>
    );
};