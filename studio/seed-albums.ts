import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'sgjvym8i',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const albums = [
  {
    _id: 'sao-joao-2026',
    _type: 'album',
    title: 'São João 2026',
    slug: { _type: 'slug', current: 'sao-joao-2026' },
    folderName: 'sao-joao-2026',
    description: 'Celebrando nossas tradições culturais com muita alegria, danças e comidas típicas.',
  },
  {
    _id: 'copa-2026',
    _type: 'album',
    title: 'Copa do Mundo 2026',
    slug: { _type: 'slug', current: 'copa-2026' },
    folderName: 'copa-2026',
    description: 'União, torcida e espírito esportivo contagiando todos os nossos estudantes.',
  },
  {
    _id: 'escola-geral',
    _type: 'album',
    title: 'Escola (Geral)',
    slug: { _type: 'slug', current: 'escola-geral' },
    folderName: 'escola-geral',
    description: 'Registros do dia a dia, atividades pedagógicas e vivências no Colégio Assunção.',
  },
];

async function seed() {
  console.log('Criando documentos de álbuns no Sanity...');
  for (const album of albums) {
    try {
      const res = await client.createIfNotExists(album);
      console.log(`Álbum '${res.title}' criado/verificado com sucesso! ID: ${res._id}`);
    } catch (err) {
      console.error(`Erro ao criar álbum ${album.title}:`, err);
    }
  }
}

seed();
