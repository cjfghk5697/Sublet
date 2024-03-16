import { guestInfoPopUpStore } from '../store/guestInfoStore.js';
import { useState } from 'react';
import { NormalButton, SecondHead } from '@components/styles/Public.styles';
import { PostSummaryBlock } from './Blocks/PostSummaryBlock';
import { DateFormat, priceToString } from '@components/StaticComponents';
import { FetchGetPost } from '@components/FetchList.js';

function PostListComponent(user_id) {
  const [postInfo, setPostInfo] = useState([]);
  FetchGetPost(user_id.user_id, setPostInfo);

  const { setPostPopUpState } = guestInfoPopUpStore(state => ({
    setPostPopUpState: state.setPostPopUpState,
  }));

  return (
    <div className="mb-4 mt-8">
      <SecondHead className="inline">방 현황</SecondHead>
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
      <NormalButton onClick={setPostPopUpState}>방 올리기</NormalButton>
    </div>
  );
}

export { PostListComponent };
