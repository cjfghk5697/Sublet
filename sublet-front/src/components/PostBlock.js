import { PostSummaryBlock } from "./SummaryBlock";
import { useEffect, useState } from "react";
import { DateFormat, priceToString } from "./StaticComponents.js";
import * as s from './styles/SummaryBlock.styles.js'
import './styles/Popup.styles.css'

function FetchPost() {
  const [loading, setLoading] = useState(true);
  const [postInfo, setPostInfo] = useState([]);
  const getPostInfo = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const json = await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/post`
        , requestOptions)
    ).json();

    setLoading(false)
    setPostInfo(json)
  };

  useEffect(() => {
    getPostInfo();
  }, []);

  const post = Array.from(postInfo)

  return [post, loading]
}

function PostInfo() {
  const [post, loading] = FetchPost()
  console.log('[post]', post)


  return (
    <div className="mb-4 mt-8">
      <h2 className="text-2xl font-extrabold inline">방 현황</h2>
      <s.room_upload >방 올리기</s.room_upload>
      <hr className="h-px mt-1 bg-gray-200 border-0 dark:bg-gray-700" />
      {loading ?
        (
          <p className="text-base font-extrabold">올린 방이 아직 없습니다.</p>
        ) : (post.length > 0 ? post.map((res) => {
          const address = res.city + ' ' + res.gu + ' ' + res.dong;
          const post_date = DateFormat(res.post_date);
          const price = priceToString(res.price);

          return (
            < PostSummaryBlock
              title={res.title}
              post_key={res.key}
              accomodation_type={res.accomodation_type}
              post_date={post_date}
              pay={price}
              request={res.request}
              private_post={res.private}
              contract={res.contract}
              address={address}
              room_image={res.image_id[0]}
            />)
        }) : <p className="text-base font-extrabold">올린 방이 아직 없습니다.</p>)
      }
    </div>
  )


};

export { PostInfo, FetchPost };