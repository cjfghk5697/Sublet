import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function BuildingType() {
    return (
        <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
            <InputLabel id="demo-simple-select-label">
                건물 유형
            </InputLabel>
            <Select
                name={'building_type'}
                value={building_type}
                label="building_type"
                onChange={requestHandle}>
                <MenuItem value={'oneRoom'}>원룸</MenuItem>
                <MenuItem value={'twoThree_Room'}>투-쓰리룸</MenuItem>
                <MenuItem value={'office'}>오피스텔</MenuItem>
                <MenuItem value={'apartment'}>아파트</MenuItem>
            </Select>
        </FormControl>
    );
};