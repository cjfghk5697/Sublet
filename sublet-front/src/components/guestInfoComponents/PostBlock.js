import { PostSummaryBlock } from '../SummaryBlock';
import { DateFormat, priceToString } from '../StaticComponents.js';
import * as s from '../styles/Public.styles.js';
import { FetchGetPost } from '../FetchList';
import { guestInfoPopUpStore } from '../store/guestInfoStore.js';
import { useState } from 'react';

function PostInfo(user_id) {
  const [postInfo, setPostInfo] = useState([]);
  FetchGetPost(user_id.user_id, setPostInfo);

  const { setPostPopUpState } = guestInfoPopUpStore(state => ({
    setPostPopUpState: state.setPostPopUpState,
  }));

  return (
    <div className="mb-4 mt-8">
      <s.SecondHead className="inline">방 현황</s.SecondHead>
      {postInfo.length > 0 ? (
        postInfo.map(res => {
          const address = res.city + ' ' + res.gu + ' ' + res.dong;
          const postDate = DateFormat(res.post_date);
          const price = priceToString(res.price);

          return (
            <PostSummaryBlock
              room={res}
              postDate={postDate}
              price={price}
              address={address}
              guestMode={true}
            />
          );
        })
      ) : (
        <p className="text-base font-extrabold">올린 방이 아직 없습니다.</p>
      )}
      <s.NormalButton onClick={setPostPopUpState}>방 올리기</s.NormalButton>
    </div>
  );
}

export { PostInfo };
