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

// 스크롤 + URL 동기화 컴포넌트
function ScrollPages() {
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

  // 🟢 새로고침 시 URL 초기화
  useEffect(() => {
    if (window.location.pathname !== "/") {
      window.history.replaceState(null, null, "/");
    }
  }, []);

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
      <Navbar currentSection={currentSection} goToSection={goToSection} />
      <main>
        <section ref={(el) => (sectionRefs.current.home = el)} id="home">
          <Hero goToSection={goToSection} />
        </section>

        <section ref={(el) => (sectionRefs.current.about = el)} id="about">
          <About />
        </section>

        {/* <section ref={(el) => (sectionRefs.current.skills = el)} id="skills">
          <Skills />
        </section> */}

        <section
          ref={(el) => (sectionRefs.current.projects = el)}
          id="projects"
        >
          <Projects />
        </section>

        <section ref={(el) => (sectionRefs.current.contact = el)} id="contact">
          <Contact />
        </section>
      </main>
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
