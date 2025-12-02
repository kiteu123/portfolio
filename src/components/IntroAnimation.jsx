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
    // 글자 흩어짐 애니메이션 초기 설정
    const textSpans = document.querySelectorAll(".loading-text span");
    textSpans.forEach((span) => {
      const x = Math.random() * 200 - 100; // -100 ~ 100px
      const y = Math.random() * 200 - 100;
      span.style.setProperty("--x", `${x}px`);
      span.style.setProperty("--y", `${y}px`);
    });

    // 인트로 전체 애니메이션 종료 후 부모에 알림
    const timer = setTimeout(() => {
      onAnimationEnd();
    }, ANIMATION_DURATION);

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <div className="intro-screen">
      <div className="shape-container">
        <div className="shape circle"></div>
        <div className="shape square"></div>
        <div className="shape circle2"></div>
        <div className="shape square2"></div>
      </div>
      <div className="loading-text">
        {" "}
        <span>L</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );
};

export default IntroAnimation;
