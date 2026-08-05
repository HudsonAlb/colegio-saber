import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  MagnifyingGlassPlus as ZoomIn, 
  Folder, 
  Images, 
  Trophy, 
  Buildings as Building2, 
  Confetti as PartyPopper, 
  Play, 
  CaretLeft as ChevronLeft, 
  CaretRight as ChevronRight, 
  ArrowsLeftRight as MoveHorizontal,
  CircleNotch as Loader2
} from "@phosphor-icons/react";
import { sanityClient, urlFor } from "../lib/sanity";
import { useQuery } from "@tanstack/react-query";

interface AlbumType {
  _id: string;
  title: string;
  slug?: { current: string };
  description?: string;
  coverImage?: any;
  folderName?: string;
  photos?: any[];
}

interface GalleryImage {
  _id: string;
  title: string;
  altText: string;
  image: any;
  album?: {
    _id: string;
    title: string;
    folderName?: string;
  };
}

const fetchSanityAlbums = async (): Promise<AlbumType[]> => {
  try {
    const query = `*[_type == "album"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      description,
      coverImage,
      folderName,
      photos[]{
        ...
      },
      videos[]{
        ...,
        _type == "videoFile" => {
          "url": asset->url,
          "mimeType": asset->mimeType
        }
      }
    }`;
    const res = await sanityClient.fetch(query);
    return res || [];
  } catch {
    return [];
  }
};

const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  try {
    const query = `*[_type == "galleryImage"] | order(_createdAt desc) {
      _id,
      title,
      altText,
      image,
      album->{
        _id,
        title,
        folderName
      }
    }`;
    return await sanityClient.fetch(query);
  } catch {
    return [];
  }
};

