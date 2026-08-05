import { defineField, defineType } from 'sanity'

export const album = defineType({
  name: 'album',
  title: 'Álbum de Fotos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Álbum',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Capa do Álbum',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'folderName',
      title: 'Pasta / Categoria',
      type: 'string',
      description: 'Identificador de pasta (ex: sao-joao-2026, copa-2026, geral)',
    }),
    defineField({
      name: 'photos',
      title: 'Fotos do Álbum',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'altText',
              title: 'Texto Alternativo (Acessibilidade)',
              type: 'string',
            }),
          ],
        }
      ],
      description: 'Arraste e solte várias fotos de uma vez diretamente nesta área.',
    }),
    defineField({
      name: 'videos',
      title: 'Vídeos do Álbum',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [
        {
          name: 'videoFile',
          type: 'file',
          title: 'Vídeo (MP4)',
          options: {
            accept: 'video/mp4,video/quicktime',
          },
          fields: [
            defineField({
              name: 'altText',
              title: 'Texto Alternativo (Acessibilidade)',
              type: 'string',
            }),
          ],
        }
      ],
      description: 'Adicione vídeos (MP4) aqui.',
    }),
  ],
})

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Imagem da Galeria',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'altText',
      title: 'Texto Alternativo (Acessibilidade)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'album',
      title: 'Álbum / Pasta',
      type: 'reference',
      to: [{ type: 'album' }],
      description: 'Selecione o álbum ao qual esta foto pertence',
    }),
  ],
})

