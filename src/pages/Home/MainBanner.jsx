import React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import img1 from '../../assets/images/logo1.jpg';
import img2 from '../../assets/images/logo2.jpg';
import img3 from '../../assets/images/logo3.jpg'
import '../../assets/css/MainBanner.css';

const images = [
    img1,img2,img3
];

function MainBanner() {
    return (
        <div className="banner-wrapper">
        <Splide
          options={{
            type        : 'loop',
            perPage     : 1,
            width       : '100%',
            heightRatio : 0.25,          // ⭐ 중간 비율 추천값 (약 3.5:1 비율)
            autoplay    : true,
            pauseOnHover: true,
            pagination  : true,
            arrows      : false,
            gap         : '0rem',
          }}
          aria-label="메인 배너"
        >
          {images.map((src, i) => (
            <SplideSlide key={i}>
              <img src={src} alt={`배너 ${i+1}`} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    );
  }

export default MainBanner