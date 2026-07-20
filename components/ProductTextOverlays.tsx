"use client";

import { motion } from "framer-motion";
import { Product } from "../data/products";

interface ProductTextOverlaysProps {
  product: Product;
}

export default function ProductTextOverlays({ product }: ProductTextOverlaysProps) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-4xl"
      >
        <h1 className="text-7xl md:text-9xl font-black mb-4 tracking-tighter drop-shadow-2xl">
          {product.name}
        </h1>
        <p className="text-2xl md:text-4xl font-light text-white/90 drop-shadow-lg">
          {product.subName}
        </p>
      </motion.div>
    </div>
  );
}
