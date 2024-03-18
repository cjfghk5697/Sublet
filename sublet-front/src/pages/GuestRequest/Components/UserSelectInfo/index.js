
import { Info1 } from "./Info1/LocationPrice";
import { Info2 } from "./Info2";
import { Info3 } from "./Info3";
import { Info4 } from "./Info4";
import { Info5 } from "./Info5";
import { RequestWord } from "./RequestWord/UserRequestWord.js";

export function UserSelectInfo() {
	return (
		<div>
			<p style={styles.GuestRequest_DetailTitle}>* 기본 정보 입력</p>
			<Info1 />
			<Info2 />
			<p style={styles.GuestRequest_DetailTitle}>방 정보 입력</p>
			<Info3 />
			<Info4 />
			<Info5 />
			<RequestWord />
		</div>

	);
};