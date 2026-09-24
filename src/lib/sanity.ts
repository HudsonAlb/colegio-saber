import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: '25x8kvch',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03', // Use current date (YYYY-MM-DD) to target the latest API version
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
