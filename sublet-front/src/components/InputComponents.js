import * as s from './styles/Public.styles';
import styled from 'styled-components';
import tw from 'twin.macro';

export const InputText = styled.input`
  ${tw`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
`; // InputComponents.js 로 이동.

export const InputEmail = ({ emailFormatState, onChange, emailState }) => {
  return emailFormatState ? (
    <s.InputText
      type="email"
      name="emailState"
      placeholder="이메일"
      onChange={onChange}
      value={emailState}
      required
    />
  ) : (
    <s.InputTextError
      type="email"
      name="emailState"
      placeholder="이메일"
      onChange={onChange}
      value={emailState}
      required
    />
  );
};

export const InputTelePhone = ({ onChange, phoneState }) => {
  return (
    <s.InputText
      maxlength="13"
      type="tel"
      name="phoneState"
      placeholder="전화번호"
      onChange={onChange}
      value={phoneState
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/(\-{1,2})$/g, '')}
      required
    />
  );
};

export const InputPassword = ({ onChange, passwordState }) => {
  return (
    <s.InputText
      type="password"
      name="passwordState"
      placeholder="비밀번호"
      onChange={onChange}
      value={passwordState}
      required
    />
  );
};
