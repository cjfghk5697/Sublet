import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function Contract() {
    return (
        <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
            <InputLabel id="demo-simple-select-label">
                임대 종류
            </InputLabel>
            <Select
                name={'contract'}
                value={contract}
                label="contract"
                onChange={requestHandle}>
                <MenuItem value={'borrow'}>매물</MenuItem>
                <MenuItem value={'get'}>분양</MenuItem>
            </Select>
        </FormControl>
    );
};