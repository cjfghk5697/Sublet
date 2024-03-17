import { DateFormat, priceToString } from '@components/StaticComponents';
import { FetchGetRequest } from '@components/FetchList';
import { useState } from 'react';
import {
  NormalButton,
  NormalText,
  SecondHead,
} from '@components/styles/Public.styles';
import { RequsetSummaryBlock } from '../Blocks/RequsetSummaryBlock';

export function RequestListComponent() {
  const [requestInfo, setRequestInfo] = useState([]);
  FetchGetRequest(setRequestInfo);
  return (
    <div className="mb-4 mt-8">
      <SecondHead className="inline">요청서 현황</SecondHead>
      <NormalButton>요청서 올리기</NormalButton>
      {requestInfo.length > 0 ? (
        requestInfo.map(res => {
          const startDate = DateFormat(res.start_day);
          const endDate = DateFormat(res.end_day);
          const price = priceToString(res.price);

          return (
            <RequsetSummaryBlock
              request={res}
              startDate={startDate}
              endDate={endDate}
              pay={price}
            />
          );
        })
      ) : (
        <NormalText>올린 요청서가 아직 없습니다.</NormalText>
      )}
    </div>
  );
}
