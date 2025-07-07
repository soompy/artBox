'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import '@/styles/contact.scss';

const FloatingShapes = dynamic(() => import('@/components/ui/FloatingShapes'), {
  ssr: false
});

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직 (추후 구현)
    console.log('Form submitted:', formData);
    alert('메시지가 전송되었습니다!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-container">
      <FloatingShapes className="opacity-70" />
      <Header />
      
      <main className="contact-main">
        <div className="container">
          {/* 헤더 섹션 */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="contact-header"
          >
            <h1>Contact</h1>
            <p>
              <span className="font-black-han-sans">작품에 대한 문의나 협업 제안이 있으시면 언제든 연락해 주세요.</span>
            </p>
          </motion.section>

          <div className="contact-grid">
            
            {/* 연락처 정보 섹션 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="contact-info"
            >
              <h2 className="contact-info-title">
                <span className="font-black-han-sans">연락처 정보</span>
              </h2>

              {/* 이메일 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="contact-card"
              >
                <div className="card-content">
                  <div className="icon-wrapper email">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="card-text">
                    <h3>Email</h3>
                    <a href="mailto:yzsumin@naver.com">
                      yzsumin@naver.com
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* 소셜 미디어 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="contact-card"
              >
                <div className="card-content">
                  <div className="icon-wrapper social">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div className="card-text">
                    <h3>Portfolio & Social</h3>
                    <div>
                      <a href="https://github.com/soompy">https://github.com/soompy</a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 위치 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="contact-card"
              >
                <div className="card-content">
                  <div className="icon-wrapper location">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="card-text">
                    <h3>Location</h3>
                    <p className="location-text">Seoul, South Korea</p>
                  </div>
                </div>
              </motion.div>

              {/* 작업 시간 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="contact-card"
              >
                <div className="card-content">
                  <div className="icon-wrapper time">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="card-text">
                    <h3>Working Hours</h3>
                    <p className="time-text">Mon - Fri, 9AM - 6PM KST</p>
                    <p className="time-note font-black-han-sans">보통 24시간 내 답변드립니다</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* 연락 폼 섹션 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="contact-form-section"
            >
              <div className="form-container">
                <h2 className="form-title">
                  <span className="font-black-han-sans">메시지 보내기</span>
                </h2>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">
                      <span className="font-black-han-sans">이름</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="홍길동"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <span className="font-black-han-sans">이메일</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="example@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">
                      <span className="font-black-han-sans">제목</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="문의 제목을 입력해주세요"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">
                      <span className="font-black-han-sans">메시지</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="문의 내용을 상세히 적어주세요..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="submit-button"
                  >
                    <span className="font-black-han-sans">메시지 전송</span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}