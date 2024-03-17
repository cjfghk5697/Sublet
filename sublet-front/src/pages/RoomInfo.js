import {
	PersonIcon,
	SingleBedIcon,
	HomeIcon,
	BathtubIcon,
} from '@mui/icons-material';
import { Dialog, DialogContent } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SubletPostStore } from '../store/SubletPostStore';
import { Carousel } from '@material-tailwind/react';
import Map from '../components/Map';
import SearchDate from '../@core/Header/Desktop/components/SearchDate.js';
import * as s from '../components/styles/Public.styles.js';
import { ShareDialog } from '../components/Popup.js';
import { StyleComponent } from '../components/StaticComponents.js';
import { bookingPopUpStore } from '../components/store/bookingPopUpStore.js';
import { useSearchDateStore } from '../@core/Header/store/searchDateStore.js';
import { getDateDiff } from '../components/StaticComponents.js';
import * as RS from 'components/styles/RoomInfo.styles.js';

export default function RoomInfo() {
	// 새 창에서 열릴 때 props를 못 받아와서, zustand의 전역 저장소를 사용한다.
	const { roomKey: nowRoomNum } = useParams();

	const [nowRoomPost, setNowRoomPost] = useState({});
	const [sharePopUpState, setSharePopUpState] = useState(false);
	const { post, postExist, postAll } = SubletPostStore(state => ({
		post: state.post,
		postExist: state.postExist,
		postAll: state.postAll,
	}));
	const { page, asyncGetPost, asyncGetPostAll } = SubletPostStore(state => ({
		page: state.page,
		asyncGetPost: state.asyncGetPost,
		asyncGetPostAll: state.asyncGetPostAll,
	}));

	useEffect(() => {
		if (!postExist) {
			asyncGetPostAll();
		}
		setNowRoomPost({ ...postAll.find(post => post.key == nowRoomNum) });
	}, [postExist]);

	//페이지 이동 부분
	const navigate = useNavigate();
	const { setStartDay, setEndDay, setDayPay, setTotalPay, setPostKey } =
		bookingPopUpStore(state => ({
			setStartDay: state.setTempStartDayState,
			setEndDay: state.setTempEndDayState,
			setDayPay: state.setDayPayState,
			setTotalPay: state.setTotalPayState,
			setPostKey: state.setPostKey,
		}));
	const { searchDate } = useSearchDateStore();

	const IsLogin = async () => {
		const requestOptions = {
			credentials: 'include',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const json = await (
			await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/user/profile`,
				requestOptions,
			)
		).json();

		if (json.statusCode === 403) {
			return false;
		} else {
			return true;
		}
	};
	const moveToBooking = () => {
		//로그인 되어 있으면 booking.js로 넘기고, 로그인이 안 되어 있으면 로그인 모달 창 띄우기
		//console.log(IsLogin()); //몰루겟다
		console.log(
			IsLogin().then(result => {
				return result;
			}),
		);
		// if (IsLogin().then((result) => { return result; })) {
		//   setStartDay(searchDate[0]);
		//   setEndDay(searchDate[1]);
		//   setDayPay(nowRoomPost.price);
		//   setTotalPay(nowRoomPost.price * getDateDiff(searchDate[0], searchDate[1]));
		//   setPostKey(nowRoomNum);
		//   navigate(`/booking`);
		// } else {
		//   alert('로그인이 필요합니다.');
		// }
	};

	return (
		<>
			<ImageCarousel>
				{postExist &&
					postAll
						.find(post => post.key == nowRoomNum)
						.image_id.map((image_id, index) => (
							<img
								src={`${process.env.REACT_APP_BACKEND_URL}/public/${image_id}.jpg`}
								alt={`image ${index}`}
								className="h-full object-cover m-auto"
							/>
						))}
			</ImageCarousel>

			{postExist && nowRoomPost && (
				<>
					<div>
						<s.NormalButton
							onClick={() => {
								setSharePopUpState(true);
							}}>
							공유하기
						</s.NormalButton>
						<Dialog
							open={sharePopUpState}
							className="border border-gray-300 shadow-xl rounded-lg">
							<DialogContent sx={{ height: 224 }} className="text-left">
								<form className="flot-right">
									<s.NormalButton
										type="button"
										name="sharePopUpState"
										onClick={() => {
											setSharePopUpState(false);
										}}>
										<StyleComponent content="CloseButton" />
									</s.NormalButton>
								</form>

								<ShareDialog
									description={nowRoomPost.description}
									title={nowRoomPost.title}
									image_id={nowRoomPost.image_id}
									className="clear-both"
								/>
							</DialogContent>
						</Dialog>
					</div>
					{/* {console.log(nowRoomPost)} */}

					<RS.RoomTitle>
						{nowRoomPost.title} {`(숙소번호 : ${nowRoomNum})`}
					</RS.RoomTitle>

					<RoomPrice nowRoomPost={nowRoomPost} />

					<RoomDetail nowRoomPost={nowRoomPost} />

					<section className="mx-3 mb-6">
						<div className="text-xl font-bold">지도</div>
						<div className="h-1/6 overflow-hidden px-10">
							{postExist && <Map />}
						</div>
					</section>

					<RoomReservation
						nowRoomPost={nowRoomPost}
						moveToBooking={moveToBooking}
					/>

					<RoomHost />
				</>
			)}
		</>
	);
}

function ImageCarousel({ children }) {
	return (
		<RS.ImgContainer>
			<Carousel
				className="rounded-xl text-center"
				navigation={({ setActiveIndex, activeIndex, length }) => (
					<div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
						{new Array(length).fill('').map((_, i) => (
							<span
								key={i}
								className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
									}`}
								onClick={() => setActiveIndex(i)}
							/>
						))}
					</div>
				)}>
				{children}
			</Carousel>
		</RS.ImgContainer>
	);
}

