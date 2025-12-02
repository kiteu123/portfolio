// src/components/IntroAnimation.jsx
import React, { useEffect } from "react";
import "./IntroAnimation.css"; // 별도 CSS 파일 생성

/**
 * 포트폴리오 인트로 애니메이션 컴포넌트
 * @param {object} props
 * @param {function} props.onAnimationEnd - 애니메이션이 완료되면 호출될 콜백 함수
 */
const IntroAnimation = ({ onAnimationEnd }) => {
  // 애니메이션 총 지속 시간 (CSS와 일치해야 함)
  const ANIMATION_DURATION = 3500; // 3.5초 (도형 애니메이션 3초 + 페이드 아웃 0.5초)

  useEffect(() => {
    // 애니메이션 완료 후 onAnimationEnd 함수 호출
    const timer = setTimeout(() => {
      // 인트로 화면 자체를 숨기기 전에 부모 컴포넌트에 알림
      onAnimationEnd();
    }, ANIMATION_DURATION);

    return () => clearTimeout(timer); // 클린업
  }, [onAnimationEnd]);

  return (
    <div className="intro-screen">
      <div className="shape-container">
        <div className="shape circle"></div>
        <div className="shape square"></div>
        <div className="shape triangle"></div>
      </div>
      <h2 className="loading-text">Loading Portfolio...</h2>
    </div>
  );
};

export default IntroAnimation;
