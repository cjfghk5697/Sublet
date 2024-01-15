import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "1em",
  },
  roomTitleAndLike: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roomTitle: {
    fontSize: "1.2em",
    fontWeight: "bold",
  },
  price: {
    fontSize: "1.2em",
  },
};

export default function RoomProfile(props) {
  if (!props.room) return <div></div>;
  return (
    <div style={styles.container}>
      <img
        src={
          process.env.REACT_APP_BACKEND_URL +
          "/public/" +
          props.room.image_id[0] +
          ".jpg"
        }
        alt="Room image"
      />
      <div style={styles.roomTitleAndLike}>
        <span style={styles.roomTitle}>
          {props.room.city} {props.room.gu} {props.room.dong}
        </span>
        <IconButton>
          {props.room.roomLike !== undefined ? (
            <Favorite />
          ) : (
            <FavoriteBorder />
          )}{33 /* 좋아유 수*/}
        </IconButton>
      </div>
      <div style={styles.price}>
        ₩{props.room.price * 30}/1개월
      </div>
    </div>
  );
}


// <IconButton onClick={toggleFavorite(room)}>


/*
{
  "city": "경기 고양시",
  "gu": "덕양구",
  "dong": "용두동",
  "price": 200000,
  "street": "서오릉로",

  "x_coordinate": 126,
  "y_coordinate": 37,

  "position": "숙소위치",
  "title": "숙소게시글제목",
  "basic_info": "기본정보",
  "description": "설명",
  
  "rule": "숙소규칙",
  "refund_policy": "환불정보",
  "benefit": "혜택",
  "extra_info": "많은정보",
  "start_day": "2024-01-10T00:00:00.000Z",
  "end_day": "2024-04-05T00:00:00.000Z",
  "min_duration": 10,
  "max_duration": 15,
  "postuser_id": "65996a68fffe8209bc98044d",
  "post_date": "2024-01-09T13:00:31.469Z",
  "private": false,
  "request": false,
  "limit_people": 4,
  "number_room": 3,
  "number_bathroom": 1,
  "number_bedroom": 2,
  "accomodation_type": "5",
  "building_type": "building",
  "contract": true,
  "street_number": "334-32",
  "post_code": "10548"
}
*/