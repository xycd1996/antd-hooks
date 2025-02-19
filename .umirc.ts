import { defineConfig } from 'dumi'

export default defineConfig({
  title: '婚礼纪Components',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  publicPath: './',
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  proxy: {
    '/hlj': {
      target: 'http://dev-api.hunliji.com/',
      changeOrigin: true,
      pathRewrite: { '^/hlj': '' },
    },
  },
  locale: {
    antd: true,
  },
})
