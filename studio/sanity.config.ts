import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Colegio Saber CMS',

  projectId: '25x8kvch',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
