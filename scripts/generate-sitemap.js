import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {globby} from 'globby';
import news from '../src/assets/news.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  const siteUrl = 'https://mobilidade.lts.app.br';
  
  const pages = await globby([
    'src/pages/**/*.jsx',
    '!src/pages/**/[*.jsx',
    '!src/pages/index.d.ts',
    '!src/pages/404.jsx',
  ]);
  
  const routeConfigurations = {
    '/': {changefreq: 'daily', priority: 0.8},
    '/home': {changefreq: 'daily', priority: 0.8},
    '/lines': {changefreq: 'daily', priority: 0.8},
    '/news': {changefreq: 'weekly', priority: 0.7},
    '/guide': {changefreq: 'weekly', priority: 0.7},
    '/live': {changefreq: 'weekly', priority: 0.7},
  };
  
  const defaultConfiguration = {
    changefreq: 'monthly',
    priority: 0.5,
  };
  
  const staticUrls = pages
    .map((page) => {
      const stats = fs.statSync(page);
      const lastmod = stats.mtime.toISOString();
      
      let path = page
        .replace('src/pages', '')
        .replace('.jsx', '')
        .replace('/index', '');
      
      const route = (path === '/home' || path === '') ? '/' : path;
      const config = routeConfigurations[route] || defaultConfiguration;
      
      return `
  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority}</priority>
  </url>`;
    })
    .join('');
  
  const newsUrls = news
    .map((item) => {
      return `
  <url>
    <loc>${siteUrl}/news/${item.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    })
    .join('');
  
  const sitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${newsUrls}
  </urlset>`;
  
  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemap.trim());
}

generateSitemap()
  .then(() => {
    console.log("OK! Sitemap gerado com sucesso.");
  })
  .catch((error) => {
    console.log("Ocorreu um erro na geração do script.");
    console.error(error);
  });
