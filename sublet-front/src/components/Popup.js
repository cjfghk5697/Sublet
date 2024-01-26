import { useRef, useState } from "react";
import * as s from './styles/SummaryBlock.styles.js'
import './styles/Popup.styles.css'
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';

export function Reservation_Dialog({ main_text, sub_text, key_num }) {
  const [show, setShow] = useState(true);
  const [checkState, setCheckState] = useState(false)
  const [deleteState, setDeleteState] = useState(true)

  const handleClose = () => setShow(false);

  const checkHandled = () => {
    setCheckState(!checkState)
  }

  const deleteHandled = async () => {

    const requestOptions = {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: key_num
      })
    };

    await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/reservation`
        , requestOptions)
    ).json();
    setDeleteState(false)

  };

  return (
    <>
      {deleteState && (
        <Dialog open={show} className="border border-gray-300 shadow-xl rounded-lg">
          <DialogContent className='font-black text-center'>
            <p className="text-lg font-extrabold mt-3">{main_text}</p>
            <div>
              <p className="mt-3  font-medium">
                <s.input_checkbox type="checkbox" checked={checkState} onChange={checkHandled} />
                {sub_text}
              </p>
            </div>
          </DialogContent>
          <div className='mt-5'>
            <s.back_button onClick={handleClose} className="">
              나가기
            </s.back_button>
            {checkState ? (<s.delete_button_able onClick={deleteHandled} >
              취소하기
            </s.delete_button_able>) : (<s.delete_button_disabled disabled>
              취소하기
            </s.delete_button_disabled>)}
          </div>
        </Dialog>
      )}
    </>
  );
}

export function Image_Dialog() {
  const [show, setShow] = useState(true);
  const [putState, setPutState] = useState(true)

  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const handleClose = () => setShow(false);

  const formData = new FormData();
  formData.append('file', imgFile);

  const putHandled = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'PUT',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData
    };

    await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/image`
        , requestOptions)
    ).json();
    setPutState(false)

  };

  return (
    <>
      {putState && (
        <Dialog open={show} className="border border-gray-300 shadow-xl rounded-lg">
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
      )}
    </>
  );
}