export const makeTestData = () => {
  return (
    [{
      id: "650728e80ef0723c4dad666c",
      key: 0,
      basic_info: "-> 강남역 5분, 강동 미래아트센터 10분 거리입니다. 그리고 여기 있는 모둔 가구들은 전부 사용가능합니다.      이외에 제가 모은 배달 쿠폰들 전부 드립니다. 영화관도 가까워서 데이트하기도 좋습니다. 개인 위생용품은 챙기셔야합니다.",
      benefit: "3개월 이상 계약시 달 5만원 줄여드리는 혜택 드립니다.",
      description: "8평, 방 개수수, 식사 시설, 건물 유형, 주차",
      end_day: "2023-09-18T00:00:00.000Z",
      extra_info: "혹시 모를 하고 싶은 말 등등등",
      images: [
        "testImages/room1.png",
        "testImages/room2.png",
        "testImages/room3.png",
        "testImages/room4.png",
        "testImages/room5.png"
      ],
      max_duration: "5M",
      min_duration: "3M",
      position: "서울특별시 강남구 논현동",
      refund_policy: "7일전 : 30% 환불 \n14일전 : 50% 환불  \n한달 전: 80 % 환불",
      rule: "🎉 파티 금지 🚗  유료 주차 ❌ 절대로 안방에 있는 욤품 건드리지 마세요. 그리고 기물 파손시 금액 청구합니다.",
      start_day: "2023-09-18T00:00:00.000Z",
      title: "강남에 직장이 있는 분을 위한 맞춤형 숙소(백)",
      like: true,
      likeCount: 55,
      price: 1000000
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
        "./testImages/room2.png",
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
      title: "제목2",
      like: false,
      likeCount: 55,
      price: 1000000
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
        "./testImages/room3.png",
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
      title: "제목3",
      like: false,
      likeCount: 55,
      price: 1000000
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
        "./testImages/room4.png",
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
      title: "제목4",
      like: true,
      likeCount: 55,
      price: 1000000
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
        "./testImages/room4.png",
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
      title: "제목5",
      like: true,
      likeCount: 55,
      price: 1000000
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
      title: "제목6",
      like: true,
      likeCount: 55,
      price: 1000000
    },
    ]
  );
}

export const makeTestRecommendSearch = () => {
  return (
    [
      {
        recommendWord: "강남 투룸",
      },
      {
        recommendWord: "서울 2개월 임대",
      },
      {
        recommendWord: "추천 임대 유형",
      },
      {
        recommendWord: "지하철 주변 임대",
      },
      {
        recommendWord: "강남 1개월 임대",
      },
      {
        recommendWord: "상권 좋은 장소",
      },
      {
        recommendWord: "가족과 보내기 좋은 장소",
      },
    ]
  );
}