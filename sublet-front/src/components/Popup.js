import { useRef, useState } from "react";
import * as s from './styles/SummaryBlock.styles.js'
import * as w from './styles/Wrapper.style.js'
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { FetchImage, FetchLogin, SignUp } from "./FetchList";

import { guestInfoPopUpStore } from "./store/guestInfoStore.js";
import { Alert, Information, StyleComponent, FailAlert, checkEmailFormat } from "./StaticComponents.js";
import { DialogTitle, DialogActions, FormControlLabel, Radio, RadioGroup, Checkbox, FormGroup, FormControl, Select, MenuItem } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleButton } from "./loginComponents/Google.js"
import NaverLogin from "./loginComponents/Naver.js";
import { VerifyEmailComponents } from "./verifyComponents/Email.js";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

export function ImageDialog() {
  const { setImagePopUpState, imagePopUpState } = guestInfoPopUpStore((state) => ({
    setImagePopUpState: state.setImagePopUpState,
    imagePopUpState: state.imagePopUpState,
  }))
  const [imgFile, setImgFile] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const imgRef = useRef();

  const [successState, setSuccessState] = useState(false)
  const [failState, setFailState] = useState(false)

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

  const handleClose = () => {
    setImagePopUpState(true)
    setImgFile("")
  };
  const formData = new FormData();
  formData.append('file', imageUpload);


  const putHandled = async () => {

    FetchImage(formData).then(response => {
      if (!response.ok) {
        // create error object and reject if not a 2xx response code
        let err = new Error("HTTP status code: " + response.status)
        err.response = response
        err.status = response.status
        setFailState(true)
        setTimeout(() => {
          setFailState(false)
        }, 5000);
      } else {
        setSuccessState(true)
        setTimeout(() => {
          setSuccessState(false)
        }, 5000);

      }
    })
      .catch((err) => {
        setFailState(true)
        setTimeout(() => {
          setFailState(false)
        }, 5000);

      })

  }
  return (
    <>
      <Dialog open={imagePopUpState} className="border border-gray-300 shadow-xl rounded-lg">
        <DialogTitle>
          <s.change_button type="button" onClick={handleClose}>
            <StyleComponent
              content="CloseButton"
            />
          </s.change_button>
        </DialogTitle>

        <DialogContent sx={{ height: 324, width: 400 }} className='font-black text-center'>
          <div className="clear-both h-56 w-75 flex items-center justify-center">

            {imgFile ? (
              <img src={imgFile} alt="프로필 이미지" />
            ) : (
              <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100">
                <StyleComponent
                  content="ImageDrop"
                />

                <input id="dropzone-file" type="file" className="hidden"
                  onChange={saveImgFile}
                  ref={imgRef}
                />
              </label>
            )
            }

          </div>
          <div className='mt-8'>
            {imgFile !== "" ? (<s.black_upload_button onClick={putHandled} >
              업로드하기
            </s.black_upload_button>) : (<s.black_upload_button_disabled disabled>
              업로드하기
            </s.black_upload_button_disabled>)}

            <div>
              {successState && (
                <Alert />
              )}
              {failState && (
                < FailAlert />
              )}
            </div>

          </div>
        </DialogContent>


      </Dialog>

    </>
  );
}

