import { useEffect, useState } from 'react';

import { useTitle } from '../components/hook/HookCollect.js';
import { PostInfo } from '../components/guestInfoComponents/PostBlock.js';
import * as s from '../components/styles/Public.styles.js';

import Header from '../components/Header.js';
import { useParams } from 'react-router-dom';

function User({ user }) {
	const title = user.username + '님의 프로필 | ItHome';
	useTitle(title);

	const image_link = `${process.env.REACT_APP_BACKEND_URL}/public_user/${user.image_id}.jpg`;

	const userBaseComponent = (
		<div>
			<img
				src={image_link}
				className="hover:opacity-60 object-scale-down rounded-lg rounded-lg"
				alt="my profile"
			/>
			<s.SecondHead className="mt-3">{user.username}</s.SecondHead>
			<s.NormalText className="underline">{user.school}</s.NormalText>
			<s.NormalText>
				신분증 {user.id_card ? '인증 완료✅' : '인증 안됨❌'}
			</s.NormalText>
			<s.NormalText>
				학교 이메일 {user.verify_email ? '인증 완료✅' : '인증 안됨❌'}
			</s.NormalText>
			<s.NormalText>
				전화번호 {user.verify_phone ? '인증 완료✅' : '인증 안됨❌'}
			</s.NormalText>
			<s.NormalText>
				재학증 {user.verify_school ? '인증 완료✅' : '인증 안됨❌'}
			</s.NormalText>{' '}
		</div>
	);

	return (
		<div>
			<div
				style={{ fontFamily: 'Pretendard' }}
				className="flex grid grid-cols-7">
				<div className="ml-3 mt-5">{userBaseComponent}</div>

				<div className="mb-2 ml-7 col-span-6 mt-5 w-5/6">
					<PostInfo user_id={user.user_id} />
				</div>
			</div>
		</div>
	);
}

function HostInfo() {
	const { userId } = useParams();
	const [loading, setLoading] = useState(false);
	const [userInfo, setUserInfo] = useState();
	const URL = `${process.env.REACT_APP_BACKEND_URL}/user/${userId}`;

	const getUserInfo = async () => {
		const requestOptions = {
			credentials: 'include',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const json = await (await fetch(URL, requestOptions)).json();
		setLoading(true);
		setUserInfo(json);
	};
	useEffect(() => {
		getUserInfo();
	}, []);

	return <s.Wrapper>{loading && <User user={userInfo} />};</s.Wrapper>;
}

export default HostInfo;
