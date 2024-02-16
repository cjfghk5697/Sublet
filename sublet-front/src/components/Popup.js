import { useRef, useState } from "react";
import * as s from './styles/SummaryBlock.styles.js'
import './styles/Popup.styles.css'
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { FetchImage } from "./FetchList";

import { guestInfoPopUpStore } from "./store/guestInfoStore.js";
import { Alert } from "./StaticComponents.js";

export function ImageDialog() {
  const [putState, setPutState] = useState(true)
  const { setImagePopUpState, imagePopUpState } = guestInfoPopUpStore((state) => ({
    setImagePopUpState: state.setImagePopUpState,
    imagePopUpState: state.imagePopUpState,
  }))
  const [imgFile, setImgFile] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const imgRef = useRef();

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    setImageUpload(file)
  };

  const handleClose = () => setImagePopUpState(false);
  const formData = new FormData();
  formData.append('file', imageUpload);


  const putHandled = async () => {
    FetchImage(formData)
    setPutState(false)
    setImagePopUpState(false)
  };

  return (
    <>
      <Dialog open={imagePopUpState} className="border border-gray-300 shadow-xl rounded-lg">
        <DialogContent className='font-black text-center'>
          {imgFile ? (<img src={imgFile} alt="프로필 이미지" />) :
            (<div className="flex items-center justify-center w-full">
              <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden"
                  onChange={saveImgFile}
                  ref={imgRef}
                />
              </label>
            </div>)
          }
        </DialogContent>
        <div className='mt-5'>
          <s.back_button onClick={handleClose} className="">
            나가기
          </s.back_button>
          {putState ? (<s.delete_button_able onClick={putHandled} >
            업로드하기
          </s.delete_button_able>) : (<s.delete_button_disabled disabled>
            업로드하기
          </s.delete_button_disabled>)}
        </div>
      </Dialog>

    </>
  );
}

export function EmailDialog({ originalEmail }) {
  const { setEmailPopUpState, emailPopUpState } = guestInfoPopUpStore((state) => ({
    setEmailPopUpState: state.setEmailPopUpState,
    emailPopUpState: state.emailPopUpState,
  }))

  const handleClose = () => confirmAction();
  // useConfirm("닫으시겠습니까?", setShow(true), setShow(false))

  const confirmAction = () => {
    if (window.confirm('닫으시겠습니까?')) {
      setEmailPopUpState(false);
    } else {
      setEmailPopUpState(true);
    }
  }
  const [emailState, setEmailState] = useState(originalEmail)

  const emailChange = (e) => {
    setEmailState(e.target.value)
  }
  const emailHandled = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailState
      })
    };

    await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/update`
        , requestOptions)
    ).json();

  };

  return (
    <>
      <Dialog open={emailPopUpState} className="border border-gray-300 shadow-xl rounded-lg">
        <DialogContent className='text-center'>
          <s.close_button type="button" className='float-right'>
            <svg class="h-6 w-6" onClick={handleClose} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </s.close_button>
          <form>
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 float-left">Email address</label>
            <input type="email" id="email" onChange={emailChange} value={emailState} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
          </form>
        </DialogContent>
        <div className='mt-2'>
          <s.put_button onClick={emailHandled} >
            수정하기
          </s.put_button>
        </div>
      </Dialog>
    </>
  );
}

export function PhoneDialog({ originalPhone }) {
  const { setPhonePopUpState, phonePopUpState } = guestInfoPopUpStore((state) => ({
    setPhonePopUpState: state.setPhonePopUpState,
    phonePopUpState: state.phonePopUpState,
  }))
  const confirmAction = () => {
    if (window.confirm('닫으시겠습니까?')) {
      setPhonePopUpState(false);
    } else {
      setPhonePopUpState(true);
    }
  }
  const handleClose = () => confirmAction();

  const [phoneState, setPhoneState] = useState(originalPhone)

  const phoneChange = (e) => {
    setPhoneState(e.target.value)
  }

  const phoneHandled = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: phoneState
      })
    };

    await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/update`
        , requestOptions)
    ).json();
    setPhonePopUpState(false)

  };
  return (
    <>
      <Dialog open={phonePopUpState} className="border border-gray-300 shadow-xl rounded-lg">
        <DialogContent className='text-center'>
          <s.close_button type="button" className='float-right'>
            <svg class="h-6 w-6" onClick={handleClose} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </s.close_button>
          <form>
            <label for="tel" class="block mb-2 text-sm font-medium text-gray-900 float-left">Phone number</label>
            <input type="tel" id="tel" onChange={phoneChange} value={phoneState} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
          </form>

        </DialogContent>
        <div className='mt-2'>
          <s.put_button onClick={phoneHandled} >
            수정하기
          </s.put_button>
        </div>
      </Dialog>
    </>
  );
}

export function ShareDialog({ content }) {
  const copyLinkRef = useRef();
  const pageLink = window.location.href
  const [backUp, setBackUp] = useState(false)
  const copyTextUrl = () => {
    copyLinkRef.current.focus();
    copyLinkRef.current.select();
    setBackUp(true)
    navigator.clipboard.writeText(copyLinkRef.current.value)
  }
  return (
    <>
      <input type="text" ref={copyLinkRef} value={pageLink} />
      <s.black_upload_button onClick={copyTextUrl}>복사하기</s.black_upload_button>
      {backUp && <Alert />}
    </>
  )
  // 선택 후 복사
}
