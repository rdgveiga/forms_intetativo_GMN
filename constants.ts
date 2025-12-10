import { QuestionStep } from './types';

export const TOTAL_STEPS = 11;

export const SURVEY_STEPS: QuestionStep[] = [
  {
    id: 1,
    type: 'intro',
    title: 'Coloque sua empresa no topo do Google',
    description: 'Responda algumas perguntas rápidas e receba um checklist pronto para aplicar hoje e começar a receber contatos de novos clientes todos os dias',
    subtitle: 'Você já usa o Perfil de Empresa no Google?\n(Google Meu Negócio)',
    layout: 'list',
    options: [
      { id: 'sim', label: 'Sim!', emoji: '🙌' },
      { id: 'nao', label: 'Ainda não', emoji: '😐' },
    ],
  },
  {
    id: 2,
    type: 'single',
    title: 'Sua empresa aparece nas buscas do Google quando alguém procura sua especialidade?',
    layout: 'list',
    options: [
      { id: 'topo', label: 'Sim, entre os primeiros resultados (no topo)', emoji: '🙌' },
      { id: 'demora', label: 'Aparece, mas demora (precisa rolar e procurar meu nome)', emoji: '😐' },
      { id: 'nao_aparece', label: 'Não aparece', emoji: '😭' },
    ],
  },
  {
    id: 3,
    type: 'single',
    title: 'Você tem atualizado e otimizado as informações do seu perfil com frequência?',
    layout: 'cards-side',
    options: [
      { id: 'nunca', label: 'Nunca atualizei ou otimizei', emoji: '🤔' },
      { id: 'sempre', label: 'Sempre que necessário', emoji: '😉' },
    ],
  },
  {
    id: 4,
    type: 'single',
    title: 'Quantas avaliações sua empresa tem no Google?',
    layout: 'list',
    options: [
      { id: 'nenhuma', label: 'Nenhuma' },
      { id: '1-10', label: 'De 1 a 10' },
      { id: '11-30', label: 'De 11 a 30' },
      { id: 'mais-30', label: 'Mais de 30' },
    ],
  },
  {
    id: 5,
    type: 'info',
    title: '91% das pessoas pesquisam antes de comprar ou contratar',
    description: 'Milhares de empresas já estão usando o Google para atrair clientes.',
    subtitle: 'Fonte: Think with Google Brasil',
  },
  {
    id: 6,
    type: 'single',
    title: 'Você sente que já perdeu clientes por não aparecer no topo do Google?',
    layout: 'cards-side',
    options: [
      { id: 'sim_certeza', label: 'Sim, com certeza', emoji: '😭' },
      { id: 'nunca_pensei', label: 'Nunca parei para pensar nisso', emoji: '🤯' },
    ],
  },
  {
    id: 7,
    type: 'multiple',
    title: 'Quais desses problemas você já percebeu?',
    subtitle: 'Pode marcar mais de uma opção.',
    layout: 'list',
    options: [
      { id: 'desatualizado', label: 'Perfil desatualizado e com poucas avaliações' },
      { id: 'nao_topo', label: 'Meu perfil não aparece no topo das buscas' },
      { id: 'concorrentes', label: 'Perco espaço para concorrentes' },
    ],
  },
  {
    id: 8,
    type: 'multiple',
    title: 'Qual dessas metas você quer atingir ainda esse mês?',
    subtitle: 'Pode marcar mais de uma opção.',
    layout: 'list',
    options: [
      { id: 'subir_topo', label: 'Subir minha empresa para o topo do Google' },
      { id: '20_avaliacoes', label: 'Conseguir pelo menos 20 avaliações 5 estrelas' },
      { id: 'atrair_clientes', label: 'Atrair mais clientes da minha cidade' },
      { id: 'presenca_online', label: 'Melhorar minha presença online' },
    ],
  },
  {
    id: 9,
    type: 'single',
    title: 'O quanto você entende sobre Google Meu Negócio e otimização local?',
    layout: 'grid',
    options: [
      { id: 'sei', label: 'Sei como otimizar', emoji: '🤓' },
      { id: 'pouca', label: 'Pouca coisa', emoji: '🙂' },
      { id: 'tentei', label: 'Já tentei, mas não deu certo', emoji: '😏' },
      { id: 'nada', label: 'Nada', emoji: '🥺' },
    ],
  },
  {
    id: 10,
    type: 'single',
    title: 'O que mais te impede hoje de melhorar seu posicionamento no Google?',
    layout: 'list',
    options: [
      { id: 'tempo', label: 'Falta de tempo' },
      { id: 'comeco', label: 'Não sei por onde começar' },
      { id: 'impossivel', label: 'Não sabia que isso era possível' },
    ],
  },
  {
    id: 11,
    type: 'result',
    title: 'Seu guia está pronto!',
    description: 'Você vai receber o guia com o passo a passo para destacar seu perfil no Google e se tornar a primeira escolha dos clientes que já estão procurando exatamente pelos seus serviços.',
  }
];