"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "../data/products";
import { motion, AnimatePresence } from "framer-motion";

interface ProductBottleSequenceProps {
  product: Product;
}

export default function ProductBottleSequence({ product }: ProductBottleSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const preloadImages = async () => {
      setLoaded(false);
      const loadedImages: HTMLImageElement[] = [];
      const totalFrames = product.frameCount;
      
      const promises = [];
      for (let i = 1; i <= totalFrames; i++) {
        promises.push(
          new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            // Format: ezgif-frame-001.jpg
            const indexStr = i.toString().padStart(3, "0");
            img.src = `${product.folderPath}/ezgif-frame-${indexStr}.jpg`;
            img.onload = () => resolve(img);
            img.onerror = () => reject();
          })
        );
      }

      try {
        const results = await Promise.all(promises);
        if (!isCancelled) {
          setImages(results);
          setLoaded(true);
        }
      } catch (e) {
        console.error("Failed to load images", e);
      }
    };

    preloadImages();
    return () => {
      isCancelled = true;
    };
  }, [product]);

  useEffect(() => {
    if (!loaded || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions based on first image to maintain aspect ratio
    canvas.width = images[0].width || 800;
    canvas.height = images[0].height || 800;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const img = images[Math.floor(frameRef.current) % images.length];
      if (img) {
        // Draw image covering the canvas (object-fit: cover equivalent)
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
      }
      
      // Advance frame
      frameRef.current += 0.5; // Adjust speed here

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [loaded, images]);

  return (
    <div className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {!loaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </motion.div>
        )}
      </AnimatePresence>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-80 mix-blend-screen"
        style={{ filter: "contrast(1.2) brightness(1.1)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />
    </div>
  );
}
