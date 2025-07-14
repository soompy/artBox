'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import ArtworkCard from '@/components/ui/ArtworkCard';
import { getAllArtworks } from '@/data/artworks';
import '@/styles/home.scss';

const P5Background = dynamic(() => import('@/components/ui/P5Background'), {
  ssr: false
});

const StarTrail = dynamic(() => import('@/components/ui/StarTrail'), {
  ssr: false
});

export default function HomePage() {
  const allArtworks = getAllArtworks();

  return (
    <div className="home-container">
      <StarTrail className="opacity-80" />
      <Header />
      
      <main className="flex-1">
        <section className="hero-section">
          <P5Background variant="particles" className="opacity-40" />
          <div className="hero-background" />
          <div className="hero-radial" />
          
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <h1>
                <span className="gradient-text">Interactive</span>
                <br />
                <span className="text-white">Art Gallery</span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero-description"
              >
                <span className="font-black-han-sans description-line">디지털 아트와 기술이 만나는 몰입감 있는 전시 공간에서</span>
                <span className="font-black-han-sans description-line">새로운 예술 경험을 만나보세요</span>
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hero-buttons"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                  onClick={() => {
                    if (typeof document !== 'undefined') {
                      document.getElementById('artworks')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="font-black-han-sans">작품 관람하기</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  <span className="font-black-han-sans">전시 소개</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="scroll-indicator"
          >
            <div className="scroll-mouse">
              <div className="scroll-dot" />
            </div>
          </motion.div>
        </section>

        <section id="artworks" className="artworks-section">
          <P5Background variant="dots" className="opacity-20" />
          <div className="artworks-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="section-header"
            >
              <h2>
                <span className="gradient-text">Featured</span> Artworks
              </h2>
              <p>
                <span className="font-black-han-sans">인터랙티브 기술과 창의적 아이디어가 결합된 주요 작품들을 만나보세요</span>
              </p>
            </motion.div>
            
            <div className="artworks-grid">
              {allArtworks.map((artwork, index) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="series-section">
          <P5Background variant="lines" className="opacity-30" />
          <div className="series-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="section-header"
            >
              <h2>
                <span className="gradient-text">출근의 리듬</span> 시리즈
              </h2>
              <p>
                <span className="font-black-han-sans">일상의 순간들을 예술로 담아낸 연작 시리즈</span>
              </p>
            </motion.div>
            
            <div className="series-content">
              <div className="series-grid">
                {[
                  {
                    title: "출근의 리듬",
                    subtitle: "The Rhythm of Commute",
                    status: "완성",
                    color: "from-emerald-500 to-teal-500",
                    description: "현재 전시 중",
                    link: "/artwork/rhythm-of-commute"
                  },
                  {
                    title: "점심의 틈",
                    subtitle: "Lunch Break Gap",
                    status: "완성",
                    color: "from-amber-500 to-orange-500",
                    description: "현재 전시 중",
                    link: "/projects/lunch-break"
                  },
                  {
                    title: "퇴근의 잔상",
                    subtitle: "Afterimage of Departure",
                    status: "기획 중",
                    color: "from-violet-500 to-purple-500",
                    description: "2025년 하반기",
                    link: null
                  },
                  {
                    title: "밤의 공명",
                    subtitle: "Night Resonance",
                    status: "예정",
                    color: "from-indigo-500 to-blue-500",
                    description: "2025년 상반기",
                    link: null
                  }
                ].map((series, index) => (
                  <motion.div
                    key={series.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="series-card"
                  >
                    <div className={`card-background ${series.color.includes('emerald') ? 'emerald' : 
                                                       series.color.includes('amber') ? 'amber' : 
                                                       series.color.includes('violet') ? 'violet' : 'indigo'}`} />
                    
                    <div className="card-header">
                      <div className="card-meta">
                        <span className={`status-badge ${series.color.includes('emerald') ? 'emerald' : 
                                                         series.color.includes('amber') ? 'amber' : 
                                                         series.color.includes('violet') ? 'violet' : 'indigo'}`}>
                          {series.status}
                        </span>
                        <div className="card-number">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                      
                      <h3 className="card-title font-black-han-sans">
                        {series.title}
                      </h3>
                      <p className="card-subtitle">
                        {series.subtitle}
                      </p>
                    </div>
                    
                    <div className="card-footer">
                      <p className="card-description font-black-han-sans">
                        {series.description}
                      </p>
                      
                      <div className="progress-bar">
                        <div 
                          className={`progress-fill ${series.color.includes('emerald') ? 'emerald' : 
                                                      series.color.includes('amber') ? 'amber' : 
                                                      series.color.includes('violet') ? 'violet' : 'indigo'}`}
                          style={{ 
                            width: series.status === '완성' ? '100%' : 
                                   series.status === '작업 중' ? '60%' : 
                                   series.status === '기획 중' ? '30%' : '0%' 
                          }}
                        />
                      </div>
                    </div>
                    
                    {series.link && (
                      <a 
                        href={series.link} 
                        className="absolute inset-0 w-full h-full z-20"
                        aria-label={`${series.title} 작품 보기`}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="series-connection"
              >
                <div className="connection-line" />
                <div className="connection-dot" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="experience-section">
          <P5Background variant="particles" className="opacity-20" />
          <div className="experience-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="section-header"
            >
              <h2>
                <span className="gradient-text">Experience</span> Digital Art
              </h2>
              <p>
                <span className="font-black-han-sans">각 작품은 최신 웹 기술을 활용하여 관람자와 상호작용하며,</span>
                <br />
                <span className="font-black-han-sans">전통적인 예술 감상을 넘어선 새로운 경험을 제공합니다.</span>
              </p>
              
              <div className="tech-grid">
                {[
                  { label: 'GSAP', desc: 'Animation' },
                  { label: 'Three.js', desc: '3D Graphics' },
                  { label: 'p5.js', desc: 'Creative Coding' },
                  { label: 'WebGL', desc: 'GPU Rendering' },
                ].map((tech, index) => (
                  <motion.div
                    key={tech.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="tech-card"
                  >
                    <h3>{tech.label}</h3>
                    <p>{tech.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}