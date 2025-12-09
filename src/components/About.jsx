import React, { useState } from "react";
import { FaCommentDots, FaHammer, FaLightbulb } from "react-icons/fa";
import { TbDeviceVisionPro } from "react-icons/tb";
import "./about.css";

export default function About() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null); // 각 카드별 확장 상태 관리

  const cards = [
    {
      icon: <FaCommentDots className="service-icon service-icon-purple" />,
      title: "ABOUT ME",
      brief: "사용자 중심의 프론트 엔드 개발자",
      description:
        "안녕하세요! 저는 React를 주로 사용하는 프론트엔드 개발자입니다.",
      expandedContent: (
        <>
          <h4>더 깊은 이야기</h4>
          <p>
            디자인 감각과 논리적인 사고를 결합해 사용자에게 편안한 경험을
            제공하는 것을 목표로 합니다. React, CSS 애니메이션, UX/UI 설계에
            강점을 가지고 있습니다.
          </p>
        </>
      ),
    },
    {
      icon: <FaHammer className="service-icon service-icon-blue" />,
      title: "EXPERIENCE",
      brief: "React, Node.js 기반 웹 개발",
      description:
        "다양한 프로젝트에서 반응형 UI와 애니메이션 구현 경험이 있으며, REST API 연동도 가능합니다.",
      expandedContent: (
        <>
          <h4>프로젝트 경험</h4>
          <p>
            실무 수준의 반응형 웹, SPA(단일 페이지 앱), 백엔드 연동 작업을
            수행했습니다. Next.js, Express, MongoDB 등도 다룰 수 있습니다.
          </p>
        </>
      ),
    },
    {
      icon: <FaLightbulb className="service-icon service-icon-pink" />,
      title: "VALUE",
      brief: "꾸준함과 협업",
      description:
        "문제 해결보다 ‘함께 해결하는 과정’을 중요하게 생각합니다. 지속 가능한 개발 문화를 지향합니다.",
      expandedContent: (
        <>
          <h4>가치관</h4>
          <p>
            혼자보다 함께 성장하는 것을 즐깁니다. 코드 리뷰와 피드백 문화를 통해
            더 나은 결과물을 만들어내는 데 집중합니다.
          </p>
        </>
      ),
    },
    {
      icon: <TbDeviceVisionPro className="service-icon service-icon-orange" />,
      title: "VISION",
      brief: "UI/UX에 특화된 개발자",
      description:
        "사용자가 ‘편하다’ 느끼는 인터페이스를 만들고, 기술로 일상을 더 즐겁게 바꾸는 것이 제 목표입니다.",
      expandedContent: (
        <>
          <h4>앞으로의 목표</h4>
          <p>
            인터랙션 디자인과 모션 UI에 더 깊이 있는 개발자로 성장하고 싶습니다.
            장기적으로는 사용자 중심의 프로덕트 디자인에도 기여할 계획입니다.
          </p>
        </>
      ),
    },
  ];

  const handleCardClick = (index) => {
    // if (expandedIndex !== null) return; // 확장된 상태일 때는 클릭 비활성화
    setActiveIndex(activeIndex === index ? null : index);

    setExpandedIndex(null);
  };

  const handleExpand = (e, index) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    setExpandedIndex(index);
  };

  const handleCollapse = (e) => {
    e.stopPropagation();
    setExpandedIndex(null);
    setActiveIndex(null);
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            About <span className="highlight">Me</span>
          </h2>
          <div className="section-divider"></div>
        </div>

        <div className="about-services">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`service-card ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              {/* --- 확장된 상태 --- */}
              {expandedIndex === index ? (
                <div className="inner-card">
                  {card.expandedContent}
                  <button
                    className="collapse-btn"
                    onClick={(e) => handleCollapse(e)}
                  >
                    돌아가기
                  </button>
                </div>
              ) : (
                /* --- 일반 상태 --- */
                <>
                  {card.icon}
                  <h3>{card.title}</h3>
                  <p
                    className={`service-brief ${
                      activeIndex === index ? "visible" : ""
                    }`}
                  >
                    {card.brief}
                  </p>
                  <p
                    className={`service-description ${
                      activeIndex === index ? "visible" : ""
                    }`}
                  >
                    {card.description}
                  </p>

                  {activeIndex === index && (
                    <button
                      className="expand-btn"
                      onClick={(e) => handleExpand(e, index)}
                    >
                      자세히 보기
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
