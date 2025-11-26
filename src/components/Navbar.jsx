import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./navbar.css";

export default function Navbar({ currentSection, goToSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { sectionId: "home", label: "Home" },
    { sectionId: "about", label: "About" },
    { sectionId: "skills", label: "Skills" },
    { sectionId: "projects", label: "Projects" },
    { sectionId: "contact", label: "Contact" },
  ];

  const isActive = (item) => {
    return currentSection === item.sectionId ? "active" : "";
  };

  const handleClick = (item) => {
    goToSection(item.sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <span className="logo-text">Portfolio</span>
          </div>

          {/* Desktop Nav */}
          <div className="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`nav-button ${isActive(item)}`}
                onClick={() => handleClick(item)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-button"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-nav">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`mobile-nav-button ${isActive(item)}`}
                onClick={() => handleClick(item)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
