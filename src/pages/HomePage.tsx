import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight } from '@phosphor-icons/react';
import Hero from '../components/Hero';
import HighlightsSection from '../components/HighlightsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CalendarioSection from '../components/CalendarioSection';
import { BookOpen, GraduationCap, PenNib, Images } from '@phosphor-icons/react';
import PhotoCarousel from '../components/PhotoCarousel';
import { useQuery } from '@tanstack/react-query';
import { sanityClient, urlFor } from '../lib/sanity';
import tourBiblioteca from '../assets/tour_biblioteca.webp';
import tourBosque from '../assets/tour_bosque.webp';
import tourEsportes from '../assets/tour_esportes.webp';
import tourLaboratorio from '../assets/tour_laboratorio.webp';

const defaultPhotos = [
  { src: tourBiblioteca, alt: "Biblioteca do Colégio Saber com amplo acervo e espaço para estudos.", label: "Biblioteca Interativa", category: "Infraestrutura" },
  { src: tourBosque, alt: "Área verde e bosque para atividades ao ar livre e contato com a natureza.", label: "Bosque e Área Verde", category: "Meio Ambiente" },
  { src: tourEsportes, alt: "Quadra poliesportiva coberta para práticas esportivas e eventos.", label: "Complexo Esportivo", category: "Esportes" },
  { src: tourLaboratorio, alt: "Laboratório de ciências moderno e equipado para aulas práticas.", label: "Laboratório de Ciências", category: "Educação" },
  { src: "/robotics_class.webp", alt: "Alunos na aula de robótica e inovação tecnológica.", label: "Aula de Robótica", category: "Inovação" },
];

const fetchRecentPhotos = async () => {
  try {
    const query = `*[_type == "galleryImage"] | order(_createdAt desc)[0...8] {
      title, altText, image, album->{ title }
    }`;
    const galleryImages = await sanityClient.fetch(query) || [];
    
    let allPhotos = galleryImages
      .filter((img: any) => img.image)
      .map((img: any) => ({
        src: urlFor(img.image).url(),
        alt: img.altText || "",
        label: img.title || img.album?.title || "Galeria"
      }));

    if (allPhotos.length < 8) {
      const albumQuery = `*[_type == "album"] | order(_createdAt desc)[0...4] { title, photos[0...6] }`;
      const albums = await sanityClient.fetch(albumQuery) || [];
      albums.forEach((alb: any) => {
        if (alb.photos) {
          alb.photos.forEach((photo: any) => {
            if (photo.asset) {
              allPhotos.push({
                src: urlFor(photo).url(),
                alt: alb.title || "Nossos Momentos",
                label: alb.title || "Nossos Momentos"
              });
            }
          });
        }
      });
    }

    return allPhotos.slice(0, 8);
  } catch (error) {
    console.error("Erro ao buscar fotos do Sanity:", error);
    return [];
  }
};

export default function HomePage() {
  const quickAccessRef = useRef<HTMLDivElement>(null);

  const { data: homePhotos = [], isLoading } = useQuery({
    queryKey: ['recentPhotosHome'],
    queryFn: fetchRecentPhotos,
  });

  const carouselPhotos = homePhotos.length > 0 ? homePhotos : defaultPhotos;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = quickAccessRef.current?.querySelectorAll('.quick-access-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quickAccessRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="page-home">
      <Hero />
      <HighlightsSection />
      <CalendarioSection />
      <TestimonialsSection />

      {/* Photo Carousel Section */}
      {!isLoading && (
        <PhotoCarousel photos={carouselPhotos} />
      )}

      {/* Quick Access Block for Parents */}
      <section ref={quickAccessRef} className="py-[var(--spacing-fluid-section)] bg-brand-light relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-[var(--spacing-fluid-md)]">
          {/* Decorative Section Header */}
          <div className="text-center mb-[var(--spacing-fluid-lg)] max-w-2xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-orange-dark font-black block mb-3">
              Acesso Rápido
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal leading-tight">
              O que você procura?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-[var(--spacing-fluid-md)]">
            {[
              {
                tag: 'Sobre Nós',
                title: 'Tradição & Visão',
                desc: 'Conheça nossa trajetória dedicada à formação de cidadãos completos e éticos.',
                link: '/historia',
                btnText: 'Ler História',
                bg: 'bg-[#fff5ee]',
                border: 'border-[#fcd2af]/60',
                tagColor: 'text-[#d94a00]',
                icon: <BookOpen size={40} weight="duotone" className="text-[#d94a00]" />,
                colSpan: 'md:col-span-5 lg:col-span-4' // Asymmetric: smaller card
              },
              {
                tag: 'Ensino',
                title: 'Segmentos Escolares',
                desc: 'Conheça nossas fases pedagógicas da Educação Infantil ao Ensino Médio.',
                link: '/segmentos',
                btnText: 'Ver Ensino',
                bg: 'bg-[#f0f8fc]',
                border: 'border-[#b9dcf4]/80',
                tagColor: 'text-[#0284c7]',
                icon: <GraduationCap size={40} weight="duotone" className="text-[#0284c7]" />,
                colSpan: 'md:col-span-7 lg:col-span-8' // Asymmetric: wider card for rhythm
              },
              {
                tag: 'Admissões',
                title: 'Matrículas Abertas',
                desc: 'Preencha nossa ficha de matrícula digital e agende o teste diagnóstico.',
                link: '/admissao',
                btnText: 'Iniciar Inscrição',
                bg: 'bg-[#fefce8]',
                border: 'border-[#fae69e]',
                tagColor: 'text-[#d89f00]',
                icon: <PenNib size={40} weight="duotone" className="text-[#d89f00]" />,
                colSpan: 'md:col-span-6 lg:col-span-6' // Changed to 6 for balance
              },
              {
                tag: 'Galeria',
                title: 'Nossos Momentos',
                desc: 'Veja as fotos e vídeos dos eventos e do dia a dia no Colégio.',
                link: '/album',
                btnText: 'Ver Galeria',
                bg: 'bg-[#f4f0ff]',
                border: 'border-[#e0d4ff]',
                tagColor: 'text-[#6b21a8]',
                icon: <Images size={40} weight="duotone" className="text-[#6b21a8]" />,
                colSpan: 'md:col-span-6 lg:col-span-6' // Added Gallery card
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className={`quick-access-card p-[var(--spacing-fluid-md)] rounded-[2.5rem] border-4 ${card.bg} ${card.border} bento-hover-lift flex flex-col justify-between h-full min-h-[18rem] ${card.colSpan}`}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className={`font-serif text-sm uppercase tracking-wider font-bold ${card.tagColor} px-4 py-1.5 rounded-full bg-white/60 border border-white/50 shadow-sm backdrop-blur-sm`}>
                      {card.tag}
                    </span>
                    <div className="p-3 bg-white/60 rounded-2xl shadow-sm backdrop-blur-sm border border-white/50">
                      {card.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-brand-charcoal font-bold mb-3">{card.title}</h3>
                    <p className="font-sans text-sm text-brand-charcoal-light/90 font-semibold leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
                <Link to={card.link} className={`flex items-center gap-2 text-sm uppercase font-black ${card.tagColor} hover:opacity-70 transition-opacity mt-6 group`}>
                  {card.btnText} <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
