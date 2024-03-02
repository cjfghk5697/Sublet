import styled from "styled-components";
import tw from "twin.macro";

export const delete_button_able = styled.button`
position: relative;
margin-right: 12px;
float: right;
${tw`bg-[#F62424] hover:bg-red-700 text-white font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg`}
`

export const delete_button_disabled = styled.button`
position: relative;
margin-right: 12px;
float: right;
${tw`bg-gray-400 font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg`}
`


export const input_checkbox = styled.input`
${tw`mr-1 w-4 h-4 text-blue-600`}
`

export const image_upload_button = styled.button`
display: flex;
align-items: center;
${tw`shadow-xl rounded-lg ml-4`}
`

export const change_button = styled.button`
${tw`bg-white hover:bg-gray-100 text-black font-semibold float-right py-1 px-1 rounded-lg ml-4`}
`

export const black_upload_button = styled.button`

&:hover {
  background-color: rgb(156 163 175);
  color: rgb(17 24 39)
}
${tw`bg-black clear-both float-end text-white font-semibold py-1 px-2 border border-gray-200 shadow-xl rounded-lg`}
`
export const black_upload_button_disabled = styled.button`
${tw`bg-gray-400 float-end text-black font-semibold py-1 px-2 border border-gray-200 shadow-xl rounded-lg`}
`

export const post_detail_button = styled.button`
${tw`bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg`}
`
export const input_text_without_block = styled.input`
${tw`rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
`

export const label = styled.label`
${tw`block mb-0.5 text-sm font-semibold text-gray-900`}
`

export const forget_password = styled.a`
${tw`font-semibold text-gray-400 hover:text-indigo-600`}
`

export const justify_block = styled.div`
${tw`font-semibold flex justify-between`}
`

export const info_text = styled.p`
${tw`font-light text-gray-600 text-xs`}
`