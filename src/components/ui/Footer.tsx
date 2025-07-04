'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="relative w-full border-t border-white/10 bg-black/20 backdrop-blur-xl"
    >
      <div className="w-full px-6 py-12">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">IA</span>
            </div>
            <h3 className="font-semibold cursor-gradient">
              Interactive Art Gallery
            </h3>
          </div>
          <p className="text-sm text-muted mb-4 font-black-han-sans">
            디지털 아트와 기술이 만나는 몰입감 있는 인터랙티브 전시 공간
          </p>
          <p className="text-xs text-white/40">
            © 2024 Interactive Art Gallery. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}