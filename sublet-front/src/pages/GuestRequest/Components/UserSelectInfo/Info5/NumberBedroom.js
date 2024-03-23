import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function NumberBedroom() {
	return (
		<FormControl sx={{ m: 1, minWidth: 170 }} size="small">
			<InputLabel id="demo-simple-select-label">
				침실 개수
			</InputLabel>
			<Select
				name={'number_bedroom'}
				value={number_bedroom}
				label="number_bedroom"
				onChange={requestHandle}>
				<MenuItem value={'one'}>1개</MenuItem>
				<MenuItem value={'two'}>2개</MenuItem>
			</Select>
		</FormControl>
	);
};