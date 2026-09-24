import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Depoimentos dos Pais',
  type: 'document',
  fields: [
    defineField({
      name: 'parentName',
      title: 'Nome do Pai/Mãe ou Responsável',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'studentInfo',
      title: 'Informações do Aluno (ex: Pai do Lucas - 3º Ano)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Depoimento',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Avaliação (1 a 5 estrelas)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'avatar',
      title: 'Foto / Avatar (Opcional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'approved',
      title: 'Aprovado para exibição no site?',
      type: 'boolean',
      description: 'Marque para aprovar e publicar este depoimento na Home do site.',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Data de Envio',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'parentName',
      subtitle: 'studentInfo',
      approved: 'approved',
      media: 'avatar',
    },
    prepare({ title, subtitle, approved, media }) {
      return {
        title: `${title || 'Sem nome'} ${approved ? '✅ (Aprovado)' : '⏳ (Pendente)'}`,
        subtitle: subtitle || '',
        media,
      }
    },
  },
})
