import { IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchPriceRange from '@core/Header/Desktop/components/SearchPriceRange.js';

import GuestRequeststyles from '../../styles/GuestRequest.styles.js';

export function Info1() {
	const styles = GuestRequeststyles();
	return (
		<div>
			<div style={styles.RequestBoxContainer}>
				<div style={styles.Requestselect}>
					<IconButton style={styles.RequestLocation}>
						위치
						<LocationOnIcon />
					</IconButton>
				</div>
				<div style={styles.Requestselect}>
					<SearchPriceRange />
				</div>
			</div>
		</div>
	);
};