import { DateFormat, Information, priceToString } from '../StaticComponents';
import * as s from '../styles/Public.styles.js';
export function RequestByPostKeyInfo({ Post }) {
  return (
    <div className="mb-4">
      <s.SecondHead>응답 현황</s.SecondHead>
      <s.Horizon />
      {Post.map(res => {
        const image_link = `${process.env.REACT_APP_BACKEND_URL}/public/${res.image_id[0]}.jpg`;
        const price = priceToString(res.price);
        const address = res.city + ' ' + res.gu + ' ' + res.dong;
        return (
          <>
            <div className="mt-2 grid grid-cols-4">
              <div>
                <img
                  src={image_link}
                  className="object-cover s-23 h-13 rounded-lg rounded-lg"
                  alt="request post image"
                />
              </div>
              <div className="ml-2 col-span-3">
                <s.SecondHead>{res.title}</s.SecondHead>

                <s.DetailParagraph>호스트:</s.DetailParagraph>
                <s.DetailParagraph>비용: {price}</s.DetailParagraph>
                <s.DetailParagraph>위치: {address}</s.DetailParagraph>
                <s.NormalButton>메세지 보내기</s.NormalButton>
              </div>
            </div>
            <s.Horizon className="mt-2" />
          </>
        );
      })}
    </div>
  );
}

export function PostRequest({ requestList }) {
  return (
    <div className="mb-4">
      <s.SecondHead>요청서 현황</s.SecondHead>
      <s.Horizon />
      {requestList.map(res => {
        const price = priceToString(res.price);
        const address = res.city + ' ' + res.gu + ' ' + res.dong;
        const start = DateFormat(res.start_day);
        const end = DateFormat(res.end_day);

        const info_list = {
          비용: price,
          '방 개수': res.number_room,
          '욕실 개수': res.number_bathroom,
          '침실 개수': res.number_bedroom,
          '계약 형태': res.accomodation_type,
          건물: res.building_type,
          학교: res.school,
          요청사항: res.request_text,
        };

        return (
          <>
            <div className="mt-2">
              <s.SecondHead>{address}</s.SecondHead>
              <s.DetailParagraph>
                요청 날짜: {start} ~ {end}
              </s.DetailParagraph>
              {Object.keys(info_list).map(k => (
                <Information title={k} info={info_list[k]} />
              ))}

              <s.NormalButton>메세지 보내기</s.NormalButton>
            </div>
            <div>
              <s.Horizon className="mt-2" />
            </div>
          </>
        );
      })}
    </div>
  );
}
