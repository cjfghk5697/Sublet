import { NormalText } from 'components/styles/Public.styles';

export const VerifyList = (k, v) => {
  return (
    <NormalText>
      {k} {v ? '인증 완료✅' : '인증 안됨❌'}
    </NormalText>
  );
};
