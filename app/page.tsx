"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "../data/products";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductBottleSequence from "../components/ProductBottleSequence";
import ProductTextOverlays from "../components/ProductTextOverlays";
import CartModal from "../components/CartModal";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const product = products[currentIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
    // Update global background
    document.documentElement.style.setProperty('--product-gradient', product.gradient);
  }, [currentIndex, product]);

  const nextProduct = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const prevProduct = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  return (
    <main className="relative min-h-screen">
      <Navbar />
      
      {/* Product Experience Area */}
      <div className="relative h-screen w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <ProductBottleSequence product={product} />
            <ProductTextOverlays product={product} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 z-20">
          <button 
            onClick={prevProduct}
            className="p-4 rounded-full bg-white/5 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all hover:scale-110"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 z-20">
          <button 
            onClick={nextProduct}
            className="p-4 rounded-full bg-white/5 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all hover:scale-110"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 opacity-70"
        >
          <span className="text-sm font-medium tracking-widest uppercase">Discover More</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </div>

      {/* Details Section */}
      <AnimatePresence mode="wait">
        <motion.section
          key={`details-${product.id}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 max-w-7xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{product.detailsSection.title}</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {product.detailsSection.description}
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                {product.stats.map((stat, i) => (
                  <div key={i} className="bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                    <p className="text-3xl font-bold" style={{ color: product.themeColor }}>{stat.val}</p>
                    <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative aspect-square bg-white/5 rounded-[3rem] border border-white/10 p-12 overflow-hidden group">
              <div 
                className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500" 
                style={{ background: product.gradient }}
              />
              <div className="relative h-full flex flex-col justify-center space-y-8 z-10">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 text-xl md:text-2xl font-medium">
                    <div className="w-3 h-3 rounded-full" style={{ background: product.themeColor }} />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Freshness Section */}
      <section className="py-24 bg-black/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">{product.freshnessSection.title}</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {product.freshnessSection.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Buy Now Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-black/40 rounded-[3rem] border border-white/10 p-8 md:p-16 text-center backdrop-blur-xl relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full h-2"
            style={{ background: product.gradient }}
          />
          
          <h2 className="text-5xl md:text-6xl font-black mb-4">Experience the Purity.</h2>
          <p className="text-2xl mb-12 text-gray-400">Order your {product.name} today.</p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
            {product.buyNowSection.processingParams.map((param, i) => (
              <div key={i} className="px-6 py-3 rounded-full bg-white/10 text-sm font-medium border border-white/10">
                {param}
              </div>
            ))}
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="group relative px-12 py-6 rounded-full text-2xl font-bold text-black overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-2xl"
            style={{ background: product.themeColor, boxShadow: `0 0 40px ${product.themeColor}80` }}
          >
            <span className="relative z-10 flex items-center gap-4">
              Add to Cart • {product.price}
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          <div className="mt-12 text-sm text-gray-500 space-y-2">
            <p>{product.buyNowSection.deliveryPromise}</p>
            <p>{product.buyNowSection.returnPolicy}</p>
          </div>
        </div>
      </section>

      {/* Flavor Jump Pill */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 flex gap-2">
        {products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setCurrentIndex(i)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              currentIndex === i 
                ? "bg-white text-black" 
                : "text-white hover:bg-white/20"
            }`}
          >
            {p.name.split(" ")[0]}
          </button>
        ))}
      </div>

      <Footer />

      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        product={product} 
      />
    </main>
  );
}
