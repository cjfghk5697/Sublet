import * as React from "react";

export default function SaveSubletInfo(props) {
  return (
    <>
      <div className="div">
        <div className="div-2">
          <img
            loading="lazy"
            src={props.room.images[0]}
            className="img"
          />
          <div className="div-3">
            <img
              loading="lazy"
              src={props.room.images[0]}
              className="img-2"
            />
            <div className="div-4">
              <div className="div-5">
                <div className="div-6">위치</div>
                <div className="div-7" />
              </div>
              <img
                loading="lazy"
                src={props.room.images[0]}
                className="img-3"
              />
              <div className="div-8">
                <div className="div-9">날짜</div>
                <div className="div-10" />
              </div>
              <img
                loading="lazy"
                src={props.room.images[0]}
                className="img-4"
              />
              <div className="div-11">
                <div className="div-12">가격 범위</div>
                <div className="div-13" />
              </div>
              <img
                loading="lazy"
                src={props.room.images[0]}
                className="img-5"
              />
              <div className="div-14">
                <div className="div-15">필요한 숙소를 입력하세요</div>
                <div className="div-16">원하는 것을 키워드로</div>
              </div>
            </div>
            <img
              loading="lazy"
              src={props.room.images[0]}
              className="img-6"
            />
          </div>
          <div className="div-17">
            <div className="div-18">
              <img
                loading="lazy"
                src={props.room.images[0]}
                className="img-7"
              />
              <img
                loading="lazy"
                src={props.room.images[0]}
                className="img-8"
              />
            </div>
            <div className="div-19">33</div>
          </div>
        </div>
        <img
          loading="lazy"
          src={props.room.images[0]}
          className="img-9"
        />
        <div className="div-20">
          <div className="div-21">
            <div className="column">
              <img
                loading="lazy"
                srcSet="..."
                className="img-10"
              />
            </div>
            <div className="column-2">
              <div className="div-22">
                <div className="div-23">
                  <div className="div-24">
                    강남에 직장이 있는 분을 위한 맞춤형 숙소
                  </div>
                  <div className="div-25">경기도 하남시 위례동</div>
                  <div className="div-26">8월 30일 부터, 최소 1개월월</div>
                  <div className="div-27">₩ 730,000원 /1개월</div>
                </div>
                <div className="div-28">
                  <div className="div-29">저렴하게 지낼수 있는 제주도 집</div>
                  <div className="div-30">경기도 하남시 위례동</div>
                  <div className="div-31">8월 30일 부터, 최소 1개월월</div>
                  <div className="div-32">₩ 330,000원 / 1개월</div>
                </div>
                <div className="div-33">저렴하게 지낼수 있는 제주도 집</div>
                <div className="div-34">
                  <div className="div-35">경기도 하남시 위례동</div>
                  <div className="div-36">8월 30일 부터, 최소 1개월월</div>
                  <div className="div-37">₩ 330,000원 / 1개월</div>
                </div>
              </div>
            </div>
            <div className="column-3">
              <img
                loading="lazy"
                src={props.room.images[0]}
                className="img-11"
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          background-color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .div-2 {
          align-self: stretch;
          display: flex;
          margin-top: 7px;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 0 20px;
        }
        @media (max-width: 991px) {
          .div-2 {
            max-width: 100%;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
        .img {
          aspect-ratio: 0.72;
          object-fit: contain;
          object-position: center;
          width: 46px;
          overflow: hidden;
          align-self: start;
          max-width: 100%;
        }
        .div-3 {
          disply: flex;
          flex-direction: column;
          fill: #fff;
          stroke-width: 1px;
          stroke: #000;
          opacity: 0.2;
          filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
          overflow: hidden;
          align-self: start;
          position: relative;
          display: flex;
          min-height: 57px;
          margin-top: 10px;
          width: 1115px;
          justify-content: space-between;
          gap: 20px;
          padding: 11px 37px 5px 39px;
        }
        @media (max-width: 991px) {
          .div-3 {
            max-width: 100%;
            flex-wrap: wrap;
            padding: 0 20px;
          }
        }
        .img-2 {
          position: absolute;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .div-4 {
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0px;
        }
        @media (max-width: 991px) {
          .div-4 {
            max-width: 100%;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
        .div-5 {
          align-self: end;
          display: flex;
          flex-grow: 1;
          flex-basis: 0%;
          flex-direction: column;
          margin: 13px -34px 0 0;
        }
        .div-6 {
          justify-content: center;
          color: #616161;
          letter-spacing: -0.8500000000000001px;
          font: 600 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-7 {
          background-color: #616161;
          margin-top: 6px;
          height: 3px;
        }
        .img-3 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 33px;
          overflow: hidden;
          align-self: center;
          max-width: 100%;
          margin: auto 0;
        }
        .div-8 {
          align-self: end;
          z-index: 1;
          display: flex;
          flex-grow: 1;
          flex-basis: 0%;
          flex-direction: column;
          margin: 13px -33px 0 0;
        }
        .div-9 {
          justify-content: center;
          color: #616161;
          letter-spacing: -0.8500000000000001px;
          font: 600 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-10 {
          background-color: #616161;
          margin-top: 6px;
          height: 3px;
        }
        .img-4 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 33px;
          overflow: hidden;
          align-self: center;
          max-width: 100%;
          margin: auto 0;
        }
        .div-11 {
          align-self: end;
          display: flex;
          flex-grow: 1;
          flex-basis: 0%;
          flex-direction: column;
          margin: 13px -31px 0 0;
        }
        .div-12 {
          justify-content: center;
          color: #616161;
          letter-spacing: -0.8500000000000001px;
          font: 600 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-13 {
          background-color: #616161;
          margin-top: 6px;
          height: 3px;
        }
        .img-5 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 33px;
          overflow: hidden;
          align-self: center;
          max-width: 100%;
          margin: auto 0;
        }
        .div-14 {
          align-self: stretch;
          display: flex;
          flex-grow: 1;
          flex-basis: 0%;
          flex-direction: column;
        }
        .div-15 {
          justify-content: center;
          color: #000;
          letter-spacing: -1px;
          margin-top: 4px;
          font: 800 20px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-16 {
          justify-content: center;
          color: #616161;
          letter-spacing: -0.8500000000000001px;
          margin-top: 7px;
          white-space: nowrap;
          font: 600 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-16 {
            white-space: initial;
          }
        }
        .img-6 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 37px;
          overflow: hidden;
          align-self: start;
          max-width: 100%;
        }
        .div-17 {
          display: flex;
          flex-basis: 0%;
          flex-direction: column;
          margin: auto 0;
        }
        .div-18 {
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }
        .img-7 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 33px;
          overflow: hidden;
          max-width: 100%;
        }
        .img-8 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 33px;
          overflow: hidden;
          max-width: 100%;
        }
        .div-19 {
          color: #000;
          letter-spacing: -0.75px;
          white-space: nowrap;
          font: 700 15px/20px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-19 {
            white-space: initial;
          }
        }
        .img-9 {
          aspect-ratio: 1440;
          object-fit: contain;
          object-position: center;
          width: 100%;
          stroke-width: 1px;
          stroke: #b4b4b4;
          overflow: hidden;
          align-self: stretch;
          margin-top: 5px;
        }
        @media (max-width: 991px) {
          .img-9 {
            max-width: 100%;
          }
        }
        .div-20 {
          width: 100%;
          max-width: 1362px;
          margin: 40px 0 176px;
          padding: 0 20px;
        }
        @media (max-width: 991px) {
          .div-20 {
            max-width: 100%;
            margin-bottom: 40px;
          }
        }
        .div-21 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-21 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 18%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column {
            width: 100%;
          }
        }
        .img-10 {
          aspect-ratio: 0.43;
          object-fit: contain;
          object-position: center;
          width: 100%;
          border-radius: 15px;
          overflow: hidden;
          margin-top: 13px;
        }
        .column-2 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 38%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-2 {
            width: 100%;
          }
        }
        .div-22 {
          display: flex;
          margin-top: 36px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-22 {
            max-width: 100%;
          }
        }
        .div-23 {
          display: flex;
          flex-direction: column;
          padding: 0 16px;
        }
        @media (max-width: 991px) {
          .div-23 {
            max-width: 100%;
          }
        }
        .div-24 {
          color: #000;
          letter-spacing: -1.5px;
          align-self: stretch;
          margin-top: 14px;
          white-space: nowrap;
          font: 800 30px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-24 {
            max-width: 100%;
            margin-right: 3px;
            white-space: initial;
          }
        }
        .div-25 {
          color: #000;
          letter-spacing: -0.8500000000000001px;
          align-self: stretch;
          margin-top: 6px;
          white-space: nowrap;
          font: 600 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-25 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-26 {
          color: #000;
          letter-spacing: -0.8500000000000001px;
          align-self: stretch;
          margin-top: 7px;
          white-space: nowrap;
          font: 600 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-26 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-27 {
          color: #000;
          letter-spacing: -1.5px;
          text-decoration-line: underline;
          align-self: end;
          margin-top: 47px;
          white-space: nowrap;
          font: 800 30px/20px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-27 {
            margin-top: 40px;
            white-space: initial;
          }
        }
        .div-28 {
          display: flex;
          margin-top: 56px;
          padding-left: 18px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-28 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-29 {
          color: #000;
          letter-spacing: -1.5px;
          align-self: stretch;
          margin-top: 14px;
          white-space: nowrap;
          font: 800 30px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-29 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-30 {
          color: #000;
          letter-spacing: -0.8500000000000001px;
          align-self: stretch;
          margin-top: 12px;
          white-space: nowrap;
          font: 600 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-30 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-31 {
          color: #000;
          letter-spacing: -0.8500000000000001px;
          align-self: stretch;
          margin-top: 7px;
          white-space: nowrap;
          font: 600 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-31 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-32 {
          justify-content: center;
          color: #000;
          letter-spacing: -1.5px;
          text-decoration-line: underline;
          align-self: end;
          margin-top: 43px;
          max-width: 304px;
          font: 800 30px/20px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-32 {
            margin-top: 40px;
          }
        }
        .div-33 {
          color: #000;
          letter-spacing: -1.5px;
          margin-top: 77px;
          white-space: nowrap;
          font: 800 30px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-33 {
            max-width: 100%;
            margin-top: 40px;
            white-space: initial;
          }
        }
        .div-34 {
          display: flex;
          margin-top: 9px;
          padding-left: 18px;
          flex-direction: column;
          align-items: end;
        }
        @media (max-width: 991px) {
          .div-34 {
            max-width: 100%;
          }
        }
        .div-35 {
          color: #000;
          letter-spacing: -0.8500000000000001px;
          align-self: stretch;
          white-space: nowrap;
          font: 600 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-35 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-36 {
          color: #000;
          letter-spacing: -0.8500000000000001px;
          align-self: stretch;
          margin-top: 7px;
          white-space: nowrap;
          font: 600 17px/16px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-36 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-37 {
          justify-content: center;
          color: #000;
          letter-spacing: -1.5px;
          text-decoration-line: underline;
          margin-top: 40px;
          max-width: 304px;
          font: 800 30px/20px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .column-3 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 43%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-3 {
            width: 100%;
          }
        }
        .img-11 {
          aspect-ratio: 0.87;
          object-fit: contain;
          object-position: center;
          width: 100%;
          overflow: hidden;
          flex-grow: 1;
        }
        @media (max-width: 991px) {
          .img-11 {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}

