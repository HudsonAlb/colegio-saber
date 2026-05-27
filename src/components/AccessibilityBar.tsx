import { useState, useEffect } from 'react';
import { Eye, Type, ArrowDown } from 'lucide-react';

export default function AccessibilityBar() {
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('saber_high_contrast') === 'true';
  });

  const [fontScale, setFontScale] = useState(() => {
    return parseInt(localStorage.getItem('saber_font_scale') || '1', 10);
  });

  // Efeito para aplicar/remover Alto Contraste
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
      localStorage.setItem('saber_high_contrast', 'true');
    } else {
      document.documentElement.classList.remove('high-contrast');
      localStorage.setItem('saber_high_contrast', 'false');
    }
  }, [highContrast]);

  // Efeito para aplicar a Escala de Fonte no html
  useEffect(() => {
    const scales = ['100%', '112.5%', '125%', '137.5%', '150%'];
    const scaleValue = scales[fontScale - 1] || '100%';
    document.documentElement.style.fontSize = scaleValue;
    localStorage.setItem('saber_font_scale', String(fontScale));
  }, [fontScale]);

  // Efeito de escuta para atalho de teclado Alt + 1
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Aceita Alt + 1
      if (e.altKey && e.key === '1') {
        e.preventDefault();
        jumpToContent();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const jumpToContent = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const increaseFont = () => {
    setFontScale(prev => Math.min(prev + 1, 5));
  };

  const decreaseFont = () => {
    setFontScale(prev => Math.max(prev - 1, 1));
  };

  const resetFont = () => {
    setFontScale(1);
  };

  return (
    <div 
      className="w-full bg-brand-charcoal text-brand-light/80 border-b border-white/10 relative z-50 text-[10px] uppercase font-sans tracking-widest no-print"
      role="complementary"
      aria-label="Controle de Acessibilidade"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Atalho de Salto */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={jumpToContent}
            className="flex items-center gap-1.5 hover:text-brand-orange focus:text-brand-orange focus:outline-none transition-colors duration-300 font-semibold"
            aria-label="Ir direto para o conteúdo principal da página"
          >
            <ArrowDown size={10} className="text-brand-orange animate-bounce" />
            <span>Ir para o Conteúdo (Alt + 1)</span>
          </button>
        </div>

        {/* Ferramentas de Contraste e Fonte */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          
          {/* Alto Contraste */}
          <button
            type="button"
            onClick={() => setHighContrast(!highContrast)}
            className="flex items-center gap-1.5 hover:text-brand-orange focus:text-brand-orange focus:outline-none transition-colors duration-300 font-semibold cursor-pointer"
            aria-label="Ativar ou desativar o modo de alto contraste para leitura"
          >
            <Eye size={12} className={highContrast ? 'text-brand-yellow' : 'text-brand-orange'} />
            <span>Alto Contraste</span>
          </button>

          {/* Divisor */}
          <span className="hidden sm:inline w-[1px] h-3.5 bg-white/20"></span>

          {/* Ajuste de Fonte */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-brand-light/60 font-light lowercase">
              <Type size={11} />
              fonte:
            </span>
            <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
              <button
                type="button"
                onClick={decreaseFont}
                disabled={fontScale === 1}
                className="px-2 py-1 rounded bg-white/5 hover:bg-brand-orange hover:text-white disabled:opacity-40 disabled:hover:bg-white/5 disabled:hover:text-brand-light/80 transition-colors duration-300 font-bold focus:outline-none focus:bg-brand-orange"
                title="Diminuir tamanho do texto"
                aria-label="Diminuir tamanho do texto"
              >
                A-
              </button>
              <button
                type="button"
                onClick={resetFont}
                className="px-2 py-1 rounded bg-white/5 hover:bg-brand-orange hover:text-white transition-colors duration-300 font-bold focus:outline-none focus:bg-brand-orange"
                title="Tamanho de texto padrão"
                aria-label="Resetar tamanho do texto para o padrão"
              >
                A
              </button>
              <button
                type="button"
                onClick={increaseFont}
                disabled={fontScale === 5}
                className="px-2 py-1 rounded bg-white/5 hover:bg-brand-orange hover:text-white disabled:opacity-40 disabled:hover:bg-white/5 disabled:hover:text-brand-light/80 transition-colors duration-300 font-bold focus:outline-none focus:bg-brand-orange"
                title="Aumentar tamanho do texto"
                aria-label="Aumentar tamanho do texto"
              >
                A+
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
