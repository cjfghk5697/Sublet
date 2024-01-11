function SummaryBlock({ title, start_day, end_day, pay, room_image }) {
  //,host, room_image, host_image 추가
  return (
    <div>
      {/*<img src='http://localhost:4000/public/${room_image}'></img>*/}
      {/*<img src={room_image[0]} ></img>*/}
      {/*<img src={host_image} ></img>*/}
      <h2>{title}</h2>
      {/*<p>호스트: {host}</p>*/}
      <p>기간: {start_day} - {end_day}</p>
      <p>비용: {pay}</p>
    </div>
  );
}

export default SummaryBlock