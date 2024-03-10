import { useEffect, useRef, useState } from "react";
import * as s from './styles/SummaryBlock.styles.js'
import * as w from './styles/Wrapper.style.js'
import * as psd from "./styles/PostUploadDialog.styles.js";
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { FetchImage, FetchLogin, SignUp, GetMyUser } from "./FetchList";

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

import {
  TextInputTag,
  TextAreaTag,
  NumberInputTag,
} from "./Input/TextInputTag.js";
import DropBoxSelect from "./Input/DropBoxSelect.js";
import { DoubleSlideInput } from "./Input/DoubleSlideInput.js";
import { SingleSlideInput } from "../components/Input/SingleSlideInput.js";
import * as ValueViewer from "../components/Input/ValueViewer.js";
import Map from '../components/Map.js';
import { LocationInput } from "../components/Input/LocationInput.js";
import { DoubleDatePicker } from "./Input/DoubleDatePicker.js";
import { priceToString } from "../components/StaticComponents.js";
import { ImageUploadComponent } from "./Input/ImageInput.js";
import { ValueRangeViewer } from "./Input/ValueViewer.js"
import { useUserInfoStore } from "../store/UserInfoStore.js";


export function ImageDialog() {
  const { setImagePopUpState, imagePopUpState } = guestInfoPopUpStore(
    (state) => ({
      setImagePopUpState: state.setImagePopUpState,
      imagePopUpState: state.imagePopUpState,
    })
  );
  const [imgFile, setImgFile] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const imgRef = useRef();

  const [successState, setSuccessState] = useState(false)
  const [failState, setFailState] = useState(false);

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    setImageUpload(file);
  };

  const handleClose = () => {
    setImagePopUpState(true);
    setImgFile("");
  };
  const formData = new FormData();
  formData.append("file", imageUpload);

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
      <Dialog
        open={imagePopUpState}
        className="border border-gray-300 shadow-xl rounded-lg"
      >
        <DialogTitle>
          <s.change_button type="button" onClick={handleClose}>
            <StyleComponent
              content="CloseButton"
            />
          </s.change_button>
        </DialogTitle>

        <DialogContent
          sx={{ height: 324, width: 400 }}
          className="font-black text-center"
        >
          <div className="clear-both h-56 w-75 flex items-center justify-center">
            {imgFile ? (
              <img src={imgFile} alt="프로필 이미지" />
            ) : (
              <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100">
                <StyleComponent
                  content="ImageDrop"
                />

                <input accept='image/jpg, image/jpeg, image/png' id="dropzone-file" type="file" className="hidden"
                  onChange={saveImgFile}
                  ref={imgRef}
                />
              </label>
            )}
          </div>
          <div className="mt-8">
            {imgFile !== "" ? (
              <s.black_upload_button onClick={putHandled}>
                업로드하기
              </s.black_upload_button>
            ) : (
              <s.black_upload_button_disabled disabled>
                업로드하기
              </s.black_upload_button_disabled>
            )}

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
    setEmailState(e.target.value);
  };

  const emailHandled = async () => {
    const requestOptions = {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailState,
      }),
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
      <Dialog
        open={emailPopUpState}
        className="border border-gray-300 shadow-xl rounded-lg"
      >
        <DialogTitle>
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 float-left"
          >
            Email address
          </label>

          <s.change_button type="button" onClick={handleClose}>
            <StyleComponent
              content="CloseButton"
            />
          </s.change_button>
        </DialogTitle>
        <DialogContent className="text-center" sx={{ height: 120, width: 312 }}>
          <form>
            <w.InputText type="email" id="email" onChange={emailChange} value={emailState} placeholder="john.doe@company.com" required />
          </form>

          <div className="mt-4">
            <s.black_upload_button onClick={clickHandle}>
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

  const [phoneState, setPhoneState] = useState(originalPhone);

  const phoneChange = (e) => {
    setPhoneState(e.target.value);
  };

  const phoneHandled = async () => {
    const requestOptions = {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phoneState,
      }),
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
      <Dialog
        open={phonePopUpState}
        className="border border-gray-300 shadow-xl rounded-lg"
      >
        <DialogTitle>
          <label
            for="tel"
            class="block mb-2 text-sm font-medium text-gray-900 float-left"
          >
            Phone number
          </label>

          <s.change_button type="button" onClick={handleClose}>
            <StyleComponent
              content="CloseButton"
            />
          </s.change_button>
        </DialogTitle>
        <DialogContent sx={{ height: 120, width: 312 }} className="text-center">
          <form>
            <w.InputText type="tel" id="tel" onChange={phoneChange} value={phoneState} placeholder="john.doe@company.com" required />
          </form>
          <div className="mt-4">
            <s.black_upload_button onClick={clickHandle}>
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

