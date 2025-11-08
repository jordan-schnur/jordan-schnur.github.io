import { marked } from 'marked'
import fm from 'front-matter'
import { blogPosts } from './posts.js'

// Configure marked for security and styling
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false
})

export class BlogManager {
  constructor() {
    this.posts = []
    this.currentPost = null
  }

  async loadPosts() {
    const loadedPosts = []

    for (const post of blogPosts) {
      try {
        const response = await fetch(`/blogs/${post.filename}`)
        const markdown = await response.text()
        const parsed = fm(markdown)

        loadedPosts.push({
          slug: post.slug,
          ...parsed.attributes,
          content: parsed.body,
          html: marked(parsed.body)
        })
      } catch (error) {
        console.error(`Error loading blog post ${post.slug}:`, error)
      }
    }

    // Sort by date (newest first)
    this.posts = loadedPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
    return this.posts
  }

  async getPost(slug) {
    if (!this.posts.length) {
      await this.loadPosts()
    }

    return this.posts.find(post => post.slug === slug)
  }

  getFeaturedPosts() {
    return this.posts.filter(post => post.featured).slice(0, 3)
  }

  formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  getReadingTime(content) {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readingTime} min read`
  }
}

export const blogManager = new BlogManager()

