import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import gsap from 'gsap';
import { CheckCircle, PaperPlaneRight, Spinner, WarningCircle } from '@phosphor-icons/react';
import { scrollToElement } from '../lib/motion';
import { enviarInteresseMatricula, SERIES_POR_SEGMENTO } from '../services/matriculaService';
import type { InteresseMatricula } from '../services/matriculaService';

type CampoObrigatorio = Exclude<keyof InteresseMatricula, 'site'>;
type Erros = Partial<Record<CampoObrigatorio, string>>;

const FORMULARIO_VAZIO: InteresseMatricula = {
  responsavel: '',
  aluno: '',
  idade: '',
  serie: '',
  contato: '',
  site: '',
};

function validar(dados: InteresseMatricula): Erros {
  const erros: Erros = {};
  if (!dados.responsavel.trim()) erros.responsavel = 'Conta pra gente o nome do responsável.';
  if (!dados.aluno.trim()) erros.aluno = 'Conta pra gente o nome do aluno ou da aluna.';

  const idade = Number(dados.idade);
  if (!Number.isInteger(idade) || idade < 1 || idade > 19) erros.idade = 'Informe a idade em anos.';

  if (!dados.serie) erros.serie = 'Escolha a série de interesse.';

  const contato = dados.contato.trim();
  const ehEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contato);
  const ehTelefone = contato.replace(/\D/g, '').length >= 10;
  if (!ehEmail && !ehTelefone) erros.contato = 'Informe um telefone com DDD ou um e-mail.';

  return erros;
}

const LABEL = 'font-serif text-sm font-bold text-brand-charcoal';
const ERRO = 'font-sans text-xs font-bold text-brand-pink-dark flex items-center gap-1';

// text-base: abaixo de 16px o iOS dá zoom na página ao focar o campo
function classesDoCampo(erro?: string) {
  return `w-full px-4 py-3.5 rounded-2xl border-2 font-sans text-base font-semibold text-brand-charcoal outline-none transition-colors duration-500 ${
    erro ? 'border-brand-pink focus:border-brand-pink-dark bg-brand-pink-light' : 'border-brand-light-border focus:border-brand-orange bg-white'
  }`;
}

