// Simple router for SPA navigation
export class Router {
  constructor() {
    this.routes = new Map()
    this.currentRoute = null

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname)
    })

    // Handle link clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault()
        this.navigate(e.target.getAttribute('href'))
      }
    })
  }

  addRoute(path, handler) {
    this.routes.set(path, handler)
  }

  navigate(path) {
    window.history.pushState({}, '', path)
    this.handleRoute(path)
  }

  handleRoute(path) {
    // Check for exact match
    if (this.routes.has(path)) {
      this.currentRoute = path
      this.routes.get(path)()
      return
    }

    // Check for pattern matches (e.g., /blog/:slug)
    for (const [route, handler] of this.routes) {
      const pattern = new RegExp('^' + route.replace(/:\w+/g, '([^/]+)') + '$')
      const match = path.match(pattern)

      if (match) {
        this.currentRoute = path
        const params = {}
        const paramNames = route.match(/:\w+/g) || []

        paramNames.forEach((param, index) => {
          params[param.substring(1)] = match[index + 1]
        })

        handler(params)
        return
      }
    }

    // 404 - route not found
    if (this.routes.has('404')) {
      this.routes.get('404')()
    }
  }

  init() {
    // Handle initial page load
    const path = window.location.pathname
    if (path !== '/') {
      this.handleRoute(path)
    }
  }
}

export const router = new Router()

