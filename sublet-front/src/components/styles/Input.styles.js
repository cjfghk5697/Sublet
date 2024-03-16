import styled from 'styled-components';
import tw from 'twin.macro';
import * as s from './Public.styles';

export const InputTextCss = styled.input`
  ${tw`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
`; // InputComponents.js 로 이동.

export const InputTextErrorCss = styled.input`
  ${tw`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-600 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6`}
`; // InputComponents.js 로 이동.

export const displayFilteringValueWhenModifyingFilter = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1em;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 1);
`;

export const InputText = ({ name, placeholder, onChange, value }) => {
  return (
    <InputTextCss
      name={name}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required
    />
  );
};

export const InputEmail = ({ emailFormatState, onChange, value }) => {
  return emailFormatState ? (
    <InputTextCss
      type="email"
      name="emailState"
      placeholder="이메일"
      onChange={onChange}
      value={value}
      required
    />
  ) : (
    <s.InputTextError
      type="email"
      name="emailState"
      placeholder="이메일"
      onChange={onChange}
      value={value}
      required
    />
  );
};

export const InputTelePhone = ({ onChange, value }) => {
  return (
    <s.InputText
      maxlength="13"
      type="tel"
      name="phoneState"
      placeholder="전화번호"
      onChange={onChange}
      value={value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/(\-{1,2})$/g, '')}
      required
    />
  );
};

export const InputPassword = ({ onChange, value }) => {
  return (
    <s.InputText
      type="password"
      name="passwordState"
      placeholder="비밀번호"
      onChange={onChange}
      value={value}
      required
    />
  );
};
export const InputStudentId = ({ onChange, value }) => {
  return (
    <s.InputText
      type="tel"
      maxlength="2"
      name="studentIdState"
      placeholder="학번"
      onChange={inputHandle}
      value={studentIdState}
      required
    />
  );
};
