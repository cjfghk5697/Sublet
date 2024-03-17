import React from 'react';
import { useState } from 'react';
/* import map from './map.png' import로 임시 map image 들고옴. */
import { IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Dialog, Popover } from '@headlessui/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LocationOnIcon from '@mui/icons-material/LocationOn';

<<<<<<< HEAD:sublet-front/src/pages/GuestRequest/GuestRequest.js
import SearchPriceRange from '../../@core/Header/Desktop/components/SearchPriceRange.js';
import SearchDate from '../../@core/Header/Desktop/components/SearchDate.js';
import GuestRequeststyles from '../../components/styles/GuestRequest.styles.js';
import * as s from '../../components/styles/GuestRequest.styles.js';

import * as ps from '../../components/styles/Public.styles.js';

=======
import SearchPriceRange from '../@core/Header/Desktop/components/SearchPriceRange.js';
import SearchDate from '../@core/Header/Desktop/components/SearchDate.js';
import GuestRequeststyles from '../@shared/components/styles/GuestRequest.styles.js';
import * as s from '../@shared/components/styles/GuestRequest.styles.js';
>>>>>>> 11da444f69e79a7ed625dac81d78e694d86537fa:sublet-front/src/pages/GuestRequest.js
/* import DropdownButton from '../components/DropdownButton.js'; */

