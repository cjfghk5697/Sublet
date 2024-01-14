function SummaryBlock({ title, start_day, end_day, pay, host, room_image }) {
  //,host, room_image, host_image 추가
  const image_link = `https://localhost:4000/public/${room_image}.jpg`
  console.log(title, start_day, end_day, pay, room_image, host)
  return (
    <div className="flex grid grid-cols-5 mt-4 ml-4">
      <div>
        <img className="rounded-lg" src={image_link}></img>
      </div>
      <div className="mb-2 ml-3 col-span-4">
        <h2 className="text-2xl font-extrabold">{title}</h2>
        <p className="ml-3 text-lg font-medium">호스트: {host}</p>
        <p className="ml-3 text-lg font-medium">기간: {start_day} - {end_day}</p>
        <p className="ml-3 text-lg font-medium">비용: {pay}</p>

        <div>
          <button class="bg-white hover:bg-gray-100 text-[#F62424] font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded">
            취소하기
          </button>
          <button class="bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded ml-4">
            상세정보
          </button>
        </div>
      </div>
    </div>
  );
}

export default SummaryBlock