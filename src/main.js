// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import * as bootstrap from 'bootstrap'

// Import custom styles
import './style.css'

// Import blog system
import { router } from './blog/router.js'
import { blogManager } from './blog/manager.js'

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
  // Typing animation
  const phrases = [
    'Senior Software Engineer II',
    'Full-Stack Developer',
    'AI Advocate',
    'Team Leader',
    'Problem Solver'
  ]
  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false
  const typedTextElement = document.getElementById('typed-text')

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting) {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1)
      charIndex--
    } else {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1)
      charIndex++
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      setTimeout(() => { isDeleting = true }, 2000)
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
    }

    const typingSpeed = isDeleting ? 50 : 100
    setTimeout(typeEffect, typingSpeed)
  }

  setTimeout(typeEffect, 500)

  // Theme Toggle with System Preference Detection
  const themeToggle = document.getElementById('theme-toggle')
  const htmlElement = document.documentElement
  const lightIcon = document.querySelector('.theme-icon-light')
  const darkIcon = document.querySelector('.theme-icon-dark')

  // Function to get system preference
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Function to update theme
  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme)
    if (theme === 'dark') {
      lightIcon.classList.add('d-none')
      darkIcon.classList.remove('d-none')
    } else {
      lightIcon.classList.remove('d-none')
      darkIcon.classList.add('d-none')
    }
  }

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme')
  const currentTheme = savedTheme || getSystemTheme()
  setTheme(currentTheme)

  // Listen for system theme changes if no manual preference is set
  if (!savedTheme) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    })
  }

  themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme')
    const newTheme = theme === 'light' ? 'dark' : 'light'

    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  })

  // Scroll Progress Indicator
  const scrollProgress = document.getElementById('scroll-progress')
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (window.scrollY / windowHeight) * 100
    scrollProgress.style.width = scrolled + '%'
  })

  // Back to Top Button
  const backToTopButton = document.getElementById('back-to-top')
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible')
    } else {
      backToTopButton.classList.remove('visible')
    }
  })

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })

  // Particle Background Effect
  const canvas = document.getElementById('particles-canvas')
  if (canvas) {
    const ctx = canvas.getContext('2d')
    let particles = []
    let animationFrameId

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        const theme = document.documentElement.getAttribute('data-theme')
        ctx.fillStyle = theme === 'dark' ? `rgba(77, 158, 255, ${this.opacity})` : `rgba(13, 110, 253, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function createParticles() {
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function connectParticles() {
      const maxDistance = 100
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const theme = document.documentElement.getAttribute('data-theme')
            const opacity = (1 - distance / maxDistance) * 0.2
            ctx.strokeStyle = theme === 'dark' ? `rgba(77, 158, 255, ${opacity})` : `rgba(13, 110, 253, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    createParticles()
    animate()

    // Pause animation when not visible for performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate()
        } else {
          cancelAnimationFrame(animationFrameId)
        }
      })
    })

    observer.observe(canvas)
  }

  // Handle navbar link clicks for smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href')
      if (targetId !== '#' && targetId !== '') {
        e.preventDefault()

        // Check if we're on a blog page
        const currentPath = window.location.pathname
        const isOnBlogPage = currentPath.startsWith('/blog')

        if (isOnBlogPage) {
          // Navigate to homepage with hash
          window.location.href = '/' + targetId
        } else {
          const target = document.querySelector(targetId)
          if (target) {
            // Close mobile navbar if open
            const navbarCollapse = document.querySelector('.navbar-collapse')
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
              const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
              })
              bsCollapse.hide()
            }

            const navbarHeight = document.querySelector('.navbar').offsetHeight
            const targetPosition = target.offsetTop - navbarHeight
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            })
          }
        }
      }
    })
  })

  // Add active state to nav links on scroll
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link')

  window.addEventListener('scroll', () => {
    let current = ''
    const navbarHeight = document.querySelector('.navbar').offsetHeight

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 100
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id')
      }
    })

    navLinks.forEach(link => {
      link.classList.remove('active')
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active')
      }
    })
  })

  // Enhanced scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, observerOptions)

  // Observe all animated elements
  document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => observer.observe(el))

  // Observe section headers for animated underline
  document.querySelectorAll('section h2').forEach(el => observer.observe(el))

  // Navbar shadow on scroll
  const navbar = document.querySelector('.navbar')
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
  })

  // Subtle fade effect for hero section (removed parallax to prevent overlap)
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector('#hero')
    if (hero && scrolled < hero.offsetHeight) {
      // Only fade opacity, no transform to prevent overlap
      hero.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.3
    }
  })

  // Stagger card animations
  const cards = document.querySelectorAll('.card')
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`
  })

  // Add subtle mouse tracking to hero section
  const heroSection = document.querySelector('#hero')
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const xPercent = (clientX / innerWidth - 0.5) * 2
      const yPercent = (clientY / innerHeight - 0.5) * 2

      const heroImage = document.querySelector('.hero-image')
      if (heroImage) {
        heroImage.style.transform = `translate(${xPercent * 10}px, ${yPercent * 10}px)`
      }
    })
  }

  // Blog System Setup
  const mainContent = document.getElementById('main-content')
  const blogPage = document.getElementById('blog-page')
  const blogListPage = document.getElementById('blog-list-page')
  const blogPostPage = document.getElementById('blog-post-page')

  function showMainContent() {
    mainContent.classList.remove('d-none')
    blogPage.classList.add('d-none')
    window.scrollTo(0, 0)
  }

  function showBlogList() {
    mainContent.classList.add('d-none')
    blogPage.classList.remove('d-none')
    blogListPage.classList.remove('d-none')
    blogPostPage.classList.add('d-none')
    window.scrollTo(0, 0)
  }

  function showBlogPost() {
    mainContent.classList.add('d-none')
    blogPage.classList.remove('d-none')
    blogListPage.classList.add('d-none')
    blogPostPage.classList.remove('d-none')
    window.scrollTo(0, 0)
  }

  // Load featured blog posts on homepage
  async function loadFeaturedPosts() {
    const container = document.getElementById('blog-posts-container')

    try {
      await blogManager.loadPosts()
      const featured = blogManager.getFeaturedPosts()

      if (featured.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No blog posts yet. Check back soon!</p></div>'
        return
      }

      container.innerHTML = featured.map(post => `
        <div class="col-md-6 col-lg-4 scale-in">
          <div class="card blog-card h-100 shadow-sm border-0">
            <div class="card-body">
              <div class="mb-3">
                ${post.tags.map(tag => `<span class="blog-card-tag">${tag}</span>`).join('')}
              </div>
              <h5 class="card-title fw-bold">${post.title}</h5>
              <p class="text-muted small mb-2">${blogManager.formatDate(post.date)} • ${blogManager.getReadingTime(post.content)}</p>
              <p class="card-text text-muted">${post.excerpt}</p>
              <a href="/blog/${post.slug}" data-link class="btn btn-outline-primary">Read More</a>
            </div>
          </div>
        </div>
      `).join('')

      // Trigger animations
      document.querySelectorAll('#blog-posts-container .scale-in').forEach(el => observer.observe(el))
    } catch (error) {
      console.error('Error loading blog posts:', error)
      container.innerHTML = '<div class="col-12 text-center"><p class="text-danger">Error loading blog posts.</p></div>'
    }
  }

  // Load all blog posts for blog list page
  async function loadAllPosts() {
    const container = document.getElementById('all-posts-container')
    container.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"></div></div>'

    try {
      const posts = await blogManager.loadPosts()

      if (!posts || posts.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No blog posts yet. Check back soon!</p></div>'
        return
      }

      container.innerHTML = posts.map(post => `
        <div class="col-12 mb-4">
          <div class="card blog-card shadow-sm border-0">
            <div class="card-body">
              <div class="mb-3">
                ${post.tags.map(tag => `<span class="blog-card-tag">${tag}</span>`).join('')}
              </div>
              <h3 class="card-title fw-bold mb-2">
                <a href="/blog/${post.slug}" data-link class="text-decoration-none">${post.title}</a>
              </h3>
              <p class="text-muted small mb-3">${blogManager.formatDate(post.date)} • ${blogManager.getReadingTime(post.content)} • By ${post.author}</p>
              <p class="card-text">${post.excerpt}</p>
              <a href="/blog/${post.slug}" data-link class="btn btn-primary">Read More</a>
            </div>
          </div>
        </div>
      `).join('')
    } catch (error) {
      console.error('Error loading blog posts:', error)
      container.innerHTML = '<div class="col-12 text-center"><p class="text-danger">Error loading blog posts.</p></div>'
    }
  }

  // Load individual blog post
  async function loadBlogPost(slug) {
    const container = document.getElementById('blog-post-content')
    container.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"></div></div>'

    try {
      const post = await blogManager.getPost(slug)

      if (!post) {
        container.innerHTML = '<div class="alert alert-danger">Blog post not found.</div>'
        return
      }

      container.innerHTML = `
        <div class="blog-post-meta mb-4">
          <div class="mb-3">
            ${post.tags.map(tag => `<span class="blog-card-tag">${tag}</span>`).join('')}
          </div>
          <div>${blogManager.formatDate(post.date)} • ${blogManager.getReadingTime(post.content)} • By ${post.author}</div>
        </div>
        <div class="blog-post-content">
          ${post.html}
        </div>
      `

      // Update page title
      document.title = `${post.title} | Jordan Schnur`
    } catch (error) {
      console.error('Error loading blog post:', error)
      container.innerHTML = '<div class="alert alert-danger">Error loading blog post.</div>'
    }
  }

  // Setup routes
  router.addRoute('/', () => {
    showMainContent()
    document.title = 'Jordan Schnur Pittsburgh | Senior Software Engineer II | Full-Stack Developer'

    // Handle hash scrolling after navigation
    setTimeout(() => {
      const hash = window.location.hash
      if (hash) {
        const target = document.querySelector(hash)
        if (target) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight
          const targetPosition = target.offsetTop - navbarHeight
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          })
        }
      }
    }, 100)
  })

  router.addRoute('/blog', () => {
    showBlogList()
    loadAllPosts()
    document.title = 'Blog | Jordan Schnur'
  })

  router.addRoute('/blog/:slug', async (params) => {
    showBlogPost()
    await loadBlogPost(params.slug)
  })

  router.addRoute('404', () => {
    showMainContent()
    // Could add a 404 section or alert here
  })

  // Initialize router
  router.init()

  // Load featured posts on homepage
  loadFeaturedPosts()
})
