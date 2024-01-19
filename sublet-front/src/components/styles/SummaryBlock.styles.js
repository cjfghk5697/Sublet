import styled from "styled-components";
import tw from "twin.macro";

export const block_cancel_button = styled.button`
${tw`bg-white hover:bg-gray-100 text-[#F62424] font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg`}
`
export const block_detail_button = styled.button`
${tw`bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg ml-4`}
`

export const delete_button_able = styled.button`
position: relative;
margin-right: 12px;
float: right;
${tw`bg-[#F62424] hover:bg-red-700 text-white font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg mb-3`}
`

export const delete_button_disabled = styled.button`
position: relative;
margin-right: 12px;
float: right;
${tw`bg-gray-400 font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg`}
`

export const back_button = styled.button`
position: relative;
float: left;
${tw`bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg ml-4 mb-3`}
`
export const input_checkbox = styled.input`
${tw`mr-1 w-4 h-4 text-blue-600`}
`