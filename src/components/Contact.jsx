import React from "react";
import "./contact.css";
import { useState, useEffect } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 2000); // 3초 후 자동 제거

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // 유효성 검사
  const validateForm = () => {
    const nameRegex = /^(?:[가-힣]{2,}|[A-Za-z]+ [A-Za-z]+)$/;
    const emailRegex = /^[A-Za-z0-9._%+-]{2,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;

    // 이름 검사
    if (!nameRegex.test(formData.name)) {
      alert("❌ 이름 형식이 올바르지 않습니다.");
      return false;
    }

    // 이메일 검사
    if (!emailRegex.test(formData.email)) {
      alert("❌ 이메일 형식이 올바르지 않습니다.");
      return false;
    }

    // 전화번호 검사
    if (!phoneRegex.test(formData.phone)) {
      alert("❌ 전화번호 형식이 올바르지 않습니다.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        timestamp: serverTimestamp(),
      });

      setSubmitStatus("success");
      alert("✅ Your message has been successfully sent!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("❌ Firestore saving error:", error);
      setSubmitStatus("error");
      alert("Failed to send a message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Get In <span className="highlight">Touch</span>
          </h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Feel free to reach out if you want to collaborate or just want to
            chat
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <div>
              <h3 className="contact-info-title">Let's Talk</h3>
              <p className="contact-info-text">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions. Feel free to get in
                touch.
              </p>
            </div>

            {/* Contact Details */}
            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-icon contact-icon-purple">
                  <FiMail />
                </div>
                <div>
                  <h4>Email</h4>
                  <a href="https://mail.google.com" target="_blank">
                    kiteu23@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon contact-icon-blue">
                  <FiPhone />
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>+82 (10) 5656-4267</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon contact-icon-green">
                  <FiMapPin />
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Seoul, Korea</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="social-media">
              <h4 className="social-title">Follow Me</h4>
              <div className="social-links">
                <a
                  href="https://open.kakao.com/o/s6Kr8J3h"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <RiKakaoTalkFill />
                </a>
                <a
                  href="https://github.com/kiteu123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FaGithub />
                </a>
                {/* <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FaTwitter />
                </a> */}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Your Digit</label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="010-1234-1234"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Hello, I'd like to discuss..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "전송 중 . . ." : "전송하기"}
              </button>
              {submitStatus === "success" && (
                <p className="success-message">
                  ✅ Your message has been successfully sent!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="error-message">
                  ❌ During saving, there was an error...
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 KYW. All rights reserved.</p>
      </footer>
    </section>
  );
}
