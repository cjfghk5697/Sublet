import * as s from '../styles/GuestRequest.styles';



export function ComfilrmButton() {
	return (
		<div className="mt-4">
			<s.confilrmButton onClick={() => RequestPost(inputs)}>
				확인하기
			</s.confilrmButton>
		</div>
	);
};