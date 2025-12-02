import React, { useRef, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
// import Skills from "./components/Skills"; // 현재 사용 안 함
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import IntroAnimation from "./components/IntroAnimation";

// 스크롤 + URL 동기화 컴포넌트
function ScrollPages() {
  // 1. 인트로 상태 추가: 인트로가 진행 중인지 여부
  const [isLoading, setIsLoading] = useState(true);
  // 2. 인트로 화면을 숨길 준비가 되었는지 (페이드 아웃 효과를 위한 상태)
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const sectionRefs = useRef({
    home: null,
    about: null,
    // skills: null,
    projects: null,
    contact: null,
  });

  const sections = ["home", "about", "projects", "contact"];
  const navigate = useNavigate();

  // 인트로 애니메이션이 끝났을 때 호출되는 함수
  const handleIntroEnd = () => {
    // 1. 페이드 아웃 클래스 적용 (CSS Transition 시작)
    setIsFadingOut(true);

    // 2. CSS 페이드 아웃(0.5초) 후 완전히 로딩 완료 상태로 전환
    setTimeout(() => {
      setIsLoading(false);
    }, 500); // IntroAnimation.css의 transition 시간과 일치
  };

  // 스크롤 시 현재 섹션 감지 & URL 동기화
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (let sec of sections) {
        const ref = sectionRefs.current[sec];
        if (
          ref &&
          scrollPos >= ref.offsetTop &&
          scrollPos < ref.offsetTop + ref.offsetHeight
        ) {
          if (currentSection !== sec) {
            setCurrentSection(sec);
            navigate(sec === "home" ? "/" : `/${sec}`, { replace: true });
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection, navigate]);

  // Navbar 클릭 시 이동
  const goToSection = (sec) => {
    const ref = sectionRefs.current[sec];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" });
      navigate(sec === "home" ? "/" : `/${sec}`);
    }
  };

  return (
    <>
      {/* 1. 인트로 애니메이션 조건부 렌더링 */}
      {isLoading && (
        <IntroAnimation
          onAnimationEnd={handleIntroEnd}
          className={isFadingOut ? "fade-out" : ""}
        />
      )}

      {/* 2. 메인 콘텐츠는 로딩이 완료된 후에 렌더링되거나 (옵션)
               로딩 상태에 따라 스타일을 적용할 수 있습니다.
               현재는 로딩이 완료되면 인트로 컴포넌트 자체가 사라집니다. */}
      {/* 3. 인트로 화면이 완전히 사라지면 Navbar와 Main 콘텐츠 표시 */}

      {!isLoading && (
        <>
          {/* 스크롤을 막지 않도록 Navbar는 항상 상단에 두되, 
                       로딩 완료 후에만 기능을 활성화해야 합니다. */}
          <Navbar currentSection={currentSection} goToSection={goToSection} />
          <main>
            <section ref={(el) => (sectionRefs.current.home = el)} id="home">
              <Hero goToSection={goToSection} />
            </section>

            <section ref={(el) => (sectionRefs.current.about = el)} id="about">
              <About />
            </section>

            <section
              ref={(el) => (sectionRefs.current.projects = el)}
              id="projects"
            >
              <Projects />
            </section>

            <section
              ref={(el) => (sectionRefs.current.contact = el)}
              id="contact"
            >
              <Contact />
            </section>
          </main>
        </>
      )}
    </>
  );
}

// App 루트
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<ScrollPages />} />
      </Routes>
    </Router>
  );
}
