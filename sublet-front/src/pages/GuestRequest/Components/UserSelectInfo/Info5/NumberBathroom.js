import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function NumberBathroom() {
    return (
        <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
            <InputLabel id="demo-simple-select-label">
                욕실 개수
            </InputLabel>
            <Select
                name={'number_bathroom'}
                value={number_bathroom}
                label="number_bathroom"
                onChange={requestHandle}>
                <MenuItem value={'one'}>1개</MenuItem>
                <MenuItem value={'two'}>2개</MenuItem>
            </Select>
        </FormControl>
    );
};