'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

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
    <div className="min-h-screen bg-black text-white pb-80">
      <Header />
      <div ref={containerRef} className="container mx-auto px-6 py-20 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* 좌측 - 상자 이미지와 아이디어 문구들 */}
          <div className="relative">
            <motion.div
              style={{ scale: boxScale, opacity: boxOpacity }}
              className="relative"
            >
              {/* 상자 이미지 */}
              <motion.div
                initial={{ rotateY: -30, rotateX: 10 }}
                animate={{ rotateY: 0, rotateX: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-80 h-80 mx-auto mb-12 relative perspective-1000"
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-2xl shadow-2xl transform-gpu rotate-y-12 rotate-x-6">
                  <div className="absolute inset-4 bg-black/20 rounded-xl backdrop-blur-sm border border-white/20">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        ART
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 아이디어 문구들 */}
              <div className="space-y-6">
                {ideaTexts.map((text, index) => (
                  <IdeaText key={index} text={text} delay={index * 0.3} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* 우측 - 작가소개와 작가의 말 */}
          <div className="space-y-12">
            {/* 작가소개 */}
            <motion.section
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                작가소개
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  디지털 아트의 새로운 지평을 열어가는 인터랙티브 아티스트입니다. 
                  전통적인 예술의 경계를 넘어서 기술과 예술의 융합을 통해 
                  관객과 소통하는 작품을 만들어갑니다.
                </p>
                <p>
                  웹 기술, 3D 그래픽스, 인터랙티브 미디어를 활용하여 
                  디지털 시대의 새로운 예술 경험을 제공합니다. 
                  각 작품은 관객의 참여를 통해 완성되는 살아있는 예술작품입니다.
                </p>
              </div>
            </motion.section>

            {/* 작가의 말 */}
            <motion.section
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                작가의 말
              </h2>
              <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <blockquote className="text-gray-200 leading-relaxed text-lg italic">
                  "예술은 시대와 함께 진화해야 한다고 믿습니다. 
                  디지털 시대의 예술은 단순히 보는 것에서 그치지 않고, 
                  관객이 직접 참여하고 상호작용할 수 있어야 합니다.
                  <br /><br />
                  저의 작품들은 기술을 도구로 사용하되, 
                  궁극적으로는 인간의 감정과 경험을 다루고자 합니다. 
                  각각의 인터랙션이 새로운 이야기를 만들어내고, 
                  그 순간만의 특별한 예술 경험이 탄생하기를 바랍니다."
                </blockquote>
                <cite className="block mt-6 text-right text-purple-300 font-medium">
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
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold text-white">Contact</h3>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="mailto:artist@example.com" 
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Email
                </a>
                <a 
                  href="#" 
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
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
      className="flex items-center space-x-4"
    >
      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse" />
      <span className="text-lg text-gray-300 font-medium">{text}</span>
    </motion.div>
  );
}