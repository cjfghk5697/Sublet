import styled from 'styled-components';
import * as s from '../../../components/styles/Public.styles.js';

const NoButtonLayout = styled(s.PolicyText)`
  margintop: '3rem';
`;

export const HomeMoreRoomButton = ({ preRoomsData, fetchRoomsDefault }) => {
  if (preRoomsData.length === 0) {
    return <NoButtonLayout>더 불러올 방이 없습니다..</NoButtonLayout>;
  } else {
    return (
      <s.NormalButton variant="contained" onClick={fetchRoomsDefault}>
        방 더보기
      </s.NormalButton>
    );
  }
};
