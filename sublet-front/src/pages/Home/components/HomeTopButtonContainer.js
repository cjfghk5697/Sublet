import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as s from '../../../components/styles/Public.styles.js';

const Layout = styled.div`
  display: flex
  flexDirection: row
  margin: 1rem 0 1rem 0rem
  gap: 0.5rem
`;

export const HomeTopButtonContainer = () => (
  <Layout>
    <s.NormalButton component={Link} to="/Request">
      요청서 제출하기
    </s.NormalButton>
    <s.NormalButton component={Link} to="/">
      같은 커뮤니티 확인하기
    </s.NormalButton>
  </Layout>
);