function GuestRequest() {
  const [inputs, setInputs] = useState({
    price: 1,
    start_day: '2024-04-05T00:00:00.000Z',
    end_day: '2024-04-05T00:00:00.000Z',
    limit_people: 1,
    number_room: 1,
    number_bathroom: 1,
    number_bedroom: 1,
    accomodation_type: 'short',
    building_type: 'oneRoom',
    contract: 'borrow',
    city: '',
    gu: '',
    dong: '',
    alarm: '',
    school: '',
  });

  const {
    price,
    start_day,
    end_day,
    limit_people,
    number_room,
    number_bathroom,
    number_bedroom,
    accomodation_type,
    building_type,
    contract,
    city,
    gu,
    dong,
    alarm,
    school,
  } = inputs;

  const requestHandle = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const location = useLocation();
  const handleReload = () => {
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      window.location.href = '/GuestRequest';
    }
  };
  const styles = GuestRequeststyles();
  return (
    <div style={styles.BigContainer}>
      <div>
        <IconButton onClick={handleReload} style={styles.logoContainer}>
          <img src="logo.png" style={styles.logoIcon} alt="logo" />
        </IconButton>
      </div>
      <hr />
      <div>
        <div style={styles.GuestRequest_RequestContainer}>
          <div className="mt-5">
            <span className="text-5xl font-extrabold">요청서를 작성하세요</span>
          </div>
          <div className="mt-3">
            <hr />
            <span className="text-xl font-extrabold">
              요청에 적합한 숙소가 나오면 이메일을 받으실 수 있습니다.
            </span>
          </div>
        </div>
        <div style={styles.GuestRequest_Content}>
          {' '}
          {/* 요청서 정보 입력 */}
          <div style={styles.GuestRequest_Detail}>
            <Popover.Group style={styles.RequestBox}>
              <div>
                <p style={styles.GuestRequest_DetailTitle}>* 기본 정보 입력</p>
                <div style={styles.RequestBoxContainer}>
                  <div style={styles.Requestselect}>
                    <IconButton style={styles.RequestLocation}>
                      위치
                      <LocationOnIcon />
                    </IconButton>
                  </div>
                  <div style={styles.Requestselect}>
                    <SearchPriceRange />
                  </div>
                </div>
              </div>
              <div style={styles.RequestBoxContainer2}>
                <IconButton style={styles.RequestminiBox1}>
                  <SearchDate />
                </IconButton>

                <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                  <InputLabel id="demo-simple-select-label">
                    숙박 유형
                  </InputLabel>
                  <Select
                    name={'accomodation_type'}
                    value={accomodation_type}
                    label="Accomodation Type"
                    onChange={requestHandle}>
                    <MenuItem value={'short'}>단기</MenuItem>
                    <MenuItem value={'medium'}>중기</MenuItem>
                    <MenuItem value={'long'}>장기</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <p style={styles.GuestRequest_DetailTitle}>방 정보 입력</p>
                <div>
                  <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                    <InputLabel id="demo-simple-select-label">
                      임대 종류
                    </InputLabel>
                    <Select
                      name={'contract'}
                      value={contract}
                      label="contract"
                      onChange={requestHandle}>
                      <MenuItem value={'borrow'}>매물</MenuItem>
                      <MenuItem value={'get'}>분양</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                    <InputLabel id="demo-simple-select-label">
                      층수 이거 중복이어야하는데
                    </InputLabel>
                    <Select
                      name={'number_room'}
                      value={number_room}
                      label="number_room"
                      onChange={requestHandle}>
                      <MenuItem value={'one'}>1층</MenuItem>
                      <MenuItem value={'two'}>2층</MenuItem>
                      <MenuItem value={'three'}>3층</MenuItem>
                      <MenuItem value={'four'}>4층</MenuItem>
                      <MenuItem value={'five'}>5층</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                    <InputLabel id="demo-simple-select-label">
                      건물 유형
                    </InputLabel>
                    <Select
                      name={'building_type'}
                      value={building_type}
                      label="building_type"
                      onChange={requestHandle}>
                      <MenuItem value={'oneRoom'}>원룸</MenuItem>
                      <MenuItem value={'twoThree_Room'}>투-쓰리룸</MenuItem>
                      <MenuItem value={'office'}>오피스텔</MenuItem>
                      <MenuItem value={'apartment'}>아파트</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                    <InputLabel id="demo-simple-select-label">
                      인원수
                    </InputLabel>
                    <Select
                      name={'limit_people'}
                      value={limit_people}
                      label="limit_people"
                      onChange={requestHandle}>
                      <MenuItem value={'one'}>1명</MenuItem>
                      <MenuItem value={'two'}>2명</MenuItem>
                      <MenuItem value={'three'}>3명</MenuItem>
                      <MenuItem value={'four'}>4명</MenuItem>
                      <MenuItem value={'five'}>5명</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                    <InputLabel id="demo-simple-select-label">
                      욕실 개수
                    </InputLabel>
                    <Select
                      name={'number_bathroom'}
                      value={number_bathroom}
                      label="number_bathroom"
                      onChange={requestHandle}>
                      <MenuItem value={'one'}>1개</MenuItem>
                      <MenuItem value={'two'}>2개</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                    <InputLabel id="demo-simple-select-label">
                      침실 개수
                    </InputLabel>
                    <Select
                      name={'number_bedroom'}
                      value={number_bedroom}
                      label="number_bedroom"
                      onChange={requestHandle}>
                      <MenuItem value={'one'}>1개</MenuItem>
                      <MenuItem value={'two'}>2개</MenuItem>
                    </Select>
                  </FormControl>
                  <p style={styles.GuestRequest_DetailTitle}>요청 사항</p>
                  <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."></textarea>
                </div>
              </div>
              <div>
                <p style={styles.GuestRequest_DetailTitle}>추가 사항</p>
                <div>
                  <s.Checkbox_additional type="checkbox" />
                  <s.additional_text>요청 매물 알람 설정</s.additional_text>
                </div>
                <div>
                  <s.Checkbox_additional type="checkbox" />
                  <s.additional_text>
                    완전 계약 인증된 매물만 보기
                  </s.additional_text>
                </div>
              </div>
              <div className="mt-4">
                <s.confilrmButton onClick={() => RequestPost(inputs)}>
                  확인하기
                </s.confilrmButton>
              </div>
            </Popover.Group>
          </div>
          <div style={styles.GuestRequest_map}>
            {/* <img src={ } alt="nothing" style={styles.GuestRequest_map_img} /> */}{' '}
            {/* 임시 지도 이미지 */}
            <p> 이미지</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestPost({
  price,
  start_day,
  end_day,
  limit_people,
  number_room,
  number_bathroom,
  number_bedroom,
  accomodation_type,
  building_type,
  contract,
  city,
  gu,
  dong,
  alarm,
  school,
}) {
  const RequestFunc = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      path: '/',
      body: JSON.stringify({
        price: price,
        start_day: start_day,
        end_day: end_day,
        limit_people: limit_people,
        number_room: number_room,
        number_bathroom: number_bathroom,
        number_bedroom: number_bedroom,
        accomodation_type: accomodation_type,
        building_type: building_type,
        contract: contract,
        city: city,
        gu: gu,
        dong: dong,
        alarm: alarm,
        school: school,
      }),
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/request`, requestOptions)
      .then(res => res.json())
      .then(response => {
        console.log('result RequestFunc', response);
      })
      .catch(e => {
        console.log('[error] RequestFunc', e);
      });
  };
  RequestFunc();
}

export default GuestRequest;
