import React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import img1 from '../../assets/images/img1.png';
import '../../assets/css/MainBanner.css';

const images = [
    img1
];

function MainBanner() {
    return (
        <div className="banner-wrapper">
        <Splide
          options={{
            type        : 'loop',
            perPage     : 1,
            width       : '100%',   // wrapper 가 100% 너비를 갖도록
            heightRatio : 0.25,     // 높이를 너비의 25%로 (4:1 비율)
            autoplay    : true,
            pauseOnHover: true,
            pagination  : true,
            arrows      : false,
            gap         : '0rem',
          }}
          aria-label="메인 배너"
        >
          {[img1 /*, img2, img3, img4*/].map((src, i) => (
            <SplideSlide key={i}>
              <img src={src} alt={`배너 ${i+1}`} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    );
  }

export default MainBanner