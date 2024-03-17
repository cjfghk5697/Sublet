import { IconButton } from '@mui/material';
import SearchDate from '../../@core/Header/Desktop/components/SearchDate.js';
import { AccomodationType } from "./AccomodationType";


import GuestRequeststyles from '../../styles/GuestRequest.styles.js';

export function Info2() {
	const styles = GuestRequeststyles();

	return (
		<div style={styles.RequestBoxContainer2}>
			<IconButton style={styles.RequestminiBox1}>
				<SearchDate />
			</IconButton>

			<AccomodationType />
		</div>
	);
};