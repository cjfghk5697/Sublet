import { DateFormat, Information, priceToString } from "../StaticComponents"
import * as w from "../styles/Wrapper.style"
import * as s from "../styles/SummaryBlock.styles.js"
export function RequestByPostKeyInfo({ Post }) {
  return (
    <div className="mb-4">
      <w.SecondHead>응답 현황</w.SecondHead>
      <w.Horizon />
      {Post.map((res) => {
        const image_link = `${process.env.REACT_APP_BACKEND_URL}/public/${res.image_id[0]}.jpg`
        const price = priceToString(res.price)
        const address = res.city + ' ' + res.gu + ' ' + res.dong;
        return (
          <>
            <div className="mt-2 grid grid-cols-4">
              <div>
                <img src={image_link} className="object-cover w-23 h-13 rounded-lg rounded-lg" alt="request post image" />
              </div>
              <div className="ml-2 col-span-3">
                <w.SecondHead>{res.title}</w.SecondHead>

                <w.DetailParagraph>호스트:</w.DetailParagraph>
                <w.DetailParagraph>비용: {price}</w.DetailParagraph>
                <w.DetailParagraph>위치: {address}</w.DetailParagraph>
                <s.black_upload_button>메세지 보내기</s.black_upload_button>
              </div>

            </div>
            <w.Horizon className="mt-2" />
          </>
        )
      })
      }

    </div>
  )
};

export function PostRequest({ request_list }) {
  return (
    <div className="mb-4">
      <w.SecondHead>요청서 현황</w.SecondHead>
      <w.Horizon />
      {request_list.map((res) => {
        const price = priceToString(res.price)
        const address = res.city + ' ' + res.gu + ' ' + res.dong;
        const start = DateFormat(res.start_day)
        const end = DateFormat(res.end_day)

        const info_list = {
          '비용': price,
          '방 개수': res.number_room,
          '욕실 개수': res.number_bathroom,
          '침실 개수': res.number_bedroom,
          '계약 형태': res.accomodation_type,
          '건물': res.building_type,
          '학교': res.school
        }

        return (
          <>
            <div className="mt-2">
              <w.SecondHead>{address}</w.SecondHead>
              <w.DetailParagraph>요청 날짜: {start} ~ {end}</w.DetailParagraph>
              {Object.keys(info_list).map((k => (
                <Information title={k}
                  info={info_list[k]} />
              )))}

              <s.black_upload_button>메세지 보내기</s.black_upload_button>
            </div>
            <div>
              <w.Horizon className="mt-2" />
            </div>
          </>
        )
      })
      }

    </div>
  )
};