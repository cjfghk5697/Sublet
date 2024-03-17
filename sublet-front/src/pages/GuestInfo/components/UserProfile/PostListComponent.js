import { guestInfoPopUpStore } from 'components/store/guestInfoStore.js';
import { useState } from 'react';
import { NormalButton, SecondHead } from '@shared/components/styles/Public.styles.js';
import { DateFormat, priceToString } from '@shared/components/StaticComponents/StaticComponents.js';
import { FetchGetPost } from '@shared/components/FetchList/FetchList.js';
import { PostSummaryBlock } from '../Blocks/PostSummaryBlock.js';

function PostListComponent(userId, guestMode = true) {
  const [postInfo, setPostInfo] = useState([]);
  FetchGetPost(userId.user_id, setPostInfo);

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
              guestMode={guestMode}
            />
          );
        })
      ) : (
        <p className="text-base font-extrabold">올린 방이 아직 없습니다.</p>
      )}
      {!guestMode && (
        <NormalButton onClick={setPostPopUpState}>방 올리기</NormalButton>
      )}
    </div>
  );
}

export { PostListComponent };
