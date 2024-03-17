import RoomProfile from './components/RoomProfile.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useTitle } from '../components/hook/HookCollect';
import * as s from '../components/styles/Public.styles.js';

import { toggleLikes } from '../components/FetchList.js';


export default function Home() {
	useTitle('ItHome | 딱 맞는 숙소를 찾아봐요.');

	const [roomsData, setRoomsData] = useState([]);
	const [preRoomsData, setPreRoomsData] = useState([]);
	const [likes, setLikes] = useState({});
	const [listRoomAmount, setListRoomAmount] = useState(6);
	const [listPageAmount, setListPageAmount] = useState(1);

	const fetchRoomsDefault = () => {
		// 6개 저 보여주기 필요할 수도..?
		fetch(
			process.env.REACT_APP_BACKEND_URL +
			'/post' +
			`?maxPost=${listRoomAmount}&page=${listPageAmount}`,
		)
			.then(ele => ele.json())
			.then(ele => setPreRoomsData(ele));
		if (preRoomsData.length !== 0)
			setRoomsData([...roomsData, ...preRoomsData]);
		setListPageAmount(listPageAmount + 1);
	};

	useEffect(() => {
		async function fetchData() {
			let data = await fetch(
				process.env.REACT_APP_BACKEND_URL +
				'/post' +
				`?maxPost=${listRoomAmount}&page=${listPageAmount}`,
			).then(response => response.json());
			setRoomsData([...roomsData, ...data]);
			let res = await fetch(
				process.env.REACT_APP_BACKEND_URL +
				'/post' +
				`?maxPost=${listRoomAmount}&page=${listPageAmount + 1}`,
			).then(response => response.json());
			setPreRoomsData(res);
			setListPageAmount(listPageAmount + 2);
		}
		fetchData();
	}, []);

	const styles = {
		container: {
			marginBottom: '10rem',
		},
		mainContainer: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: 'auto',
		},
		roomContainer: {
			display: 'grid',
			gridTemplateRows: '1fr ',
			gridTemplateColumns: '1fr 1fr 1fr',
			fontSize: '1em',
		},
		topButtonsContainer: {
			display: 'flex',
			flexDirection: 'row',
			margin: '1rem 0 1rem 0rem',
			gap: '0.5rem',
		},
		moreRoomDescription: {
			marginTop: '3rem',
		},
	};

	const rooms = roomsData?.map((room, index) => (
		<RoomProfile
			key={index}
			room={room}
			toggleLikes={toggleLikes}
			likes={likes}
			setLikes={setLikes}
		/>
	));

	const RequirementSubmitAndCommunityFind = () => (
		<div style={styles.topButtonsContainer}>
			<s.NormalButton component={Link} to="/Request">
				요청서 제출하기
			</s.NormalButton>
			<s.NormalButton component={Link} to="/">
				같은 커뮤니티 확인하기
			</s.NormalButton>
		</div>
	);

	return (
		<>
			<div style={styles.container}>
				<div style={styles.mainContainer}>
					<RequirementSubmitAndCommunityFind />
					<div style={styles.roomContainer}>{rooms}</div>
					{preRoomsData.length !== 0 ? (
						<s.NormalButton variant="contained" onClick={fetchRoomsDefault}>
							방 더보기
						</s.NormalButton>
					) : (
						<s.PolicyText style={styles.moreRoomDescription}>
							더 불러올 방이 없습니다..
						</s.PolicyText>
					)}
				</div>
			</div>
		</>
	);
}
