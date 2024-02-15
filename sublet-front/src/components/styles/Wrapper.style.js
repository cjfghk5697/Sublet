import { styled } from "styled-components";
import tw from "twin.macro";

export const SecondHead = styled.h2`
${tw`text-2xl font-extrabold`}
`
export const Horizon = styled.hr`
${tw`h-px bg-gray-200 border-0 dark:bg-gray-700`}
`

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;
