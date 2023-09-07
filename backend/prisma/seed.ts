import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.createMany({
    data: [
      { name: 'Lucas', email: 'ldcs@cin.ufpe.br' },
      { name: 'Marcelo', email: 'mbof@cin.ufpe.br' },
      { name: 'Enderson', email: 'eqg@cin.ufpe.br' },
      { name: 'Pedro Fernandes', email: 'pfbc@cin.ufpe.br' },
      { name: 'Joao Pedro', email: 'jpam@cin.ufpe.br' },
      { name: 'Pedro Rodrigues', email: 'prcg@cin.ufpe.br' },
    ],
  });
  const playlists = await prisma.playlist.createMany({
    data: [
      {
        name: 'Melhores do forró',
        genre: 'Forró',
        description: 'As melhores do forró pernambucano',
        ownerId: 1,
      },
      {
        name: 'Frank Ocean Radio',
        genre: 'R&B',
        description: 'As melhores do frank oceano',
        ownerId: 1,
      },
      {
        name: 'Rock brasileiro',
        genre: 'Rock',
        description: 'ROCK BRASILEIRO PAULERA',
        ownerId: 2,
      },
      { name: 'MPB 90s', genre: 'MPB', description: 'MPB clássicos', ownerId: 3 },
      { name: 'Funk pernambucano', genre: 'Funk', description: 'Funk carioca', ownerId: 4 },
      { name: 'Grime UK', genre: 'Grime', description: 'grime dril', ownerId: 4 },
    ],
  });
  const likes = await prisma.likes.createMany({
    data: [
      { userId: 1, playlistId: 2 },
      { userId: 1, playlistId: 3 },
      { userId: 3, playlistId: 1 },
      { userId: 2, playlistId: 1 },
      { userId: 2, playlistId: 2 },
    ],
  });
  console.log({ users, playlists, likes });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
