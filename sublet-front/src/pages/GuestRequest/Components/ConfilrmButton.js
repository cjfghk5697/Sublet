import * as s from '@shared/components/styles/GuestRequest.styles.js';

export function ComfilrmButton() {
	return (
		<div className="mt-4">
			<s.confilrmButton onClick={() => RequestPost(inputs)}>
				확인하기
			</s.confilrmButton>
		</div>
	);
};