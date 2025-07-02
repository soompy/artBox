'use client';

import { motion } from 'framer-motion';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import ArtworkCard from '@/components/ui/ArtworkCard';
import { getAllArtworks } from '@/data/artworks';

export default function Home() {
  const allArtworks = getAllArtworks();

  return (
    <div className="relative min-h-screen pb-80">
      <Header />
      
      <main className="pt-20">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="cursor-gradient">Interactive</span>
                <br />
                <span className="text-white">Art Gallery</span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-muted mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                <span className="font-black-han-sans">디지털 아트와 기술이 만나는 몰입감 있는 전시 공간에서</span>
                <br />
                <span className="font-black-han-sans">새로운 예술 경험을 만나보세요</span>
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl font-semibold text-white gallery-transition hover:shadow-2xl hover:shadow-purple-500/25"
                  onClick={() => document.getElementById('artworks')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="font-black-han-sans">작품 관람하기</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass-effect rounded-2xl font-medium text-white gallery-transition hover:bg-white/5"
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
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
            </div>
          </motion.div>
        </section>

        <section id="artworks" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="cursor-gradient">Featured</span> Artworks
              </h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                <span className="font-black-han-sans">인터랙티브 기술과 창의적 아이디어가 결합된 주요 작품들을 만나보세요</span>
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        <section className="py-20 px-6 bg-gradient-to-br from-purple-900/10 to-blue-900/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="cursor-gradient">Experience</span> Digital Art
              </h2>
              <p className="text-lg text-muted mb-8">
                <span className="font-black-han-sans">각 작품은 최신 웹 기술을 활용하여 관람자와 상호작용하며,</span>
                <br />
                <span className="font-black-han-sans">전통적인 예술 감상을 넘어선 새로운 경험을 제공합니다.</span>
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
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
                    className="glass-effect rounded-xl p-4"
                  >
                    <h3 className="font-semibold text-white mb-1">{tech.label}</h3>
                    <p className="text-sm text-muted">{tech.desc}</p>
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
