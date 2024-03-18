import { ImageDialog } from '@shared/components/Popup/Popup';
import {
  ImageUploadButton,
  NormalText,
  SecondHead,
} from '@shared/components/styles/Public.styles';
import { verifyFrame } from '../button-frames/UserImageFrame';
import { VerifyList } from './Info/VerifyList';

export const UserBaseComponent = user => {
  const frame = verifyFrame(user);
  return (
    <div>
      <ImageUploadButton
        onClick={setImagePopUpState}
        className="object-cover w-46 h-26">
        <img
          src={image_link}
          className="hover:opacity-60 object-scale-down rounded-lg rounded-lg"
          alt="my profile"
        />
      </ImageUploadButton>
      <ImageDialog />

      <SecondHead className="mt-3">{user.username}</SecondHead>
      <NormalText className="underline">{user.school}</NormalText>
      {Object.keys(frame).map(k => {
        <VerifyList k={k} v={frame[k]} />;
      })}
    </div>
  );
};
