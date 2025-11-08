// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import * as bootstrap from 'bootstrap'

// Import custom styles
import './style.css'

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
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
