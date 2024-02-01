import { ReservationSummaryBlock } from "./SummaryBlock";
import { useEffect, useState } from "react";

function FetchReservation() {
  const [loading, setLoading] = useState(true);
  const [reservationInfo, setReservationInfo] = useState([]);
  const getReservationInfo = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const json = await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/reservation`
        , requestOptions)
    ).json();

    setLoading(false)
    setReservationInfo(json)
  };

  useEffect(() => {
    getReservationInfo();
  }, []);

  const reservation = Array.from(reservationInfo)

  return [reservation, loading]
}

function ReservationInfo() {
  const [reservation, loading] = FetchReservation()
  console.log('[reservation]', reservation)
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-extrabold">예약 현황</h2>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {loading ?
        (
          <p className="text-base font-extrabold">예약이 아직 없습니다.</p>
        ) : (reservation.length > 0 ? reservation.map((res) => (
          <ReservationSummaryBlock
            title={res.Post.title}
            host={res.Post.postuser.user_id}
            start_day={res.r_start_day}
            end_day={res.r_end_day}
            pay={res.pay}
            key_num={res.key}
            room_image={res.Post.image_id[0]}
          />
        )
        ) : <p className="text-base font-extrabold">예약이 아직 없습니다.</p>)
      }
    </div>
  )

};

export { ReservationInfo, FetchReservation };