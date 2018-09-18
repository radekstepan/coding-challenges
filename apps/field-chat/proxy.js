const https = require('https');
const httpProxy = require('http-proxy');

// Needs to be proxied due to CORS restrictions.
httpProxy.createProxyServer({
  target: 'https://bl4xitf1jl.execute-api.us-east-2.amazonaws.com',
  agent  : https.globalAgent,
  headers: {
    host: '*.execute-api.us-east-2.amazonaws.com'
  },
  changeOrigin: true
}).listen(3001);