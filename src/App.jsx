import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import { FullPage, Slide } from "react-full-page";

export default function App() {
  const [currentSection, setCurrentSection] = useState("home");

  // ★ 슬라이드를 제어할 수 있는 ref 생성
  const fullPageRef = useRef(null);

  const handleSlideChange = ({ to }) => {
    const sectionIds = ["home", "about", "skills", "projects", "contact"];
    setCurrentSection(sectionIds[to]);
  };

  // ★ Navbar에서 호출할 함수
  const goToSection = (sectionId) => {
    const indexMap = {
      home: 0,
      about: 1,
      skills: 2,
      projects: 3,
      contact: 4,
    };

    const slideIndex = indexMap[sectionId];
    if (fullPageRef.current) {
      fullPageRef.current.scrollToSlide(slideIndex);
      setCurrentSection(sectionId);
    }
  };

  return (
    <Router>
      <Navbar currentSection={currentSection} goToSection={goToSection} />

      <Routes>
        <Route
          path="/"
          element={
            <FullPage
              ref={fullPageRef} // ★ ref 연결
              afterChange={handleSlideChange}
              controls
              controlsProps={{ className: "my-controls" }}
              duration={300}
              easing="easeInQuad"
            >
              <Slide>
                <div id="home">
                  <Hero goToSection={goToSection} />
                </div>
              </Slide>
              <Slide>
                <div id="about">
                  <About />
                </div>
              </Slide>
              <Slide>
                <div id="skills">
                  <Skills />
                </div>
              </Slide>
              <Slide>
                <div id="projects">
                  <Projects />
                </div>
              </Slide>
              <Slide>
                <div id="contact">
                  <Contact />
                </div>
              </Slide>
            </FullPage>
          }
        />

        {/* 다른 페이지는 그대로 유지 */}
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
