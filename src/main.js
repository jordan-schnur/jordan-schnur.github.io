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

  // Fade in animation on scroll
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

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
})
