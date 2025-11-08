// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import * as bootstrap from 'bootstrap'

// Import custom styles
import './style.css'

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
})
