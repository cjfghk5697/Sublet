import { styled } from "styled-components";
import tw from "twin.macro";

export const SecondHead = styled.h2`
${tw`text-2xl font-extrabold`}
`
export const Horizon = styled.hr`
${tw`h-px bg-gray-200 border-0 dark:bg-gray-700 clear-both`}
`
export const DetailParagraph = styled.p`
${tw`ml-3 text-lg font-medium`}
`

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;
