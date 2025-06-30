'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Artwork } from '@/types/artwork';

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
}

export default function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="group relative"
    >
      <Link href={`/projects/${artwork.slug}`}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl gallery-transition hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20">
          <div className="aspect-[4/3] bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-blue-500/10" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="text-6xl opacity-20 group-hover:opacity-40 gallery-transition"
            >
              🎨
            </motion.div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 gallery-transition" />
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {artwork.year}
              </span>
              {artwork.featured && (
                <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-500/30">
                  Featured
                </span>
              )}
            </div>
            
            <h3 className="text-xl font-semibold mb-2 cursor-gradient group-hover:text-white gallery-transition">
              {artwork.title}
            </h3>
            
            {artwork.titleEn && (
              <p className="text-sm text-muted mb-3 italic">
                {artwork.titleEn}
              </p>
            )}
            
            <p className="text-sm text-muted line-clamp-2 mb-4">
              {artwork.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {artwork.technologies.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/70 border border-white/10"
                >
                  {tech}
                </span>
              ))}
              {artwork.technologies.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
                  +{artwork.technologies.length - 3}
                </span>
              )}
            </div>
          </div>
          
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 gallery-transition">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}