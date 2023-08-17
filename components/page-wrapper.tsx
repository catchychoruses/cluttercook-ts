'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

export const PageWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <AnimatePresence mode={'popLayout'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
