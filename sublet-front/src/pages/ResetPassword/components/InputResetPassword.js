import { NormalButton, NormalText } from '@shared/components/styles/Public.styles';
import { InputPassword } from '@shared/components/Input/TextInputTag';

export const InputResetPassword = ({
  inputHandle,
  passwordState,
  onChangePassword,
}) => {
  return (
    <div className="animate__animated animate__backInRight">
      <NormalText>초기화할 비밀번호를 입력하세요.</NormalText>
      <div className="mt-2">
        <InputPassword onChange={inputHandle} value={passwordState} />
      </div>
      <NormalButton onClick={onChangePassword}>다음</NormalButton>
    </div>
  );
};
