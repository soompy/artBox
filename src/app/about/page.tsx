'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import '@/styles/about.scss';

const ideaTexts = [
  "창의성은 경계를 허무는 것",
  "예술은 디지털과 만나 새로운 가능성을 열다",
  "인터랙티브 아트로 관객과 소통하다",
  "기술과 감성의 조화로운 만남",
  "미래를 그리는 디지털 아티스트"
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const boxScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const boxOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div className="about-container">
      <Header />
      <div ref={containerRef} className="about-main">
        <div className="about-grid">
          
          {/* 좌측 - 상자 이미지와 아이디어 문구들 */}
          <div className="left-column">
            <motion.div
              style={{ scale: boxScale, opacity: boxOpacity }}
              className="relative"
            >
              {/* 상자 이미지 */}
              <motion.div
                initial={{ rotateY: -30, rotateX: 10 }}
                animate={{ rotateY: 0, rotateX: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="art-box-container"
              >
                <div className="art-box">
                  <div className="art-box-inner">
                    <div className="art-text">
                      ART
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 아이디어 문구들 */}
              <div className="ideas-list">
                {ideaTexts.map((text, index) => (
                  <IdeaText key={index} text={text} delay={index * 0.3} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* 우측 - 작가소개와 작가의 말 */}
          <div className="right-column">
            {/* 작가소개 */}
            <motion.section
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="content-section"
            >
              <h2 className="section-title purple-gradient">
                <span className="font-black-han-sans">작가소개</span>
              </h2>
              <div className="section-content">
                <p>
                  <span className="font-black-han-sans">디지털 아트의 새로운 지평을 열어가는 인터랙티브 아티스트입니다.</span> 
                  <span className="font-black-han-sans">전통적인 예술의 경계를 넘어서 기술과 예술의 융합을 통해</span> 
                  <span className="font-black-han-sans">관객과 소통하는 작품을 만들어갑니다.</span>
                </p>
                <p>
                  <span className="font-black-han-sans">웹 기술, 3D 그래픽스, 인터랙티브 미디어를 활용하여</span> 
                  <span className="font-black-han-sans">디지털 시대의 새로운 예술 경험을 제공합니다.</span> 
                  <span className="font-black-han-sans">각 작품은 관객의 참여를 통해 완성되는 살아있는 예술작품입니다.</span>
                </p>
              </div>
            </motion.section>

            {/* 작가의 말 */}
            <motion.section
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="content-section quote-section"
            >
              <h2 className="section-title cyan-gradient">
                <span className="font-black-han-sans">작가의 말</span>
              </h2>
              <div className="quote-container">
                <blockquote className="quote-text">
                  <span className="font-black-han-sans">"예술은 시대와 함께 진화해야 한다고 믿습니다.</span> 
                  <span className="font-black-han-sans">디지털 시대의 예술은 단순히 보는 것에서 그치지 않고,</span> 
                  <span className="font-black-han-sans">관객이 직접 참여하고 상호작용할 수 있어야 합니다.</span>
                  <br /><br />
                  <span className="font-black-han-sans">저의 작품들은 기술을 도구로 사용하되,</span> 
                  <span className="font-black-han-sans">궁극적으로는 인간의 감정과 경험을 다루고자 합니다.</span> 
                  <span className="font-black-han-sans">각각의 인터랙션이 새로운 이야기를 만들어내고,</span> 
                  <span className="font-black-han-sans">그 순간만의 특별한 예술 경험이 탄생하기를 바랍니다."</span>
                </blockquote>
                <cite className="quote-author">
                  - Interactive Artist
                </cite>
              </div>
            </motion.section>

            {/* 연락처 */}
            <motion.section
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="contact-section"
            >
              <h3 className="section-title">Contact</h3>
              <div className="contact-buttons">
                <a 
                  href="mailto:artist@example.com" 
                  className="contact-btn email-btn"
                >
                  Email
                </a>
                <a 
                  href="#" 
                  className="contact-btn portfolio-btn"
                >
                  Portfolio
                </a>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// 아이디어 문구 컴포넌트
function IdeaText({ text, delay }: { text: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay }}
      className="idea-item"
    >
      <div className="idea-dot" />
      <span className="idea-text font-black-han-sans">{text}</span>
    </motion.div>
  );
}