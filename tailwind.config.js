module.exports = {
  purge: [
    './source_33a3c4b.jsx',
    './app.js',
    './form.html',
    './nav.html',
    './nav.js',
    './nav.jsx',
    './form_new.html',
    './targeting-package.html',
    './index_simple.html',
    './index.html',
  ],
  safelist: [
    'modal-overlay', 'modal-content', 'btn-primary', 'btn-secondary', 'tag', 'animate-fadeIn',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1890FF',
        success: '#52C41A',
        warning: '#FAAD14',
        danger: '#FF4D4F',
      },
    },
  },
  plugins: [],
};