function RoomPrice({ nowRoomPost }) {
	return (
		<RS.RoomInfoSection>
			<div className="flex justify-between items-start">
				<div className="text-lg font-bold">30박</div>
				<div className="text-3xl font-bold mt-1">
					{(nowRoomPost.price * 30)
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					원~
				</div>
				<div className="text-sm font-bold mt-2">
					1박 당{' '}
					{(nowRoomPost.price * 1)
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					원
				</div>
				<div className="flex flex-col text-sm text-gray-500 mt-3">
					{new Date(nowRoomPost.start_day).getMonth() + 1}월{' '}
					{new Date(nowRoomPost.start_day).getDate()}일 부터, 최소{' '}
					{nowRoomPost.min_duration}개월
				</div>
			</div>
		</RS.RoomInfoSection>
	);
}

function RoomDetail({ nowRoomPost }) {
	return (
		<RS.RoomInfoSection>
			<div className="text-xl font-bold">방 정보</div>
			<div className="flex w-80 mx-10 flex-wrap content-center flex-row justify-around">
				<div>
					<PersonIcon />
					최대 {nowRoomPost.limit_people} 인
				</div>
				<div>
					<SingleBedIcon />방 {nowRoomPost.number_room} 개
				</div>
				<div>
					<HomeIcon />
					침실 {nowRoomPost.number_bedroom} 개
				</div>
				<div>
					<BathtubIcon />
					화장실 {nowRoomPost.number_bathroom} 개
				</div>
			</div>

			<div className="text-sm font-bold">
				<p>{nowRoomPost.content}</p>
				<p>{nowRoomPost.description}</p>
			</div>
		</RS.RoomInfoSection>
	);
}

function RoomReservation({ nowRoomPost, moveToBooking }) {
	return (
		<RS.RoomInfoSection>
			<div className="text-xl font-bold">예약하기</div>
			<SearchDate />
			<div className="mt-4 mb-2 text-2xl font-bold">
				{`${(getDateDiff(searchDate[0], searchDate[1]) * nowRoomPost.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}{' '}
				원
				<span className="text-sm font-normal">
					{' '}
					/ {getDateDiff(searchDate[0], searchDate[1])} 일
				</span>
			</div>
			<s.NormalButton onClick={moveToBooking}>예약하기</s.NormalButton>
			<div className="mt-2 mb-2 text-sm text-gray-600">
				예약 확정 전에 환불 규정을 확인 하셨나요?
			</div>
		</RS.RoomInfoSection>
	);
}

