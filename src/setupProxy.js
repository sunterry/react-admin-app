const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/admin', {
      target: 'http://192.168.1.133:8888',
      changeOrigin: true,
      pathRewrite: {
        '^/admin': '',
      },
    })
  );
};
