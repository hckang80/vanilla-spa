import Home from './pages/Home.js'
import Posts from './pages/Posts.js'
import Settings from './pages/Settings.js'

const router = async () => {
  const routes = [
    { path: '/', view: Home },
    { path: '/posts', view: Posts },
    { path: '/settings', view: Settings },
  ]

  const pageMatches = routes.map((route) => {
    return {
      route,
      isMatch: route.path === location.pathname,
    }
  })

  const match = pageMatches.find((pageMatch) => pageMatch.isMatch)

  const page = match.route.view()

  document.title = page.title
  document.querySelector('#root').innerHTML = await page.render()
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault()
      history.pushState(null, null, e.target.href)
      router()
    }
  })
  router()
})

window.addEventListener('popstate', () => {
  router()
})
