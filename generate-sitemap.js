import { blogPosts } from './src/blog/posts.js'
import fs from 'fs'
import path from 'path'

// Generate sitemap with blog posts
function generateSitemap() {
  const baseUrl = 'https://jordan-schnur.github.io'
  const today = new Date().toISOString().split('T')[0]

  const staticPages = [
    { url: '/', changefreq: 'monthly', priority: '1.0', lastmod: today },
  ]

  const blogListPage = [
    { url: '/blog', changefreq: 'weekly', priority: '0.8', lastmod: today }
  ]

  const blogPostPages = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: today
  }))

  const allPages = [...staticPages, ...blogListPage, ...blogPostPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

  // Write to public directory
  const publicDir = path.join(process.cwd(), 'public')
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
  console.log('✓ Sitemap generated with', allPages.length, 'URLs')
}

generateSitemap()

