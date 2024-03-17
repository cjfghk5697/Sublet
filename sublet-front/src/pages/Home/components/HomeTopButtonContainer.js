import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { NormalButton } from '@components/styles/Public.styles';

const Layout = styled.div`
  display: flex
  flexDirection: row
  margin: 1rem 0 1rem 0rem
  gap: 0.5rem
`;

export const HomeTopButtonContainer = () => (
  <Layout>
    <NormalButton component={Link} to="/Request">
      요청서 제출하기
    </NormalButton>
    <NormalButton component={Link} to="/">
      같은 커뮤니티 확인하기
    </NormalButton>
  </Layout>
);
