module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:2026',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
} 