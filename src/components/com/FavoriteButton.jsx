import React, { useState, useRef, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function FavoriteButton({
  initialFavorite = false,
  onToggle,
  lottieSrc,
  size = 32
}) {
  const [favorite, setFavorite] = useState(initialFavorite);
  const [isPlaying, setIsPlaying] = useState(false);
  const animRef = useRef(null);

  const handleClick = () => {
    if (isPlaying) return;

    const newFav = !favorite;

    if (newFav) {
      setIsPlaying(true);
      setFavorite(true);
      onToggle(true).catch(() => {
        setFavorite(false);
        setIsPlaying(false);
      });
    } else {
      setFavorite(false);
      onToggle(false).catch(() => {
        setFavorite(true);
      });
    }
  };

  // ✅ useEffect로 complete 이벤트 + fallback 타이머 등록
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setIsPlaying(false);
      }, 1000); // 애니메이션 길이에 맞게 조절

      const anim = animRef.current?.getLottie?.();
      const onComplete = () => {
        setIsPlaying(false);
      };

      anim?.addEventListener("complete", onComplete);

      return () => {
        clearTimeout(timer);
        anim?.removeEventListener("complete", onComplete);
      };
    }
  }, [isPlaying]);

  return (
    <div
      onClick={handleClick}
      style={{
        position: "relative",
        width: size,
        height: size,
        cursor: isPlaying ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* 항상 SVG 렌더링 */}
      {!isPlaying && (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill={favorite ? "#e74c3c" : "#ccc"}
          style={{
            position: "absolute",
            top: 0,
            left: 0
          }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                   2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                   C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42
                   22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}

      {/* isPlaying일 때만 애니메이션 */}
      {isPlaying && (
        <DotLottieReact
          lottieRef={animRef}
          src={lottieSrc}
          autoplay
          loop={false}
          style={{
            width: size,
            height: size,
            position: "absolute",
            top: 0,
            left: 0
          }}
        />
      )}
    </div>
  );
}
