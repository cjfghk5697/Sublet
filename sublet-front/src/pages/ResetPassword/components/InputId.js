import { InputText, NormalButton } from 'components/styles/Public.styles';

export const InputId = ({
  idVeriftyState,
  inputHandle,
  idState,
  FetchGetOneUser,
  setUserInfo,
  setCheckingEmail,
  setIdVerifyState,
}) => {
  return (
    <>
      {idVeriftyState ? (
        <div className="mt-2">
          <InputText
            name="idState"
            placeholder="아이디"
            onChange={inputHandle}
            value={idState}
          />
        </div>
      ) : (
        <>
          <div className="mt-2">
            <InputText
              name="idState"
              placeholder="아이디"
              onChange={inputHandle}
              value={idState}
            />
          </div>
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            아이디가 틀렸습니다.
          </span>
        </>
      )}

      <NormalButton
        onClick={() => {
          FetchGetOneUser(idState, setUserInfo).then(response => {
            if (response) {
              setCheckingEmail(true);
            } else {
              setIdVerifyState(false);
            }
          });
        }}>
        다음
      </NormalButton>
    </>
  );
};
