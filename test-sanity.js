import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '25x8kvch',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function run() {
  const albums = await client.fetch('*[_type == "album"]');
  console.log("Albums:", JSON.stringify(albums, null, 2));
  const images = await client.fetch('*[_type == "galleryImage"]');
  console.log("Gallery Images:", JSON.stringify(images, null, 2));
}

run();
