import { useRef, useState, Fragment } from "react";
import * as s from "./styles/SummaryBlock.styles.js";
import * as psd from "./styles/PostUploadDialog.styles.js";
import "./styles/Popup.styles.css";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import { FetchImage } from "./FetchList";

import { guestInfoPopUpStore } from "./store/guestInfoStore.js";
import { Alert } from "./StaticComponents.js";
import { DialogTitle } from "@mui/material";

import {
  TextInputTag,
  TextAreaTag,
  NumberInputTag,
} from "./Input/TextInputTag.js";
import DropBoxSelect from "./Input/DropBoxSelect.js";
import { DoubleSlideInput } from "./Input/DoubleSlideInput.js";
import { SingleSlideInput } from "../components/Input/SingleSlideInput.js";
import * as ValueViewer from "../components/Input/ValueViewer.js";
import { LocationInput } from "../components/Input/LocationInput.js";
import { DoubleDatePicker } from "./Input/DoubleDatePicker.js";
import { priceToString } from "../components/StaticComponents.js";
import { ImageUploadComponent } from "./Input/ImageInput.js";

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

  const [backUp, setBackUp] = useState(false);

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
    FetchImage(formData);
    setBackUp(true);
    setTimeout(() => {
      setBackUp(false);
    }, 5000);
  };

  return (
    <>
      <Dialog
        open={imagePopUpState}
        className="border border-gray-300 shadow-xl rounded-lg"
      >
        <DialogTitle>
          <s.close_button type="button" className="float-right">
            <svg
              class="h-6 w-6"
              onClick={handleClose}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </s.close_button>
        </DialogTitle>

        <DialogContent
          sx={{ height: 324, width: 400 }}
          className="font-black text-center"
        >
          <div className="clear-both h-56 w-75 flex items-center justify-center">
            {imgFile ? (
              <img src={imgFile} alt="프로필 이미지" />
            ) : (
              <label
                for="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
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

            <div>{backUp && <Alert />}</div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function EmailDialog({ originalEmail }) {
  const { setEmailPopUpState, emailPopUpState } = guestInfoPopUpStore(
    (state) => ({
      setEmailPopUpState: state.setEmailPopUpState,
      emailPopUpState: state.emailPopUpState,
    })
  );
  const [backUp, setBackUp] = useState(false);

  const handleClose = () => setEmailPopUpState(false);
  // useConfirm("닫으시겠습니까?", setShow(true), setShow(false))

  // const confirmAction = () => {
  //   if (window.confirm('닫으시겠습니까?')) {
  //     setEmailPopUpState(false);
  //   } else {
  //     setEmailPopUpState(true);
  //   }
  // }
  const [emailState, setEmailState] = useState(originalEmail);

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

    await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/update`,
        requestOptions
      )
    ).json();
  };
  const clickHandle = () => {
    emailHandled();
    setBackUp(true);
    setTimeout(() => {
      setBackUp(false);
    }, 5000);
  };
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

          <s.close_button type="button" className="float-right">
            <svg
              class="h-6 w-6"
              onClick={handleClose}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </s.close_button>
        </DialogTitle>
        <DialogContent className="text-center" sx={{ height: 120, width: 312 }}>
          <form>
            <input
              type="email"
              id="email"
              onChange={emailChange}
              value={emailState}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john.doe@company.com"
              required
            />
          </form>

          <div className="mt-4">
            <s.black_upload_button onClick={clickHandle}>
              수정하기
            </s.black_upload_button>
            <div>{backUp && <Alert />}</div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function PhoneDialog({ originalPhone }) {
  const { setPhonePopUpState, phonePopUpState } = guestInfoPopUpStore(
    (state) => ({
      setPhonePopUpState: state.setPhonePopUpState,
      phonePopUpState: state.phonePopUpState,
    })
  );
  const [backUp, setBackUp] = useState(false);

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

    await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/update`,
        requestOptions
      )
    ).json();
  };
  const clickHandle = () => {
    phoneHandled();
    setBackUp(true);
    setTimeout(() => {
      setBackUp(false);
    }, 5000);
  };
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

          <s.close_button type="button" className="float-right">
            <svg
              class="h-6 w-6"
              onClick={handleClose}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </s.close_button>
        </DialogTitle>
        <DialogContent sx={{ height: 120, width: 312 }} className="text-center">
          <form>
            <input
              type="tel"
              id="tel"
              onChange={phoneChange}
              value={phoneState}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john.doe@company.com"
              required
            />
          </form>
          <div className="mt-4">
            <s.black_upload_button onClick={clickHandle}>
              수정하기
            </s.black_upload_button>
            <div>{backUp && <Alert />}</div>
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
                <s.close_button type="button" name="sharePopUpState" onClick={onChange} className='float-right'>
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </s.close_button>
              </form>

              <ShareDialog content="localhost" className="clear-both" />
            </DialogContent >
          </Dialog> 
          */
  const copyLinkRef = useRef();
  const pageLink = window.location.href;
  const [backUp, setBackUp] = useState(false);
  const copyTextUrl = () => {
    copyLinkRef.current.focus();
    setBackUp(true);
    navigator.clipboard.writeText(copyLinkRef.current.value);
    setTimeout(() => {
      setBackUp(false);
    }, 5000);
  };
  return (
    <div className="z-10 inline-block mr-6">
      <div clssName="">
        <p className="text-2xl font-extrabold">숙소를 공유하세요!</p>
        <p className="text-base text-gray"> 복사하여 편하게 보내세요</p>
      </div>
      <div className="mt-2">
        <s.input_text_without_block
          type="text"
          className="inline-block ring-1 ring-inset ring-gray-300 border border-slate-300 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          ref={copyLinkRef}
          value={content}
        />
        <s.black_upload_button className="ml-2" onClick={copyTextUrl}>
          복사하기
        </s.black_upload_button>
      </div>
      <div className="mt-4 center">{backUp && <Alert />}</div>
    </div>
  );
  // 선택 후 복사
}

