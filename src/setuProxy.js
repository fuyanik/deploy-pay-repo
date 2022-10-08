import { createProxyMiddleware } from 'http-proxy-middleware';
     
export default function(app) {
    app.use(createProxyMiddleware('/api/**', { target: 'http://localhost:4242' }));
    app.use(createProxyMiddleware('/otherApi/**', { target: 'http://localhost:4242' }));
};