import styled from "styled-components";
import tw from "twin.macro";

export const reservation_cancel_button = styled.button`
${tw`bg-white hover:bg-gray-100 text-[#F62424] font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg`}
`

export const reservation_detail_button = styled.button`
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
&:hover {
  background-color: rgb(229 231 235);
  color: rgb(17 24 39)
}
${tw`bg-white text-black font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg ml-4 mb-3`}
`

export const input_checkbox = styled.input`
${tw`mr-1 w-4 h-4 text-blue-600`}
`

export const put_button = styled.button`
position: relative;
float: right;
&:hover {
  background-color: rgb(229 231 235);
  color: rgb(17 24 39)
}
${tw`bg-white font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg mb-3 mr-3`}
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
  background-color: rgb(229 231 235);
  color: rgb(17 24 39)
}
${tw`bg-black float-end text-white font-semibold py-1 px-2 border border-gray-200 shadow-xl rounded-lg`}
`


export const post_detail_button = styled.button`
${tw`bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg`}
`