export function ShareDialog({ description, title, image_id }) {

  const copyLinkRef = useRef();
  const [successState, setSuccessState] = useState(false)

  // 로컬 주소 (localhost 3000 같은거)
  const resultUrl = window.location.href;
  const { Kakao } = window;
  const imageUrl = `${process.env.REACT_APP_BACKEND_URL}/public/${image_id[0]}.jpg`
  // 재랜더링시에 실행되게 해준다.
  useEffect(() => {
    // init 해주기 전에 clean up 을 해준다.
    Kakao.cleanup();
    // 자신의 js 키를 넣어준다.
    Kakao.init(process.env.REACT_APP_KAKAO_JS);
  }, []);

  const shareKakao = () => {

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: description,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: resultUrl,
        },
      },
      buttons: [
        {
          title: title,
          link: {
            mobileWebUrl: resultUrl,
          },
        },
      ],
    });

  }


  const copyTextUrl = () => {
    copyLinkRef.current.focus();
    setSuccessState(true)
    navigator.clipboard.writeText(copyLinkRef.current.value)
    setTimeout(() => {
      setSuccessState(false)

    }, 5000);
  };
  return (
    <div className="z-10 inline-block mr-6">
      <div clssName="">
        <w.SecondHead>숙소를 공유하세요!</w.SecondHead>
        <p className="text-base text-gray"> 복사하여 편하게 보내세요</p>
      </div>
      <div className="mt-2">
        <s.input_text_without_block type="text" className="inline-block ring-1 ring-inset ring-gray-300 border border-slate-300 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" ref={copyLinkRef} value={resultUrl} />
        <s.black_upload_button className="ml-2" onClick={copyTextUrl}>복사하기</s.black_upload_button>
      </div>
      <div className="mt-2">
        <s.black_upload_button className="ml-2" onClick={() => { shareKakao() }}>카카오 공유하기</s.black_upload_button>
      </div>
      <div className="mt-4 center">
        {successState && (
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


    SignUp({
      user_id: idState,
      password: passwordState,
      username: userNameState,
      email: emailState,
      phone: phoneState.replace(/-/gi, '').replace('010', '+8210'),
      school: schoolState,
      gender: genderState,
      birth: birth.toISOString(),
      student_id: Number(studentIdState)
    })
    setSignUpPopUpState()
  };

  return (
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
  );
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

  const { setUserInfo } = useUserInfoStore();

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
    FetchLogin({ id, password, setUserInfo })
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
                  <s.forget_password href="/resetpassword">Forgot password?</s.forget_password>
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

export const PostUploadDialog = (props) => {
  const { setPostPopUpState, postPopUpState } = guestInfoPopUpStore(
    (state) => ({
      setPostPopUpState: state.setPostPopUpState,
      postPopUpState: state.postPopUpState,
    })
  );

  const { userInfo } = useUserInfoStore();
  const [accomodationType, setAccomodationType] = useState("");
  const [limitPeople, setLimitPeople] = useState(1);
  const [buildingType, setBuildingType] = useState("");
  const [numberBathroom, setNumberBathroom] = useState(1);
  const [numberRoom, setNumberRoom] = useState(1);
  const [numberBedroom, setNumberBedroom] = useState(1);
  const [title, setTitle] = useState("");
  const [basicInfo, setBasicInfo] = useState("");
  const [pos, setPos] = useState([37.574583, 126.994143]); // xCoordinate, yCoordinate // 추후 위치 기반으로 초기화.
  const [fullAddress, setFullAddress] = useState("테스트");
  const [city, setCity] = useState("서울"); // 테스트 데이터
  const [gu, setGu] = useState("은평구"); // 테스트 데이터
  const [dong, setDong] = useState("갈현동"); // 테스트 데이터
  const [street, setStreet] = useState("갈현로"); // 테스트 데이터
  const [streetNumber, setStreetNumber] = useState("39가길"); // 테스트 데이터
  const [postCode, setPostCode] = useState("123123"); // 테스트 데이터
  const [startEndDay, setStartEndDay] = useState([new Date(), new Date().setFullYear(new Date().getFullYear() + 1)]); // new Date().setFullYear(new Date().getFullYear() + 1) // 2024년 2월 29일에 누르면, 2025년 2월 30일이 나오지는 않는지 확인 필요. 
  const [duration, setDuration] = useState([1, 730]); // minDuration, maxDuration
  const [tempDuration, setTempDuration] = useState([duration[0] + "일", duration[1] + "일"])
  const [price, setPrice] = useState("10,000");
  const [imageFiles, setImageFiles] = useState([]);
  const [rule, setRule] = useState("규칙");
  const [benefit, setBenefit] = useState("혜택");
  const [refundPolicy, setRefundPolicy] = useState("환불정책");
  const [contract, setContract] = useState("계약"); // ?

  async function fetchUser() {
    const user = await GetMyUser();
    return user;
  }
  const user = fetchUser();

  const handleClose = () => confirmAction();

  const confirmAction = async () => {
    if (window.confirm("임시저장 하시겠습니까?")) {
      const formData = makeFormData();
      formData.append("local_save", true); // 임시저장 유무
      const requestOptions = {
        credentials: "include",
        method: "POST",
        body: formData,
      };

      await fetch(`${process.env.REACT_APP_BACKEND_URL}/post`, requestOptions)
        .then((res) => {
          console.log(res)
        });
      alert("임시 저장 되었습니다."); // if 문 비워두지 않기 위한 임시 alert
    }
    setPostPopUpState(false);
  };

  const makeFormData = () => {
    const formData = new FormData();

    // 모든 데이터가 적절히 입력되었는지 확인하고 아니라면 alert 띄워주기.
    formData.append("title", title);
    formData.append("price", price.replace(/,/gi, ""));
    formData.append("basic_info", basicInfo);
    formData.append("benefit", benefit);
    formData.append("end_day", (new Date()).toISOString());
    formData.append("min_duration", duration[0]);
    formData.append("max_duration", duration[1]);
    formData.append("position", fullAddress);
    formData.append("refund_policy", refundPolicy);
    formData.append("rule", rule);
    formData.append("start_day", (new Date()).toISOString());
    formData.append("limit_people", limitPeople);
    formData.append("number_room", numberRoom);
    formData.append("number_bathroom", numberBathroom);
    formData.append("number_bedroom", numberBedroom);
    formData.append("accomodation_type", accomodationType);
    formData.append("building_type", buildingType);
    formData.append("x_coordinate", pos[0]);
    formData.append("y_coordinate", pos[1]);
    formData.append("city", city);
    formData.append("gu", gu);
    formData.append("dong", dong);
    formData.append("street", street);
    formData.append("street_number", streetNumber);
    formData.append("post_code", postCode);
    formData.append("school", userInfo.school); // 사용자 정보에 따라서 해야함.
    formData.append("contract", true); // 계약 관련

    formData.append("description", "description"); // basic_info와 중복?
    formData.append("extra_info", "extra_info"); // basic_info와 중복?
    // formData.append("content", "content"); // ?
    // formData.append("category", "category"); // ?
    // formData.append("postuser_id", "test"); // 사용자 정보에 따라서 해야함.
    // formData.append("post_date", (new Date()).toISOString());
    // formData.append("images", imageFiles[0]);

    imageFiles.forEach((file, index) => {
      formData.append("images", file);
    });

    for (let [key, value] of formData.entries()) {
      // console.log(`${key}: ${value}`);
      if (value === "" || value === null || value === undefined) {
        return (null);
      }
    }

    return (formData);
  }

  const uploadPost = async () => {
    const formData = makeFormData();
    if (formData === null) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    formData.append("local_save", false);
    const requestOptions = {
      credentials: "include",
      method: "POST",
      body: formData,
    };

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/post`, requestOptions)
      .then((res) => {
        if (res.status === 201) {
          alert("게시되었습니다.");
          setPostPopUpState(false);
        }
        else {
          alert("게시에 실패했습니다.");
        }
      });

  };

  const handleLimitPeople = (event, newValue) => {
    setLimitPeople(newValue);
  };

  const handleNumberBathroom = (event, newValue) => {
    setNumberBathroom(newValue);
  };

  const handleNumberBedroom = (event, newValue) => {
    setNumberBedroom(newValue);
  };

  const handlePrice = (event) => {
    setPrice(priceToString(event.target.value.replace(/,/gi, "")));
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleBasicInfo = (event) => {
    setBasicInfo(event.target.value);
  };

  // const handleCity = (event) => {
  //   setCity(event.target.value);
  // }

  // const handleGu = (event) => {
  //   setGu(event.target.value);
  // }

  // const handleDong = (event) => {
  //   setDong(event.target.value);
  // }

  // const handleStreet = (event) => {
  //   setStreet(event.target.value);
  // }

  // const handleStreetNumber = (event) => {
  //   setStreetNumber(event.target.value);
  // }

  // const handlePostCode = (event) => {
  //   setPostCode(event.target.value);
  // }

  const handleSetImages = (newImage, index) => {
    const newImages = [...imageFiles];
    if (index >= imageFiles.length) {
      newImages.push(newImage);
    } else {
      newImages[index] = newImage;
    }
    setImageFiles(newImages);
  }

  const hadnleStartEndDay = (date1, date2) => {
    setStartEndDay([date1, date2]);
  }

  const handleDuration = (event, newValue) => {
    setDuration(newValue);
    setTempDuration([duration[0] + "일", duration[1] + "일"])
  };

  return (
    <>
      <Dialog
        open={postPopUpState}
        className="border border-gray-300 shadow-xl rounded-lg"
      >
        <DialogContent sx={{ width: "500px" }} className="text-center">
          <s.change_button type="button" className="float-right" onClick={handleClose}>
            <StyleComponent
              content="CloseButton"
            />
          </s.change_button>
          {/* <p>
            --------------추후 슬라이더로 변경 (현재는 스크롤)---------------
          </p> */}
          <div style={psd.gridStyle.mainContainer}>
            <p style={psd.gridStyle.inputContainer}>
              <h3 style={psd.gridStyle.infoType}>
                숙소 기본정보를 작성하세요
              </h3>
              <DropBoxSelect
                state={accomodationType}
                setState={setAccomodationType}
                labelName="계약 형태"
                labelId="accomodation_type"
                id="accomodation_type"
                menuItems={[
                  "전대(sublet)",
                  "전대(sublease)",
                  "임대(lease)",
                  "룸메이트",
                ]}
              />

              <div>
                <div>
                  <ValueViewer.SingleValueViewer
                    value={"최대인원: " + limitPeople + "명"}
                  />
                  <SingleSlideInput
                    value={limitPeople}
                    onChange={handleLimitPeople}
                    minMax={[1, 10]}
                  />
                </div>
                <DropBoxSelect
                  state={buildingType}
                  setState={setBuildingType}
                  labelName="건물 유형"
                  labelId="building_type"
                  id="building_type"
                  menuItems={["오피스텔", "원룸", "아파트", "빌라", "기타"]}
                />
              </div>
              <div>
                <div>
                  <ValueViewer.SingleValueViewer
                    value={"욕실 개수: " + numberBathroom}
                  />
                  <SingleSlideInput
                    value={numberBathroom}
                    onChange={handleNumberBathroom}
                    minMax={[1, 10]}
                  />
                </div>
                <div>
                  <ValueViewer.SingleValueViewer
                    value={"침실 개수: " + numberBedroom}
                  />
                  <SingleSlideInput
                    value={numberBedroom}
                    onChange={handleNumberBedroom}
                    minMax={[1, 10]}
                  />
                </div>
              </div>
            </p>
            <p style={psd.gridStyle.inputContainer}>
              <h3 style={psd.gridStyle.infoType}>숙소의 매력을 작성하세요</h3>
              <TextInputTag
                id="title"
                label="제목"
                placeholder="제목을 입력해주세요."
                handleState={handleTitle}
                required={true}
              />
              <TextAreaTag
                id="basic_info"
                label="기본정보"
                placeholder="기본정보을 입력해주세요."
                handleState={handleBasicInfo}
                required={true}
              />
            </p>

            <p style={psd.gridStyle.inputContainer}>
              <h3 style={psd.gridStyle.infoType}>숙소 위치 입력하기</h3>
              {/* <TextInputTag
                  id="full_address"
                  label="주소"
                  placeholder="주소를 입력해주세요."
                  handleState={handleFullAddress}
                  required={true}
                /> */}
              {/* <TextInputTag
                  id="city"
                  label="시"
                  placeholder="시를 입력해주세요."
                  handleState={handleCity}
                  required={true}
                />
                <TextInputTag
                  id="gu"
                  label="구"
                  placeholder="구를 입력해주세요."
                  handleState={handleGu}
                  required={true}
                />
                <TextInputTag
                  id="dong"
                  label="동"
                  placeholder="동을 입력해주세요."
                  handleState={handleDong}
                  required={true}
                />
                <TextInputTag
                  id="street"
                  label="길"
                  placeholder="길을 입력해주세요."
                  handleState={handleStreet}
                  required={true}
                />
                <TextInputTag
                  id="street_number"
                  label="번지"
                  placeholder="번지를 입력해주세요."
                  handleState={handleStreetNumber}
                  required={true}
                />
                <TextInputTag
                  id="post_code"
                  label="우편번호"
                  placeholder="우편번호를 입력해주세요."
                  handleState={handlePostCode}
                  required={true}
                />
                <Map
                  type="searchByMarker"
                  currentPos={pos}
                  setPos={setPos}
                />   */}
              <LocationInput pos={pos} currentPos={pos} setPos={setPos} /> {/* 이렇게만 하면 안되고, 직접 친 후에 맵을 띄울 수도 있어야함. 위 주석 참고. */}
            </p>

            <p style={psd.gridStyle.inputContainer}>
              <h3 style={psd.gridStyle.infoType}>기간 및 금액</h3>
              <p>
                게시 날짜
              </p>
              <DoubleDatePicker
                dateData={startEndDay}
                setDateData={hadnleStartEndDay}
              />
              <NumberInputTag
                id="price"
                label="가격"
                placeholder="가격을 입력해주세요."
                value={priceToString(price.replace(/,/gi, ""))} // 숫자에 ,를 넣어주는 함수 필요
                handleState={handlePrice}
                required={true}
              />
              <p>
                최소-최대 계약 가능 기간 : <ValueRangeViewer arr={tempDuration} />
              </p>
              <DoubleSlideInput
                value={duration}
                onChange={handleDuration}
                minMax={[1, 730]}
              />
            </p>

            <p style={psd.gridStyle.inputContainer}>
              <h3 style={psd.gridStyle.infoType}>숙소 사진을 올려주세요.</h3>
              {imageFiles.length > 0 && (
                <>이미지를 변경하려면 이미지를 클릭해주세요.</>
              )}
              {Array.from({ length: imageFiles.length + 1 }).map((_, index) => (
                <ImageUploadComponent imgIndex={index} setImage={handleSetImages} />
              ))}
            </p>

          </div>
        </DialogContent>

        <s.black_upload_button className="ml-2" onClick={uploadPost}>
          방 올리기
        </s.black_upload_button>
      </Dialog>
    </>
  );
};

