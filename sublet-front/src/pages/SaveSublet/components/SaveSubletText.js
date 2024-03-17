export const SuveSubletText = props => {
  const start_day = new Date(props.start_day);
  return (
    <div className="flex flex-col justify-between w-full">
      <h2 className="text-lg font-semibold">{props.title}</h2>
      <p className="text-sm">
        {
          // (props.position !== undefined) ? props.position : props.city + " " + props.gu + " " + props.dong + " " + props.street
          props.position
        }
      </p>
      <p className="text-sm">
        {`${props.city} ${props.gu} ${props.dong} ${props.street} ${props.street_number}`}
      </p>
      <p className="text-sm">
        {start_day.getMonth() + 1}월 {start_day.getDate()}일 부터, 최소{' '}
        {props.min_duration}개월
      </p>
      <p className="text-lg font-bold text-[#bd1e59] text-right">
        ₩{(props.price * 30).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} /
        30일
      </p>
    </div>
  );
};
