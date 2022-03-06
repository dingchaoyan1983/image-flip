const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:3001',
      // target: 'http://192.168.0.166:3068/mock/77',
      changeOrigin: true,
    }),
  );
};