export const PostUploadDialog = (props) => {
  const { setPostPopUpState, postPopUpState } = guestInfoPopUpStore(
    (state) => ({
      setPostPopUpState: state.setPostPopUpState,
      postPopUpState: state.postPopUpState,
    })
  );
  const [accomodationType, setAccomodationType] =
    useState("숙소 종류를 선택하세요");
  const [limitPeople, setLimitPeople] = useState(1);
  const [buildingType, setBuildingType] = useState("건물 종류를 선택하세요");
  const [numberBathroom, setNumberBathroom] = useState(1);
  const [numberRoom, setNumberRoom] = useState(1);
  const [numberBedroom, setNumberBedroom] = useState(1);
  const [title, setTitle] = useState("제목을 입력해주세요.");
  const [basicInfo, setBasicInfo] = useState("기본정보을 입력해주세요.");
  const [pos, setPos] = useState([37.574583, 126.994143]); // xCoordinate, yCoordinate // 추후 위치 기반으로 초기화.
  const [city, setCity] = useState("");
  const [gu, setGu] = useState("");
  const [dong, setDong] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [postCode, setPostCode] = useState("");
  const [street, setStreet] = useState("");
  const [postDate, setPostDate] = useState([1, 1]); // startDay, endDay
  const [duration, setDuration] = useState([
    new Date(),
    new Date(new Date().setMonth(new Date().getMonth() + 1)),
  ]); // minDuration, maxDuration
  const [price, setPrice] = useState(10000);
  const [tempPrice, setTempPrice] = useState("10000");
  const [imageFiles, setImageFiles] = useState([]);
  const [school, setSchool] = useState("학교을 입력해주세요.");
  const [rule, setRule] = useState("숙소 규칙을 입력해주세요.");
  const [benefit, setBenefit] = useState("혜택을 입력해주세요.");
  const [refundPolicy, setRefundPolicy] = useState("환불정책을 입력해주세요.");
  const [contract, setContract] = useState("계약을 입력해주세요.");

  const handleClose = () => confirmAction();

  const confirmAction = () => {
    if (window.confirm("임시저장 하시겠습니까?")) {
      // 임시 저장 전역 저장.
      alert("임시 저장 되었습니다."); // if 문 비워두지 않기 위한 임시 alert
    }
    setPostPopUpState(false);
  };
  // const [, ] = useState() // 방 현황 새로고침 할 때 활용?

  const uploadPost = async () => {
    const requestOptions = {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        test: "test",
      }),
    };

    await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/update`,
        requestOptions
      )
    ).json();
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
    setPrice(event.target.value);
  };

  const handleSetImages = (newImage) => {
    setImageFiles((prevImages) => [...prevImages, newImage]);
  };

  return (
    <>
      <Dialog
        open={postPopUpState}
        className="border border-gray-300 shadow-xl rounded-lg"
      >
        <DialogContent className="text-center">
          <s.close_button type="button" className="float-right">
            <svg
              class="h-6 w-6"
              onClick={handleClose}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </s.close_button>
          <p>
            --------------추후 슬라이더로 변경 (현재는 스크롤)---------------
          </p>
          <form>
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
                      value={"욕실 갯수: " + numberBathroom}
                    />
                    <SingleSlideInput
                      value={numberBathroom}
                      onChange={handleNumberBathroom}
                      minMax={[1, 10]}
                    />
                  </div>
                  <div>
                    <ValueViewer.SingleValueViewer
                      value={"침실 갯수: " + numberBedroom}
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
                  required={true}
                />
                <TextAreaTag
                  id="basic_info"
                  label="기본정보"
                  placeholder="기본정보을 입력해주세요."
                  required={true}
                />
              </p>

              <p style={psd.gridStyle.inputContainer}>
                <h3 style={psd.gridStyle.infoType}>숙소 위치 입력하기</h3>
                <LocationInput pos={pos} currentPos={pos} setPos={setPos} />
              </p>

              <p style={psd.gridStyle.inputContainer}>
                <h3 style={psd.gridStyle.infoType}>기간 및 금액</h3>
                <DoubleDatePicker
                  searchDate={duration}
                  setSearchDate={setDuration}
                />

                <ValueViewer.SingleValueViewer
                  value={"금액: ₩" + priceToString(price) + "원"}
                />
                <NumberInputTag
                  id="price"
                  label="가격"
                  placeholder="가격을 입력해주세요."
                  handleState={handlePrice}
                  required={true}
                />
                {/*<SingleSlideInput value={price} onChange={handlePrice} minMax={[0, 1000000]}/>*/
                /* 슬라이더 방식 */}
              </p>

              <p style={psd.gridStyle.inputContainer}>
                <h3 style={psd.gridStyle.infoType}>숙소 사진을 올려주세요.</h3>
                {imageFiles.length > 0 && (
                  <>이미지를 변경하려면 이미지를 클릭해주세요.</>
                )}

                <ImageUploadComponent setImage={handleSetImages} />
              </p>
            </div>
          </form>
        </DialogContent>

        <div className="mt-2">
          <s.put_button onClick={uploadPost}>방 올리기</s.put_button>
        </div>
      </Dialog>
    </>
  );
};
