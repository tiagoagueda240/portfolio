import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Adicionámos ...props para capturar target, rel, e qualquer outra propriedade
export const MagneticButton = ({ children, className, href, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  return (
    <motion.a 
      href={href} 
      ref={ref} 
      onMouseMove={handleMouse} 
      onMouseLeave={() => setPosition({ x: 0, y: 0 })} 
      animate={{ x: position.x, y: position.y }} 
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }} 
      className={`inline-block ${className}`}
      // Aplicamos as propriedades extra aqui (incluindo o target="_blank")
      {...props}
    >
      {children}
    </motion.a>
  );
};