export default function MatriculaForm() {
  const [dados, setDados] = useState<InteresseMatricula>(FORMULARIO_VAZIO);
  const [erros, setErros] = useState<Erros>({});
  const [status, setStatus] = useState<'preenchendo' | 'enviando' | 'enviado' | 'falhou'>('preenchendo');
  const confirmacaoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status !== 'enviado' || !confirmacaoRef.current) return;
    scrollToElement(confirmacaoRef.current);
    const ctx = gsap.context(() => {
      gsap.fromTo(confirmacaoRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
      gsap.fromTo('.confirmacao-icone', { scale: 0.4 }, { scale: 1, duration: 1.2, ease: 'expo.out' });
    }, confirmacaoRef);
    return () => ctx.revert();
  }, [status]);

  const aoAlterar = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDados((atual) => ({ ...atual, [name]: name === 'idade' ? value.replace(/\D/g, '') : value }));
    setErros((atuais) => ({ ...atuais, [name]: undefined }));
  };

  const aoEnviar = async (e: FormEvent) => {
    e.preventDefault();
    const novosErros = validar(dados);
    setErros(novosErros);
    const primeiroErro = Object.keys(novosErros)[0];
    if (primeiroErro) {
      document.getElementById(primeiroErro)?.focus();
      return;
    }

    setStatus('enviando');
    try {
      await enviarInteresseMatricula(dados);
      setStatus('enviado');
    } catch (erro) {
      console.error('Erro ao enviar o formulário de matrícula:', erro);
      setStatus('falhou');
    }
  };

  if (status === 'enviado') {
    return (
      <div ref={confirmacaoRef} role="status" className="scroll-mt-40 flex flex-col items-center text-center gap-4 py-8">
        <div className="confirmacao-icone w-20 h-20 rounded-full bg-brand-green/15 flex items-center justify-center text-brand-green-dark">
          <CheckCircle size={44} weight="duotone" />
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-charcoal">Recebemos seus dados!</h3>
        <p className="font-sans text-sm md:text-base font-semibold text-brand-charcoal-light leading-relaxed max-w-md">
          Nossa secretaria vai retornar em <strong className="text-brand-charcoal">{dados.contato.trim()}</strong>. Enquanto isso, que tal adiantar o contrato? É só baixar, imprimir e preencher com calma.
        </p>
      </div>
    );
  }

  const enviando = status === 'enviando';

  return (
    <form onSubmit={aoEnviar} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="responsavel" className={LABEL}>Nome do responsável</label>
        <input id="responsavel" name="responsavel" type="text" autoComplete="name" maxLength={150} value={dados.responsavel} onChange={aoAlterar} placeholder="Ex: Maria Silva" aria-required="true" aria-invalid={Boolean(erros.responsavel)} aria-describedby={erros.responsavel ? 'responsavel-erro' : undefined} className={classesDoCampo(erros.responsavel)} />
        {erros.responsavel && <span id="responsavel-erro" role="alert" className={ERRO}><WarningCircle size={14} weight="duotone" className="shrink-0" /> {erros.responsavel}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="aluno" className={LABEL}>Nome do aluno ou da aluna</label>
        <input id="aluno" name="aluno" type="text" autoComplete="off" maxLength={150} value={dados.aluno} onChange={aoAlterar} placeholder="Ex: João Silva" aria-required="true" aria-invalid={Boolean(erros.aluno)} aria-describedby={erros.aluno ? 'aluno-erro' : undefined} className={classesDoCampo(erros.aluno)} />
        {erros.aluno && <span id="aluno-erro" role="alert" className={ERRO}><WarningCircle size={14} weight="duotone" className="shrink-0" /> {erros.aluno}</span>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[8rem_1fr] gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="idade" className={LABEL}>Idade</label>
          <input id="idade" name="idade" type="text" inputMode="numeric" autoComplete="off" maxLength={2} value={dados.idade} onChange={aoAlterar} placeholder="Ex: 6" aria-required="true" aria-invalid={Boolean(erros.idade)} aria-describedby={erros.idade ? 'idade-erro' : undefined} className={classesDoCampo(erros.idade)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="serie" className={LABEL}>Série de interesse em 2027</label>
          <select id="serie" name="serie" value={dados.serie} onChange={aoAlterar} aria-required="true" aria-invalid={Boolean(erros.serie)} aria-describedby={erros.serie ? 'serie-erro' : undefined} className={classesDoCampo(erros.serie)}>
            <option value="">Selecione...</option>
            {SERIES_POR_SEGMENTO.map(({ segmento, series }) => (
              <optgroup key={segmento} label={segmento}>
                {series.map((serie) => (
                  <option key={serie} value={`${segmento} - ${serie}`}>{serie}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {(erros.idade || erros.serie) && (
          <div className="sm:col-span-2 flex flex-col gap-1 -mt-3">
            {erros.idade && <span id="idade-erro" role="alert" className={ERRO}><WarningCircle size={14} weight="duotone" className="shrink-0" /> {erros.idade}</span>}
            {erros.serie && <span id="serie-erro" role="alert" className={ERRO}><WarningCircle size={14} weight="duotone" className="shrink-0" /> {erros.serie}</span>}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contato" className={LABEL}>Contato para retorno</label>
        <input id="contato" name="contato" type="text" autoComplete="tel" maxLength={150} value={dados.contato} onChange={aoAlterar} placeholder="Telefone ou e-mail" aria-required="true" aria-invalid={Boolean(erros.contato)} aria-describedby={erros.contato ? 'contato-erro' : undefined} className={classesDoCampo(erros.contato)} />
        {erros.contato && <span id="contato-erro" role="alert" className={ERRO}><WarningCircle size={14} weight="duotone" className="shrink-0" /> {erros.contato}</span>}
      </div>

      {/* Armadilha para robôs: fora da tela e fora da ordem de tabulação */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="site">Não preencha este campo</label>
        <input id="site" name="site" type="text" tabIndex={-1} autoComplete="off" value={dados.site} onChange={aoAlterar} />
      </div>

      {status === 'falhou' && (
        <div role="alert" className="p-4 rounded-2xl bg-brand-pink-light border-2 border-brand-pink/40 font-sans text-sm font-semibold text-brand-pink-dark leading-relaxed">
          Não conseguimos enviar agora, mas seus dados continuam aqui. Tente de novo em instantes ou ligue para a secretaria: <a href="tel:+558135561122" className="underline whitespace-nowrap">(81) 3556-1122</a>.
        </div>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="font-serif mt-2 w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-orange text-white hover:bg-brand-orange-dark hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 transition-all duration-700 text-base font-bold shadow-[4px_4px_0_0_#2d2a26] border-[3px] border-brand-charcoal cursor-pointer disabled:cursor-wait"
      >
        {enviando ? <Spinner size={20} className="animate-spin" /> : <PaperPlaneRight size={20} weight="bold" />}
        {enviando ? 'Enviando...' : 'Enviar meus dados'}
      </button>

      <p className="font-sans text-xs font-semibold text-brand-charcoal-light/80 text-center leading-relaxed">
        Usamos esses dados apenas para retornar seu contato sobre a matrícula.
      </p>
    </form>
  );
}
