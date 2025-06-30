'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="border-t border-white/10 bg-black/20 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">IA</span>
              </div>
              <h3 className="font-semibold cursor-gradient">
                Interactive Art Gallery
              </h3>
            </div>
            <p className="text-sm text-muted mb-4">
              디지털 아트와 기술이 만나는 몰입감 있는 인터랙티브 전시 공간
            </p>
            <p className="text-xs text-white/40">
              © 2024 Interactive Art Gallery. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-white">Navigation</h4>
            <div className="space-y-2">
              <a
                href="/"
                className="block text-sm text-muted hover:text-white gallery-transition"
              >
                Exhibition
              </a>
              <a
                href="/about"
                className="block text-sm text-muted hover:text-white gallery-transition"
              >
                About
              </a>
              <a
                href="/contact"
                className="block text-sm text-muted hover:text-white gallery-transition"
              >
                Contact
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-white">Technology</h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'GSAP', 'Three.js', 'p5.js', 'Framer Motion'].map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/70 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}