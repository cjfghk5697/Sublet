import { EmailDialog, VerifyEmailDialog } from '@components/Popup';
import { StyleComponent } from '@components/StaticComponents';
import { guestInfoPopUpStore } from '@components/store/guestInfoStore';
import {
  Label,
  NormalButton,
  NormalText,
  SecondHead,
  SvgHoverButton,
} from '@components/styles/Public.styles';

export const UserPrivateComponent = user => {
  const { setEmailPopUpState, setPhonePopUpState, setVerifyEmailPopUpState } =
    guestInfoPopUpStore(state => ({
      setEmailPopUpState: state.setEmailPopUpState,
      setPhonePopUpState: state.setPhonePopUpState,
      setVerifyEmailPopUpState: state.setVerifyEmailPopUpState,
    }));

  return (
    <div>
      <SecondHead>사용자 정보</SecondHead>

      <div className="ml-4 mt-4">
        <div className="w-2/6">
          <Label>이메일</Label>
          <div>
            <div className="inline-block">
              <NormalText className="justify-start">{user.email}</NormalText>
            </div>
            <SvgHoverButton
              onClick={setEmailPopUpState}
              className="justify-end">
              <StyleComponent content="FixInfo" />
            </SvgHoverButton>
            {!user.verify_email && (
              <div>
                <NormalButton
                  className="float-left"
                  onClick={setVerifyEmailPopUpState}>
                  인증하기
                </NormalButton>
              </div>
            )}
          </div>
          <hr className="h-px bg-gray-600 border-0 clear-both" />
          <EmailDialog originalEmail={user.email} />
        </div>

        <VerifyEmailDialog email={user.email} />
        <div className="mt-4 w-2/6">
          <Label>전화번호</Label>
          <div>
            <div className="inline-block">
              <NormalText className="justify-start">{user.phone}</NormalText>
            </div>
            <SvgHoverButton onClick={setPhonePopUpState}>
              <StyleComponent content="FixInfo" />
            </SvgHoverButton>
          </div>
          <hr className="h-px bg-gray-600 border-0 clear-both" />

          <PhoneDialog originalPhone={user.phone} />
        </div>
      </div>
    </div>
  );
};
