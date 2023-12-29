import * as React from "react";

export default function ReHome(props) {
  const typing_element = document.querySelector(".somthingAwesome");
  const intro_content = "뭔가 멋있는 텍스트나 애니메이션";

  let idx = 0;
  function typing() {
    if (typing_element != null) {
      typing_element.innerHTML += intro_content[idx];
      idx += 1;
      if (idx >= intro_content.length) {
        typing_element.innerHTML = "";
        idx = 0;
        clearInterval(interval);
      }
    }
  }

  let interval = setInterval(typing, 100);

  return (
    <>
      <div className="div">
        <div className="div-2">
          <div className="div-3">
            <img
              loading="lazy"
              srcSet="..."
              className="img"
            />
            <div className="div-4">
              <div className="div-5">log in</div>
              <div className="div-6">Sign up</div>
            </div>
          </div>
          <div className="div-7" />
        </div>
        <div className="div-8">
          <div className="div-9">
            <div className="div-10">
              <div className="div-11">언제 어디든 확인하세요</div>
              <div className="div-12">
                <div className="div-13">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/12cd3d35-c617-4197-b41a-b9fa886ee652?"
                    className="img-2"
                  />
                  <div className="div-14">
                    <div className="div-15">
                      <div className="div-16">위치</div>
                      <div className="div-17">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7879a240-092d-4d4f-916f-3d8863003871?"
                          className="img-3"
                        />
                        <div className="div-18">날짜</div>
                      </div>
                    </div>
                    <div className="div-19" />
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7bed561-1d16-4162-abb7-7d64168d3817?"
                    className="img-4"
                  />
                </div>
              </div>
              <div className="div-20">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/41a05d52-85f6-4635-a255-407f00790ae9?"
                  className="img-5"
                />
                확인하기
              </div>
            </div>
            <div className="somthingAwesome"></div>
          </div>
          <div className="div-23">
            <div className="div-24">
              <div className="column">
                <div className="div-25">
                  <div className="div-26">
                    <img
                      loading="lazy"
                      srcSet="..."
                      className="img-6"
                    />
                    <img
                      loading="lazy"
                      srcSet="..."
                      className="img-7"
                    />
                    <div className="div-27">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/93c69a4d-946c-465d-b1dd-a813f5f4b586?"
                        className="img-8"
                      />
                      <div className="div-28">55</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column-2">
                <div className="div-29">
                  <div className="div-30">
                    강남에 직장이 있는 분을 위한 맞춤형 숙소
                  </div>
                  <div className="div-31">
                    강남역 5분, 강동 미래아트센터 10분 거리입니다. 그리고 여기
                    있는 모둔 가구들은 전부 사용가능합니다. 이외에 제가 모은
                    배달 쿠폰들 전부 드립니다. 영화관도 가까워서 데이트하기도
                    좋습니다. 개인 위생용품은 챙기셔야합니다.
                  </div>
                  <div className="div-32">서울특별시 강동구 고덕동</div>
                </div>
                <div className="div-33">₩ 430,000 / 1개월</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          background-color: #fff;
          display: flex;
          padding-left: 8px;
          flex-direction: column;
        }
        .div-2 {
          align-items: start;
          display: flex;
          margin-top: 20px;
          flex-direction: column;
          padding: 10px 20px 0;
        }
        @media (max-width: 991px) {
          .div-2 {
            max-width: 100%;
          }
        }
        .div-3 {
          display: flex;
          margin-left: -10px;
          width: 100%;
          justify-content: space-between;
          gap: 20px;
        }
        @media (max-width: 991px) {
          .div-3 {
            max-width: 100%;
            flex-wrap: wrap;
          }
        }
        .img {
          aspect-ratio: 0.75;
          object-fit: contain;
          object-position: center;
          width: 48px;
          overflow: hidden;
          max-width: 100%;
        }
        .div-4 {
          align-self: center;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin: auto 0;
        }
        .div-5 {
          color: #000;
          letter-spacing: -0.8500000000000001px;
          font: 600 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-6 {
          color: #000;
          letter-spacing: -0.8500000000000001px;
          white-space: nowrap;
          font: 600 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-6 {
            white-space: initial;
          }
        }
        .div-7 {
          background-color: #b4b4b4;
          align-self: stretch;
          height: 1px;
          margin: 9px -20px 0 0;
        }
        @media (max-width: 991px) {
          .div-7 {
            max-width: 100%;
          }
        }
        .div-8 {
          display: flex;
          flex-direction: column;
          margin: 67px 0 115px;
          padding: 0 35px;
        }
        @media (max-width: 991px) {
          .div-8 {
            max-width: 100%;
            margin: 40px 0;
            padding: 0 20px;
          }
        }
        .div-9 {
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }
        @media (max-width: 991px) {
          .div-9 {
            max-width: 100%;
            flex-wrap: wrap;
          }
        }
        .div-10 {
          align-items: start;
          display: flex;
          flex-grow: 1;
          flex-basis: 0%;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-10 {
            max-width: 100%;
          }
        }
        .div-11 {
          color: #000;
          letter-spacing: -1.5px;
          align-self: stretch;
          font: 700 30px/30px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-11 {
            max-width: 100%;
          }
        }
        .div-12 {
          align-items: center;
          align-self: stretch;
          display: flex;
          margin-top: 25px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-12 {
            max-width: 100%;
          }
        }
        .div-13 {
          disply: flex;
          flex-direction: column;
          fill: #fff;
          stroke-width: 1px;
          stroke: #000;
          filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
          overflow: hidden;
          position: relative;
          display: flex;
          min-height: 50px;
          width: 100%;
          justify-content: space-between;
          gap: 0px;
          padding: 7px 31px 7px 20px;
        }
        @media (max-width: 991px) {
          .div-13 {
            max-width: 100%;
            flex-wrap: wrap;
            padding-right: 20px;
          }
        }
        .img-2 {
          position: absolute;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .div-14 {
          position: relative;
          z-index: 1;
          display: flex;
          margin-right: -34px;
          flex-direction: column;
        }
        .div-15 {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .div-16 {
          justify-content: center;
          color: #000;
          letter-spacing: -0.8500000000000001px;
          margin: auto 0;
          font: 600 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-17 {
          align-self: stretch;
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }
        .img-3 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 33px;
          overflow: hidden;
          max-width: 100%;
        }
        .div-18 {
          justify-content: center;
          color: #000;
          letter-spacing: -0.8500000000000001px;
          align-self: start;
          margin-top: 13px;
          font: 600 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-19 {
          background-color: #000;
          align-self: end;
          width: 200px;
          height: 3px;
        }
        .img-4 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 33px;
          overflow: hidden;
          align-self: start;
          max-width: 100%;
        }
        .div-20 {
          disply: flex;
          flex-direction: column;
          color: #fff;
          letter-spacing: -0.8500000000000001px;
          position: relative;
          white-space: nowrap;
          fill: #000;
          stroke-width: 1px;
          stroke: #000;
          filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
          overflow: hidden;
          aspect-ratio: 4.744186046511628;
          margin-top: 33px;
          width: 204px;
          max-width: 100%;
          align-items: center;
          padding: 14px 20px;
          font: 600 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-20 {
            white-space: initial;
          }
        }
        .img-5 {
          position: absolute;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .div-21 {
          position: relative;
        }
        .div-22 {
          justify-content: center;
          color: #000;
          letter-spacing: -2.5px;
          opacity: 0.5;
          align-self: end;
          flex-grow: 1;
          flex-basis: auto;
          margin-left: -2px;
          font: 600 50px/70px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-22 {
            font-size: 40px;
            line-height: 62px;
            margin-top: 40px;
          }
        }
        .div-23 {
          margin-top: 97px;
        }
        @media (max-width: 991px) {
          .div-23 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-24 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-24 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 48%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column {
            width: 100%;
          }
        }
        .div-25 {
          display: flex;
          flex-grow: 1;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-25 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-26 {
          disply: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          display: flex;
          min-height: 431px;
          width: 100%;
          align-items: end;
          padding: 50px 0 30px 80px;
        }
        @media (max-width: 991px) {
          .div-26 {
            max-width: 100%;
            padding-left: 20px;
          }
        }
        .img-6 {
          position: absolute;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .img-7 {
          aspect-ratio: 1.03;
          object-fit: contain;
          object-position: center;
          width: 31px;
          opacity: 0.8;
          overflow: hidden;
          border-radius: 50%;
          margin-top: 153px;
          max-width: 100%;
        }
        @media (max-width: 991px) {
          .img-7 {
            margin-top: 40px;
          }
        }
        .div-27 {
          position: relative;
          align-self: center;
          display: flex;
          margin-top: 138px;
          width: 56px;
          max-width: 100%;
          gap: 3px;
        }
        @media (max-width: 991px) {
          .div-27 {
            margin-top: 40px;
          }
        }
        .img-8 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 100%;
          overflow: hidden;
          flex: 1;
        }
        .div-28 {
          justify-content: center;
          color: #616161;
          letter-spacing: -1px;
          align-self: center;
          margin: auto 0;
          font: 700 20px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .column-2 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 52%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-2 {
            width: 100%;
          }
        }
        .div-29 {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-29 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-30 {
          color: #000;
          letter-spacing: -1.6px;
          white-space: nowrap;
          font: 800 32px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-30 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-31 {
          justify-content: center;
          color: #000;
          letter-spacing: -1px;
          margin-top: 22px;
          font: 500 20px/20px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-31 {
            max-width: 100%;
          }
        }
        .div-32 {
          color: #000;
          letter-spacing: -0.8500000000000001px;
          margin-top: 22px;
          font: 600 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-33 {
          justify-content: center;
          color: #616161;
          letter-spacing: -0.8500000000000001px;
          font: 700 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
      `}</style>
    </>
  );
}

