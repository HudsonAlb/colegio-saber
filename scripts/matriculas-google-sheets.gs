/**
 * Recebe o formulário de interesse de matrícula do site e grava cada envio em uma planilha Google.
 *
 * COMO INSTALAR (feito uma única vez, na conta Google da escola):
 *  1. Crie uma planilha em branco em sheets.google.com. Ela continua privada: o site não lê a planilha.
 *  2. Na planilha, abra Extensões > Apps Script, apague o conteúdo e cole este arquivo inteiro. Salve.
 *  3. Clique em Implantar > Nova implantação > tipo "App da Web".
 *       - Executar como: Eu
 *       - Quem pode acessar: Qualquer pessoa
 *  4. Autorize o acesso quando o Google pedir e copie a URL que termina em /exec.
 *  5. Coloque essa URL em VITE_MATRICULA_SHEET_URL (arquivo .env ou variáveis da Vercel) e publique o site.
 *
 * Se editar este arquivo depois, publique em Implantar > Gerenciar implantações > Editar > Nova versão.
 * Assim a URL continua a mesma.
 */

var CABECALHO = ['Data', 'Responsável', 'Aluno(a)', 'Idade', 'Série de interesse', 'Contato para retorno'];
var FUSO_HORARIO = 'America/Recife';
var TAMANHO_MAXIMO = 150;

function doPost(e) {
  try {
    var dados = JSON.parse(e.postData.contents);

    // Campo invisível para pessoas: se veio preenchido, é robô. Responde ok e não grava.
    if (dados.site) return responder({ ok: true });

    var linha = montarLinha(dados);
    var aba = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (aba.getLastRow() === 0) {
      aba.appendRow(CABECALHO);
      aba.setFrozenRows(1);
    }
    aba.appendRow(linha);
    return responder({ ok: true });
  } catch (erro) {
    console.error(erro);
    return responder({ ok: false, error: 'Não foi possível registrar o envio.' });
  }
}

function montarLinha(dados) {
  var idade = Number(dados.idade);
  if (!Number.isInteger(idade) || idade < 1 || idade > 19) throw new Error('Idade inválida');

  return [
    comoTexto(Utilities.formatDate(new Date(), FUSO_HORARIO, 'dd/MM/yyyy HH:mm')),
    campoObrigatorio(dados.responsavel),
    campoObrigatorio(dados.aluno),
    idade,
    campoObrigatorio(dados.serie),
    campoObrigatorio(dados.contato),
  ];
}

function campoObrigatorio(valor) {
  var texto = String(valor == null ? '' : valor).trim().slice(0, TAMANHO_MAXIMO);
  if (!texto) throw new Error('Campo obrigatório vazio');
  return comoTexto(texto);
}

// O formulário é público: o apóstrofo inicial faz a planilha tratar o valor como texto puro.
// Impede que um envio como "=IMPORTXML(...)" vire fórmula e preserva telefones como "+55 81...".
function comoTexto(texto) {
  return "'" + texto;
}

function responder(corpo) {
  return ContentService.createTextOutput(JSON.stringify(corpo)).setMimeType(ContentService.MimeType.JSON);
}
