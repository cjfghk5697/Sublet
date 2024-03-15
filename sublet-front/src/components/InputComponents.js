import * as s from './styles/Public.styles';
import styled from 'styled-components';
import tw from 'twin.macro';

export const InputText = ({ name, placeholder, onChange, value }) => {
  return (
    <s.InputText
      name={name}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required
    />
  );
};

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
