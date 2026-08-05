import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, CaretLeft as ChevronLeft, CaretRight as ChevronRight, X, ArrowsLeftRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export interface CarouselPhoto {
  src: string;
  alt: string;
  label: string;
  category?: string;
}

interface PhotoCarouselProps {
  photos: CarouselPhoto[];
}

const ScrollReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const PhotoCarousel = ({ photos }: PhotoCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    align: "start",
    containScroll: "trimSnaps"
  });
  
  // States for Lightbox
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  if (!photos || photos.length === 0) return null;

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Lightbox Handlers
  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => setSelectedPhotoIndex(null);

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  // Touch Swipe in Lightbox
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance) nextPhoto();
    if (distance < -minSwipeDistance) prevPhoto();
  };

  return (
    <section className="py-16 md:py-24 bg-brand-light relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#d94a00] font-black block mb-3">
            Galeria de Fotos
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-charcoal leading-tight">
            Nossos <span className="italic font-extrabold text-brand-orange">Momentos</span>
          </h2>
        </ScrollReveal>

        {/* Carousel Container */}
        <ScrollReveal delay={0.2} className="relative group/carousel">
          <div className="overflow-hidden pb-8 pt-4 -mx-4 px-4 cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex gap-4 md:gap-6 touch-pan-y">
              {photos.map((photo, i) => (
                <div 
                  key={i} 
                  className="flex-[0_0_280px] sm:flex-[0_0_320px] md:flex-[0_0_350px] lg:flex-[0_0_400px] min-w-0"
                >
                  <div 
                    className="relative rounded-[2rem] overflow-hidden shadow-sm h-[300px] sm:h-[350px] lg:h-[400px] group border-4 border-transparent hover:border-brand-orange/20 bg-brand-charcoal/5 transition-all duration-300"
                    onClick={() => openLightbox(i)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform ease-out duration-500 group-hover:scale-105 pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border-2 border-brand-charcoal shadow-[4px_4px_0_0_#2d2a26] hover:shadow-[6px_6px_0_0_#2d2a26] hover:-translate-y-1 hover:bg-brand-orange hover:text-white items-center justify-center text-brand-charcoal transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft size={24} weight="bold" />
          </button>
          <button
            onClick={scrollNext}
            className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border-2 border-brand-charcoal shadow-[4px_4px_0_0_#2d2a26] hover:shadow-[6px_6px_0_0_#2d2a26] hover:-translate-y-1 hover:bg-brand-orange hover:text-white items-center justify-center text-brand-charcoal transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronRight size={24} weight="bold" />
          </button>
        </ScrollReveal>

        <div className="flex justify-center mt-8 lg:mt-12">
          <Link
            to="/album"
            className="font-serif inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-3.5 rounded-full font-bold text-lg border-2 border-brand-charcoal shadow-[4px_4px_0_0_#2d2a26] hover:shadow-[6px_6px_0_0_#2d2a26] hover:-translate-y-1 transition-all duration-300"
          >
            Ver Galeria Completa
            <ArrowRight size={20} weight="bold" />
          </Link>
        </div>

      </div>

      {/* Lightbox / Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedPhotoIndex !== null && photos[selectedPhotoIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-brand-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
              onClick={closeLightbox}
            >
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-[10010] w-12 h-12 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-colors"
                aria-label="Fechar galeria"
              >
                <X size={24} weight="bold" />
              </motion.button>

              <div
                className="relative max-w-5xl w-full flex flex-col items-center gap-6 z-[10005]"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {/* Setas de navegação (Desktop) */}
                {selectedPhotoIndex > 0 && (
                  <button
                    onClick={prevPhoto}
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full z-[10020] w-14 h-14 rounded-full bg-white/10 border-2 border-white/20 items-center justify-center text-white hover:bg-white/20 transition-colors mr-4"
                  >
                    <ChevronLeft size={32} weight="bold" />
                  </button>
                )}
                
                {selectedPhotoIndex < photos.length - 1 && (
                  <button
                    onClick={nextPhoto}
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-full z-[10020] w-14 h-14 rounded-full bg-white/10 border-2 border-white/20 items-center justify-center text-white hover:bg-white/20 transition-colors ml-4"
                  >
                    <ChevronRight size={32} weight="bold" />
                  </button>
                )}

                <motion.img
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  src={photos[selectedPhotoIndex].src}
                  alt={photos[selectedPhotoIndex].alt || "Foto da galeria"}
                  className="max-h-[80vh] max-w-full object-contain rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/10 relative z-[10010]"
                  draggable={false}
                />

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.1 }}
                  className="font-sans text-white/90 text-base lg:text-lg font-bold tracking-wide text-center"
                >
                  {photos[selectedPhotoIndex].label || photos[selectedPhotoIndex].alt}
                </motion.p>

                {/* Dica de Swipe para Mobile */}
                {photos.length > 1 && (
                  <motion.div
                    key={`hint-${selectedPhotoIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="md:hidden flex items-center gap-2 text-white/60 text-sm mt-[-10px] animate-pulse font-sans font-medium"
                  >
                    <ArrowsLeftRight size={18} weight="bold" />
                    <span>Deslize para ver mais</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default PhotoCarousel;
