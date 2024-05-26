// used to create a proxy-middleware
// the proxy-middleware is used to avoid CORS(Cross-Origin-Resource-Sharing) error 
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://norvig.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  );
};