// Helper for scroll reveal
const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const AlbumPage = () => {
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryImage | null>(null);

  const { data: sanityAlbums = [], isLoading: isLoadingAlbums } = useQuery({
    queryKey: ['sanityAlbums'],
    queryFn: fetchSanityAlbums,
  });

  const { data: albumPhotos = [], isLoading: isLoadingPhotos, isError } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: fetchGalleryImages,
  });

  const albumsList = sanityAlbums;

  const photosFromAlbums: GalleryImage[] = sanityAlbums.flatMap(album => {
    const p = Array.isArray(album.photos) ? album.photos : [];
    const v = Array.isArray((album as any).videos) ? (album as any).videos : [];
    const mediaList = [...p, ...v];

    return mediaList.map((media: any, index: number) => ({
      _id: `${album._id}-media-${index}`,
      title: album.title,
      altText: media.altText || album.title,
      image: media,
      album: {
        _id: album._id,
        title: album.title,
        folderName: album.folderName,
      }
    }));
  });

  const allPhotos = [...photosFromAlbums, ...albumPhotos];

  const filteredPhotos = selectedAlbumId === "all"
    ? allPhotos
    : allPhotos.filter(photo => photo.album?._id === selectedAlbumId || photo.album?.folderName === selectedAlbumId);

  const getAlbumIcon = (idOrFolder: string) => {
    if (idOrFolder.includes("sao-joao")) return <PartyPopper className="w-5 h-5 text-brand-orange" weight="duotone" />;
    if (idOrFolder.includes("jogos") || idOrFolder.includes("copa")) return <Trophy className="w-5 h-5 text-brand-yellow" weight="duotone" />;
    return <Building2 className="w-5 h-5 text-[#66cc33]" weight="duotone" />;
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const currentIndex = selectedPhoto ? filteredPhotos.findIndex(p => p._id === selectedPhoto._id) : -1;
  
  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0) setSelectedPhoto(filteredPhotos[currentIndex - 1]);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex < filteredPhotos.length - 1) setSelectedPhoto(filteredPhotos[currentIndex + 1]);
  };

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
    
    if (distance > minSwipeDistance) handleNext();
    if (distance < -minSwipeDistance) handlePrev();
  };

  const isLoading = isLoadingAlbums || isLoadingPhotos;

  return (
    <div className="w-full pb-16 relative overflow-hidden bg-transparent">
      
      {/* Hero Section */}
      <section className="px-6 md:px-12 mb-12 lg:mb-16 pt-8">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#d94a00] font-black block mb-3">
              Galeria & Registros
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-charcoal mb-6 leading-[1.15]">
              Nossos <span className="italic font-extrabold text-brand-orange">Momentos</span>
            </h1>
            <p className="font-sans text-brand-charcoal/70 text-base sm:text-lg md:text-xl leading-relaxed font-medium">
              Explore os momentos especiais divididos por eventos e atividades de nossa comunidade escolar.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Seleção de Álbuns */}
      <section className="px-6 md:px-12 mb-12">
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedAlbumId("all")}
              className={`px-5 py-3 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 flex items-center gap-2.5 shadow-sm border-2 ${
                selectedAlbumId === "all"
                  ? "bg-brand-orange text-white border-brand-charcoal shadow-[4px_4px_0_0_#2d2a26] -translate-y-1"
                  : "bg-white text-brand-charcoal border-brand-charcoal/10 hover:border-brand-orange/40 hover:bg-brand-orange/5"
              }`}
            >
              <Images className="w-5 h-5" weight={selectedAlbumId === "all" ? "fill" : "duotone"} />
              <span>Todas as Fotos</span>
            </button>

            {albumsList.map((alb) => {
              const isActive = selectedAlbumId === alb._id || selectedAlbumId === alb.folderName;
              return (
                <button
                  key={alb._id}
                  onClick={() => setSelectedAlbumId(alb._id)}
                  className={`px-5 py-3 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 flex items-center gap-2.5 shadow-sm border-2 ${
                    isActive
                      ? "bg-brand-orange text-white border-brand-charcoal shadow-[4px_4px_0_0_#2d2a26] -translate-y-1"
                      : "bg-white text-brand-charcoal border-brand-charcoal/10 hover:border-brand-orange/40 hover:bg-brand-orange/5"
                  }`}
                >
                  {getAlbumIcon(alb._id || alb.folderName || "")}
                  <span>{alb.title}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <Loader2 className="w-12 h-12 text-brand-orange animate-spin" weight="bold" />
        </div>
      )}


      {/* Grid de Fotos */}
      {!isLoading && !isError && (
        <section className="px-6 md:px-12 mb-24">
          {filteredPhotos.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 text-center max-w-xl mx-auto border-2 border-brand-charcoal/10 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-4 text-brand-orange">
                <Folder className="w-8 h-8" weight="duotone" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-2">
                Álbum em breve
              </h3>
              <p className="font-sans text-brand-charcoal/70 text-sm leading-relaxed font-medium">
                As fotos deste evento serão adicionadas em breve. Fique atento às nossas atualizações!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
              {filteredPhotos.map((photo, i) => (
                <ScrollReveal key={photo._id || i} delay={i * 0.05}>
                  <motion.div
                    onClick={() => setSelectedPhoto(photo)}
                    whileHover="hover"
                    initial="initial"
                    className="group relative rounded-[2rem] overflow-hidden shadow-[4px_4px_0_0_rgba(45,42,38,0.1)] border-2 border-transparent hover:border-brand-charcoal hover:shadow-[6px_6px_0_0_#2d2a26] aspect-square cursor-pointer bg-brand-charcoal/5 transition-all duration-300"
                  >
                    {photo.image?._type === 'videoFile' || photo.image?.url ? (
                      <>
                        <video
                          src={photo.image.url}
                          title={photo.altText || photo.title || "Vídeo da galeria"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          muted
                          loop
                          playsInline
                          onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                          onMouseLeave={(e) => {
                            const v = e.target as HTMLVideoElement;
                            v.pause();
                            v.currentTime = 0;
                          }}
                        />
                        <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20">
                          <Play className="w-3.5 h-3.5" weight="fill" />
                          <span className="font-sans text-[10px] font-bold tracking-widest uppercase">Vídeo</span>
                        </div>
                      </>
                    ) : photo.image && (
                      <motion.img
                        src={urlFor(photo.image).width(600).height(600).url()}
                        alt={photo.altText || photo.title || "Foto da galeria"}
                        variants={{
                          hover: { scale: 1.1 },
                          initial: { scale: 1 }
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}

                    {/* Overlay Escuro */}
                    <div className="absolute inset-0 bg-brand-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-300 flex items-center justify-center">
                      <ZoomIn className="text-white w-10 h-10 drop-shadow-md scale-50 group-hover:scale-100 transition-transform ease-out duration-300" weight="bold" />
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Lightbox / Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-brand-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setSelectedPhoto(null)}
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
                {currentIndex > 0 && (
                  <button
                    onClick={handlePrev}
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full z-[10020] w-14 h-14 rounded-full bg-white/10 border-2 border-white/20 items-center justify-center text-white hover:bg-white/20 transition-colors mr-4"
                  >
                    <ChevronLeft size={32} weight="bold" />
                  </button>
                )}
                
                {currentIndex < filteredPhotos.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-full z-[10020] w-14 h-14 rounded-full bg-white/10 border-2 border-white/20 items-center justify-center text-white hover:bg-white/20 transition-colors ml-4"
                  >
                    <ChevronRight size={32} weight="bold" />
                  </button>
                )}

                {selectedPhoto.image?._type === 'videoFile' || selectedPhoto.image?.url ? (
                  <motion.video
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    src={selectedPhoto.image.url}
                    title={selectedPhoto.altText || selectedPhoto.title || "Vídeo da galeria"}
                    className="max-h-[80vh] max-w-full object-contain rounded-[2rem] shadow-2xl bg-black border-4 border-white/10"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : selectedPhoto.image && (
                  <motion.img
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    src={urlFor(selectedPhoto.image).width(1600).url()}
                    alt={selectedPhoto.altText || selectedPhoto.title || "Foto da galeria"}
                    className="max-h-[80vh] max-w-full object-contain rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/10 relative z-[10010]"
                  />
                )}

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.1 }}
                  className="font-sans text-white/90 text-base lg:text-lg font-bold tracking-wide text-center"
                >
                  {selectedPhoto.title || selectedPhoto.altText}
                </motion.p>

                {/* Dica de Swipe para Mobile */}
                {filteredPhotos.length > 1 && (
                  <motion.div
                    key={`hint-${selectedPhoto._id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="md:hidden flex items-center gap-2 text-white/60 text-sm mt-[-10px] animate-pulse font-sans font-medium"
                  >
                    <MoveHorizontal size={18} weight="bold" />
                    <span>Deslize para ver mais</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default AlbumPage;
