import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverable = true }) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -5, scale: 1.01 } : {}}
      transition={{ duration: 0.2 }}
      className={`glass-card rounded-2xl overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};
