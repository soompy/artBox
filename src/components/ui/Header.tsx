'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">IA</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold cursor-gradient">
                  Interactive Art Gallery
                </h1>
                <p className="text-xs text-muted">Digital Art Exhibition</p>
              </div>
            </motion.div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-white/70 hover:text-white gallery-transition"
            >
              Exhibition
            </Link>
            <Link
              href="/about"
              className="text-sm text-white/70 hover:text-white gallery-transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-white/70 hover:text-white gallery-transition"
            >
              Contact
            </Link>
          </nav>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}