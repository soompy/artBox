'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

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
    <div className="min-h-screen bg-black text-white pb-80">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* 헤더 섹션 */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Contact
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              <span className="font-black-han-sans">작품에 대한 문의나 협업 제안이 있으시면 언제든 연락해 주세요.</span>
            </p>
          </motion.section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            
            {/* 연락처 정보 섹션 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                <span className="font-black-han-sans">연락처 정보</span>
              </h2>

              {/* 이메일 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Email</h3>
                    <a 
                      href="mailto:artist@interactive-gallery.com" 
                      className="text-purple-300 hover:text-purple-200 transition-colors"
                    >
                      artist@interactive-gallery.com
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* 소셜 미디어 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Portfolio & Social</h3>
                    <div className="flex space-x-4 mt-2">
                      <a href="#" className="text-blue-300 hover:text-blue-200 transition-colors">Instagram</a>
                      <a href="#" className="text-blue-300 hover:text-blue-200 transition-colors">Behance</a>
                      <a href="#" className="text-blue-300 hover:text-blue-200 transition-colors">GitHub</a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 위치 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-green-900/20 to-teal-900/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Location</h3>
                    <p className="text-green-300">Seoul, South Korea</p>
                  </div>
                </div>
              </motion.div>

              {/* 작업 시간 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-orange-900/20 to-red-900/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Working Hours</h3>
                    <p className="text-orange-300">Mon - Fri, 9AM - 6PM KST</p>
                    <p className="text-sm text-gray-400 font-black-han-sans">보통 24시간 내 답변드립니다</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* 연락 폼 섹션 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  <span className="font-black-han-sans">메시지 보내기</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      <span className="font-black-han-sans">이름</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="홍길동"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      <span className="font-black-han-sans">이메일</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      <span className="font-black-han-sans">제목</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="문의 제목을 입력해주세요"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      <span className="font-black-han-sans">메시지</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="문의 내용을 상세히 적어주세요..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
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