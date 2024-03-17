import { NormalButton } from '@components/styles/Public.styles';
import styled from 'styled-components';
<<<<<<< HEAD
=======
import * as s from '../../../@shared/components/styles/Public.styles.js';
>>>>>>> 11da444f69e79a7ed625dac81d78e694d86537fa

const NoButtonLayout = styled(s.PolicyText)`
  margintop: '3rem';
`;

export const HomeMoreRoomButton = ({ preRoomsData, fetchRoomsDefault }) => {
  if (preRoomsData.length === 0) {
    return <NoButtonLayout>더 불러올 방이 없습니다..</NoButtonLayout>;
  } else {
    return (
      <NormalButton variant="contained" onClick={fetchRoomsDefault}>
        방 더보기
      </NormalButton>
    );
  }
};
