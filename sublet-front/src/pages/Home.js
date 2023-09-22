import RoomProfile from '../components/RoomProfile';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '1rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '1rem',
  },
  roomContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  room: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '20rem',
    margin: '1rem',
    padding: '1rem',
    border: '1px solid black',
    borderRadius: '1rem',
  },
};


///*
const roomTempData = [ // This is a temporary data structure for testing purposes
  {
    id: "650728e80ef0723c4dad666c",
    key: 0,
    basic_info: "기본 정보",
    benefit: "혜택",
    description: "상세설명",
    end_day: "2023-09-18T00:00:00.000Z",
    extra_info: "혹시 모를 하고 싶은 말 등등등",
    images: [
            "./testImages/room1.png",
            "image2",
            "image3",
            "image4",
            "image5"
    ],
    max_duration: "5M",
    min_duration: "3M",
    position: "숙소위치",
    refund_policy: "환불정책 1, 2, 3 등등등",
    rule: "규칙",
    start_day: "2023-09-18T00:00:00.000Z",
    title: "제목"
  },
  {
    id: "650728e80ef0723c4dad666c",
    key: 0,
    basic_info: "기본 정보",
    benefit: "혜택",
    description: "상세설명",
    end_day: "2023-09-18T00:00:00.000Z",
    extra_info: "혹시 모를 하고 싶은 말 등등등",
    images: [
            "./testImages/room1.png",
            "image2",
            "image3",
            "image4",
            "image5"
    ],
    max_duration: "5M",
    min_duration: "3M",
    position: "숙소위치",
    refund_policy: "환불정책 1, 2, 3 등등등",
    rule: "규칙",
    start_day: "2023-09-18T00:00:00.000Z",
    title: "제목2"
  },
]
//*/

let rooms = roomTempData.map( (room) => {
  return (
    <RoomProfile
      style={styles.room}
      id={room.id}
      key={room.key}
      basic_info={room.basic_info}
      benefit={room.benefit}
      description={room.description}
      end_day={room.end_day}
      extra_info={room.extra_info}
      images={room.images}
      max_duration={room.max_duration}
      min_duration={room.min_duration}
      position={room.position}
      refund_policy={room.refund_policy}
      rule={room.rule}
      start_day={room.start_day}
      title={room.title}
    />
  )
});

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.roomContainer}>
        {rooms}
      </div>
    </div>
  );
}

/*
const roomTempData = [ // This is a temporary data structure for testing purposes
{
	"id": "650728e80ef0723c4dad666c",
	"key": 0,
	"basic_info": "기본 정보",
	"benefit": "혜택 3개월 이상 계약시 달 5만원 줄여드리는 혜택 드립니다.",
	"description": "강남역 5분, 강동 미래아트센터 10분 거리입니다. 그리고 여기 있는 모둔 가구들은 전부 사용가능합니다. 이외에 제가 모은 배달 쿠폰들 전부 드립니다. 영화관도 가까워서 데이트하기도 좋습니다. 개인 위생용품은 챙기셔야합니다.",
	"end_day": "2023-09-18T00:00:00.000Z",
	"extra_info": "혹시 모를 하고 싶은 말 등등등",
	"images": [
	    "./testImages/room1.png",
	    "room2.png",
	    "room3.png",
	    "room4.png",
	    "room5.png"
	],
	"max_duration": "5M",
	"min_duration": "3M",
	"position": "서울특별시 강동구 고덕동",
	"pricePerMonth": 430000,
	"geolocation": [37.555, 127.155], // latitude, longitude
	"refund_policy": ["숙소 이용 7일 전까지 100% 환불", "숙소 이용 3일 전까지 50% 환불", "숙소 이용 3일 전 이후 환불 불가"],
	"rule": ["반려동물 금지", "흡연 금지", "파티 금지", "주차 불가", "최대 인원 2명"],
	"start_day": "2023-09-18T00:00:00.000Z",
	"title": "강남에 직장이 있는 분을 위한 맞춤형 숙소",
  like: false,
  likeCount: 55,
},
]
*/

/*
const roomTempData = [ // This is a temporary data structure for testing purposes
{  
  id: 1,
  title: "강남에 직장이 있는 분을 위한 맞춤형 숙소",
  location: "서울특별시 강동구 고덕동",
  geolocation: [37.555, 127.155], // latitude, longitude
  nearby: ["고덕역 5분", "강동 미래아트센터 10분"],
  description: "강남역 5분, 강동 미래아트센터 10분 거리입니다. 그리고 여기 있는 모둔 가구들은 전부 사용가능합니다. 이외에 제가 모은 배달 쿠폰들 전부 드립니다. 영화관도 가까워서 데이트하기도 좋습니다. 개인 위생용품은 챙기셔야합니다.",
  pricePerMonth: 430000,
  images: ["./sublet-front/src/pages/Home/testImages/room1.png"],
  rule: ["반려동물 금지", "흡연 금지", "파티 금지", "주차 불가", "최대 인원 2명"],
  refund: ["숙소 이용 7일 전까지 100% 환불", "숙소 이용 3일 전까지 50% 환불", "숙소 이용 3일 전 이후 환불 불가"],
  benefit: "혜택 3개월 이상 계약시 달 5만원 줄여드리는 혜택 드립니다.",
  like: false,
  likeCount: 55,
},
{  
  id: 2,
  location: "서울특별시 강남구 논현동",
  nearby1: "강남역 5분",
  nearby2: "신논현역 10분",
  pricePerMonth: 500000,
  image: "./sublet-front/src/pages/Home/testImages/room2.png",
  like: false,
  likeCount: 327,
},
{  
  id: 3,
  location: "서울특별시 송파구 잠실 1동",
  nearby1: "롯데월드몰 3분",
  nearby2: "석촌호수 1분",
  pricePerMonth: 630000,
  image: "./sublet-front/src/pages/Home/testImages/room3.png",
  like: false,
  likeCount: 1555,
}, 
{  
  id: 4,
  location: "경기도 하남시 위례동",
  nearby1: "가든파이브 15분",
  nearby2: "위례역 5분",
  pricePerMonth: 330000,
  image: "./sublet-front/src/pages/Home/testImages/room4.png",
  like: false,
  likeCount: 104,
}, 
]
*/