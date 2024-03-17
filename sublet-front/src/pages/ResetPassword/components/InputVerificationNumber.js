import { NormalText } from 'components/styles/Public.styles';
import { VerifyEmailComponents } from 'components/verifyComponents/Email';

export const InputVerificationNumber = ({ email, idState }) => {
  return (
    <div className="animate__animated animate__backInRight">
      <NormalText>인증번호 6자리를 입력하세요</NormalText>
      <VerifyEmailComponents
        email={email}
        userId={idState}
        purpose={'resetpassword'}
      />
    </div>
  );
};
