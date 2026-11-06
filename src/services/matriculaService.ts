// Envia o formulário de interesse para a planilha Google da escola, por meio do
// Web App do Apps Script (código e instruções em scripts/matriculas-google-sheets.gs).
const SHEET_URL: string | undefined = import.meta.env.VITE_MATRICULA_SHEET_URL;

export const SERIES_POR_SEGMENTO = [
  {
    segmento: 'Educação Infantil',
    series: ['Grupo 3', 'Grupo 4', 'Grupo 5'],
  },
  {
    segmento: 'Ensino Fundamental I',
    series: ['1º Ano', '2º Ano', '3º Ano', '4º Ano', '5º Ano'],
  },
  {
    segmento: 'Ensino Fundamental II',
    series: ['6º Ano', '7º Ano', '8º Ano', '9º Ano'],
  },
];

export interface InteresseMatricula {
  responsavel: string;
  aluno: string;
  idade: string;
  serie: string;
  contato: string;
  // Campo invisível para pessoas: só robôs preenchem (o Apps Script descarta esses envios)
  site: string;
}

export async function enviarInteresseMatricula(dados: InteresseMatricula): Promise<void> {
  if (!SHEET_URL) throw new Error('VITE_MATRICULA_SHEET_URL não definida (veja o arquivo .env)');

  const resposta = await fetch(SHEET_URL, {
    method: 'POST',
    // text/plain evita o preflight de CORS, que o Apps Script não responde
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(dados),
  });

  const corpo = await resposta.json();
  if (!corpo.ok) throw new Error(corpo.error ?? 'Envio recusado pela planilha');
}