export function VerifyEmailDialog({ email }) {
  const { setVerifyEmailPopUpState, verifyEmailPopUpState } = guestInfoPopUpStore((state) => ({
    setVerifyEmailPopUpState: state.setVerifyEmailPopUpState,
    verifyEmailPopUpState: state.verifyEmailPopUpState,
  }))

  const handleClose = () => setVerifyEmailPopUpState(false);

  return (
    <>
      <Dialog open={verifyEmailPopUpState} className="border border-gray-300 shadow-xl rounded-lg">
        <DialogTitle>
          <label for="VerifyEmail" className="block mb-2 text-sm font-medium text-gray-900 float-left">이메일 인증</label>

          <s.change_button type="button" onClick={handleClose}>
            <StyleComponent
              content="CloseButton"
            />
          </s.change_button>
        </DialogTitle>
        <DialogContent sx={{ height: 300, width: 300 }} className='text-center' >

          <VerifyEmailComponents
            email={email}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export function EmailDialog({ originalEmail }) {
  const { setEmailPopUpState, emailPopUpState } = guestInfoPopUpStore((state) => ({
    setEmailPopUpState: state.setEmailPopUpState,
    emailPopUpState: state.emailPopUpState,
  }))
  const [successState, setSuccessState] = useState(false)
  const [failState, setFailState] = useState(false)

  const handleClose = () => setEmailPopUpState(false);
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


    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/update`
      , requestOptions)
      .then(
        await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/verifyupdate`
          , {
            credentials: 'include',
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              verify_email: 'false'
            })
          })
      ).then(response => {
        if (!response.ok) {
          // create error object and reject if not a 2xx response code
          let err = new Error("HTTP status code: " + response.status)
          err.response = response
          err.status = response.status
          setFailState(true)
          setTimeout(() => {
            setFailState(false)
          }, 5000);
        } else {
          setSuccessState(true)
          setTimeout(() => {
            setSuccessState(false)
          }, 5000);

        }
      })
      .catch((err) => {
        setFailState(true)
        setTimeout(() => {
          setFailState(false)
        }, 5000);

      })
  };
  const clickHandle = () => {

    emailHandled()

  }
  return (
    <>
      <Dialog open={emailPopUpState} className="border border-gray-300 shadow-xl rounded-lg">
        <DialogTitle>
          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 float-left">Email address</label>

          <s.change_button type="button" onClick={handleClose}>
            <StyleComponent
              content="CloseButton"
            />
          </s.change_button>
        </DialogTitle>
        <DialogContent className='text-center' sx={{ height: 120, width: 312 }}>

          <form>
            <w.InputText type="email" id="email" onChange={emailChange} value={emailState} placeholder="john.doe@company.com" required />
          </form>

          <div className='mt-4'>
            <s.black_upload_button onClick={clickHandle} >
              수정하기
            </s.black_upload_button>
            <div>
              {successState && (
                <Alert />
              )}
              {failState && (
                <FailAlert />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );

}

export function PhoneDialog({ originalPhone }) {
  const { setPhonePopUpState, phonePopUpState } = guestInfoPopUpStore((state) => ({
    setPhonePopUpState: state.setPhonePopUpState,
    phonePopUpState: state.phonePopUpState,
  }))
  const [successState, setSuccessState] = useState(false)
  const [failState, setFailState] = useState(false)
  const handleClose = () => setPhonePopUpState(false);

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


    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/update`
      , requestOptions)
      .then(response => {
        if (!response.ok) {
          // create error object and reject if not a 2xx response code
          let err = new Error("HTTP status code: " + response.status)
          err.response = response
          err.status = response.status
          setFailState(true)
          setTimeout(() => {
            setFailState(false)
          }, 5000);
        } else {
          setSuccessState(true)
          setTimeout(() => {
            setSuccessState(false)
          }, 5000);
        }
      })
      .catch((err) => {
        setFailState(true)
        setTimeout(() => {
          setFailState(false)
        }, 5000);

      })
  };
  const clickHandle = () => {
    phoneHandled()
  }
  return (
    <>
      <Dialog open={phonePopUpState} className="border border-gray-300 shadow-xl rounded-lg">
        <DialogTitle>
          <label for="tel" class="block mb-2 text-sm font-medium text-gray-900 float-left">Phone number</label>

          <s.change_button type="button" onClick={handleClose}>
            <StyleComponent
              content="CloseButton"
            />
          </s.change_button>
        </DialogTitle>
        <DialogContent sx={{ height: 120, width: 312 }} className='text-center'>

          <form>
            <w.InputText type="tel" id="tel" onChange={phoneChange} value={phoneState} placeholder="john.doe@company.com" required />
          </form>
          <div className='mt-4'>
            <s.black_upload_button onClick={clickHandle} >
              수정하기
            </s.black_upload_button>
            <div>
              {successState && (
                <Alert />
              )}
              {failState && (
                <FailAlert />
              )}
            </div>
          </div>
        </DialogContent>

      </Dialog>
    </>
  );
}

export function ShareDialog({ content }) {
  /*          
  <Dialog open={sharePopUpState} className="border border-gray-300 shadow-xl rounded-lg">
            <DialogContent sx={{ height: 224 }} className='text-left'>
              <form className="flot-right">
                <s.change_button type="button" name="sharePopUpState" onClick={onChange}>
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </s.change_button>
              </form>
 
              <ShareDialog content="localhost" className="clear-both" />
            </DialogContent >
          </Dialog> 
          */
  const copyLinkRef = useRef();
  const pageLink = window.location.href
  const [backUp, setBackUp] = useState(false)
  const copyTextUrl = () => {
    copyLinkRef.current.focus();
    setBackUp(true)
    navigator.clipboard.writeText(copyLinkRef.current.value)
    setTimeout(() => {
      setBackUp(false)
    }, 5000);
  }
  return (
    <div className="z-10 inline-block mr-6">
      <div clssName="">
        <w.SecondHead>숙소를 공유하세요!</w.SecondHead>
        <p className="text-base text-gray"> 복사하여 편하게 보내세요</p>
      </div>
      <div className="mt-2">
        <s.input_text_without_block type="text" className="inline-block ring-1 ring-inset ring-gray-300 border border-slate-300 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" ref={copyLinkRef} value={content} />
        <s.black_upload_button className="ml-2" onClick={copyTextUrl}>복사하기</s.black_upload_button>
      </div>
      <div className="mt-4 center">
        {backUp && (
          <Alert />
        )}
      </div>
    </div >
  )
  // 선택 후 복사
}

export function RequestSummaryDetailDialog({ request_text, address, contract, accomodation_type, pay, start_date, end_date }) {
  const info_list = {
    '숙소 유형': accomodation_type,
    '요금': pay,
    '체크인': start_date,
    '체크아웃': end_date,
    '요청사항': request_text
  }
  return (
    <>
      <w.SecondHead>{address} </w.SecondHead>

      <w.Horizon />
      {
        contract ?
          (<p>계약된 매물만 확인</p>) :
          (<p>계약 안된 매물도 확인</p>)
      }
      {
        Object.keys(info_list).map((k => (
          <Information title={k}
            info={info_list[k]} />
        )))
      }
    </>
  )
}

export function PostSummaryDetailDialog({ title, contract, private_post, accomodation_type, post_date, pay, address }) {
  const info_list = {
    '숙소 유형': accomodation_type,
    '게시일': post_date,
    '요금': pay,
    '주소': address,
  }
  return (
    <>
      <div className="inline-block">
        <w.SecondHead className="float-start mr-4">{title} </w.SecondHead>
        {contract ?
          (
            <StyleComponent
              content="VerifyRoom" />
          ) :
          (
            <StyleComponent
              content="UnverifyRoom" />
          )}
      </div>
      {private_post ? <p className="font-sm text-black font-bold">공개</p>
        : <p className="font-sm text-gray-600 font-bold">비공개</p>}
      {/* 공개 변경 버튼 추가 */}
      <hr className="h-px bg-gray-200 border-0" />
      {Object.keys(info_list).map((k => (
        <Information title={k}
          info={info_list[k]} />
      )))}
    </>
  )
}

export function SignUpDialog() {
  const { signUpPopUpState, setSignUpPopUpState } = guestInfoPopUpStore((state) => ({
    setSignUpPopUpState: state.setSignUpPopUpState,
    signUpPopUpState: state.signUpPopUpState,
  }))
  const [emailFormatState, setEmailFormatState] = useState(true)

  const [inputs, setInputs] = useState({
    idState: '',
    passwordState: '',
    userNameState: '',
    emailState: '',
    phoneState: '',
    schoolState: '고려대학교',
    genderState: '여',
    studentIdState: '24',
    jobState: '학생',
  })
  const [birthState, setBirthState] = useState(Date.now());
  const {
    idState,
    passwordState,
    userNameState,
    emailState,
    phoneState,
    schoolState,
    genderState,
    studentIdState,
    jobState,
  } = inputs;

  const inputHandle = (e) => {
    if (e.currentTarget.name === "emailState") {
      setEmailFormatState(checkEmailFormat(e.currentTarget.value, schoolState))

    }
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  const signUpHandled = () => {
    const birth = new Date(birthState)
    if (checkEmailFormat(emailState, schoolState)) {
      setEmailFormatState(true)
      SignUp({
        user_id: idState,
        password: passwordState,
        username: userNameState,
        email: emailState,
        phone: phoneState.replace(/-/gi, '').replace('010', '+8210'),
        school: schoolState,
        gender: genderState,
        jobState: jobState,
        birth: birth.toISOString(),
        student_id: Number(studentIdState)
      })
      setSignUpPopUpState()
    } else {
      console.log('잘못된 이메일 양식입니다.', emailFormatState)
      setEmailFormatState(false)
    }

  };

  return (
    <>
      <Dialog open={signUpPopUpState} className="border border-gray-300 shadow-xl rounded-lg">
        <DialogTitle>
          <s.change_button type="button" onClick={setSignUpPopUpState}>
            <StyleComponent
              content='CloseButton' />
          </s.change_button>
          <div className="float-left">
            <w.SecondHead>회원가입</w.SecondHead>
          </div>

        </DialogTitle>
        <DialogContent>
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <s.justify_block>
              <div>
                <s.label for="id">아이디</s.label>
                <div class="mt-2">
                  <w.InputText name="idState" type="text" placeholder="아이디" onChange={inputHandle} value={idState} required />
                </div>
              </div>

              <div className="ml-2">
                <s.label for="password">패스워드</s.label>
                <div class="mt-2">
                  <w.InputText type="password" name="passwordState" placeholder="비밀번호" onChange={inputHandle} value={passwordState} required />
                </div>
              </div>

            </s.justify_block>

            <div>
              <div class="mt-2 flex items-center justify-between">
                <s.label for="username">별명</s.label>
              </div>
              <div class="mt-2">
                <w.InputText type="text" name="userNameState" placeholder="별명" onChange={inputHandle} value={userNameState} required />
              </div>
            </div>
            <div>
              <div class="mt-2 flex items-center justify-between">
                <s.label for="password">생년월일</s.label>
              </div>
              <div class="mt-2">
                <LocalizationProvider dateAdapter={AdapterDayjs} required>
                  <DatePicker name="birthState" onChange={(newDate) => setBirthState(newDate)} value={dayjs(birthState)} />
                </LocalizationProvider>
              </div>
            </div>

            <div>
              <div class="mt-2 flex items-center justify-between">
                <s.label for="phone">전화번호</s.label>
              </div>
              <div class="mt-2">
                <w.InputText maxlength="13" type="tel" name="phoneState" placeholder="전화번호"
                  onChange={inputHandle}
                  value={phoneState
                    .replace(/[^0-9]/g, '')
                    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
                    .replace(/(\-{1,2})$/g, "")}
                  required />
              </div>
            </div>

            <w.Horizon className="mt-2" />

            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                defaultValue="학생"
                name="jobState"
                value={jobState}
                onChange={inputHandle}
                required>
                <FormControlLabel value="학생" control={<Radio />} label="학생" />
                <FormControlLabel value="사업자" control={<Radio />} label="사업자" />
              </RadioGroup>
            </FormControl>
            {jobState === "학생" ? (
              <>

                <div>
                  <div class="mt-2 flex items-center justify-between">
                    <s.label for="university">대학교</s.label>
                  </div>
                  <div class="mt-2">
                    {/* <w.InputText type="text" name="schoolState" placeholder="대학교" onChange={inputHandle} value={schoolState} required /> */}
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={schoolState}
                      label="대학교 *"
                      onChange={inputHandle}
                    >
                      <MenuItem value="고려대학교">고려대학교</MenuItem>
                    </Select>
                  </div>
                </div>
                <div>
                  <div class="mt-2 flex items-center justify-between">
                    <s.label for="studentId">학번</s.label>
                  </div>
                  <div class="mt-2">
                    <w.InputText type="tel" maxlength="2" name="studentIdState" placeholder="학번" onChange={inputHandle} value={studentIdState} required />
                  </div>
                </div>
                <div>
                  <div class="mt-2 flex items-center justify-between">
                    <s.label for="email">대학교 이메일</s.label>
                  </div>
                  <div class="mt-2">
                    {emailFormatState ?
                      <>
                        <w.InputText type="email" name="emailState" placeholder="이메일" onChange={inputHandle} value={emailState} required />

                      </>
                      :
                      <>
                        <w.InputTextError type="email" name="emailState" placeholder="이메일" onChange={inputHandle} value={emailState} required />
                        <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          대학교 이메일 양식이 안맞습니다.
                        </span>
                      </>

                    }
                  </div>
                </div>
              </>) :
              (
                <>
                  <div>
                    <div class="mt-2 flex items-center justify-between">
                      <s.label for="university">업체명</s.label>
                    </div>
                    <div class="mt-2">
                      {/* <w.InputText type="text" name="schoolState" placeholder="대학교" onChange={inputHandle} value={schoolState} required /> */}
                      <w.InputText type="text" name="schoolState" placeholder="업체명" required />
                    </div>
                  </div>
                  <div>
                    <div class="mt-2 flex items-center justify-between">
                      <s.label for="email">이메일</s.label>
                    </div>
                    <div class="mt-2">
                      {emailFormatState ?
                        <w.InputText type="email" name="emailState" placeholder="이메일" onChange={inputHandle} value={emailState} required />
                        :
                        <w.InputTextError type="email" name="emailState" placeholder="이메일" onChange={inputHandle} value={emailState} required />}

                    </div>
                  </div>
                </>
              )}


            <div>
              <div class="mt-2 flex items-center justify-between">
                <s.label for="gender">성별</s.label>
              </div>
              <div class="mt-2">

                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    defaultValue="여"
                    name="genderState"
                    value={genderState}
                    onChange={inputHandle}
                    required>
                    <FormControlLabel value="여" control={<Radio />} label="여" />
                    <FormControlLabel value="남" control={<Radio />} label="남" />
                  </RadioGroup>
                </FormControl>

              </div>
            </div>

          </div>
        </DialogContent>
        <DialogActions>
          <s.black_upload_button type="submit" onClick={signUpHandled} className="flex w-full justify-center my-2">
            회원가입
          </s.black_upload_button>

        </DialogActions>
      </Dialog>
    </>
  )
}

export function LoginDialog() {
  const { setSignUpPopUpState } = guestInfoPopUpStore((state) => ({
    setSignUpPopUpState: state.setSignUpPopUpState,
  }))

  const [inputs, setInputs] = useState({
    idState: '',
    passwordState: '',
  })

  const { idState, passwordState } = inputs;

  const inputHandle = (e) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  const [popUpState, setPopUpState] = useState(false)

  const loginHandled = () => {
    const id = idState
    const password = passwordState
    FetchLogin({ id, password })
    setPopUpState(false)
  };

  const signUpHandled = () => {
    setPopUpState(false)
    setSignUpPopUpState(true)
  }

  const idList = {
    "google": process.env.REACT_APP_GOOGLE_CLIENT_ID,
  }

  return (
    <div>
      <button onClick={() => { setPopUpState(!popUpState) }}>Login</button>
      <Dialog open={popUpState} className="border border-gray-300 shadow-xl rounded-lg">
        <DialogTitle>
          <s.change_button type="button" onClick={() => { setPopUpState(!popUpState) }}>
            <StyleComponent
              content='CloseButton' />
          </s.change_button>
        </DialogTitle>
        <DialogContent>
          <div className="float-left">
            <w.SecondHead>로그인</w.SecondHead>
            <p className="text-base text-gray"> 합리적인 가격의 다양한 집을 확인하세요.</p>
          </div>
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <s.label for="id">Id</s.label>
              <div class="mt-2">
                <w.InputText required="" name="idState" type="text" placeholder="아이디" onChange={inputHandle} value={idState} />
              </div>
            </div>

            <div>
              <div class="mt-2 flex items-center justify-between">
                <s.label for="password">Password</s.label>
                <div class="text-sm">
                  <s.forget_password href="#">Forgot password?</s.forget_password>
                </div>
              </div>
              <div class="mt-2">
                <w.InputText type="password" name="passwordState" placeholder="비밀번호" onChange={inputHandle} value={passwordState} />
              </div>
            </div>
          </div>


          <div>
            <s.black_upload_button type="submit" onClick={loginHandled} className="flex w-full justify-center mt-5">
              로그인 하기
            </s.black_upload_button>
          </div>
          <div class="text-sm">
            <s.forget_password className="mt-2 ml-1 text-m font-bold" href="#" onClick={signUpHandled}>회원가입</s.forget_password>
          </div>
        </DialogContent>
        <w.Horizon />
        <DialogActions>
          <div className="w-4/5 h-4/5">
            <div>
              <GoogleOAuthProvider clientId={idList.google}>
                <GoogleButton />
              </GoogleOAuthProvider>
            </div>

            <div className="my-4 w-40"  >
              <NaverLogin />
            </div>
          </div>

        </DialogActions>



      </Dialog >
      <SignUpDialog />

    </div >
  )
}
