import styled from "styled-components";
import tw from "twin.macro";

export const input_text = styled.input`
${tw`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
`

export const fetch_button = styled.button`
${tw`flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5`}
`

export const label = styled.label`
${tw`block text-sm font-medium leading-6 text-gray-900 ml-1`}
`

export const start_div = styled.label`
${tw`flex min-h-full flex-col justify-center px-6 py-12 lg:px-8`}
`

export const forget_password = styled.a`
${tw`font-semibold text-gray-400 hover:text-indigo-600`}
`

export const close_button = styled.button`
${tw`bg-white rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500`}
`
