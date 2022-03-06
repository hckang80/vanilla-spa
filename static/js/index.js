import Home from './pages/Home.js'
import Posts from './pages/Posts.js'
import Settings from './pages/Settings.js'

const routes = [
  { path: '', view: Home },
  { path: '#posts', view: Posts },
  { path: '#settings', view: Settings },
]

const router = async () => {
  const pageMatches = routes.map((route) => {
    return {
      route,
      isMatch: route.path === location.hash,
    }
  })

  const match = pageMatches.find((pageMatch) => pageMatch.isMatch)

  const page = match.route.view()

  document.title = page.title
  document.querySelector('#root').innerHTML = await page.render()
}

const toHash = (href = '') => {
  const path = href.split('/').pop()
    ? `#${href.split('/').pop()}`
    : ''
  const pathArray = href.split('/')
  const url = `${pathArray.slice(0, pathArray.length - 1).join('/')}/${path}`
  return url
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault()
      history.pushState(null, null, toHash(e.target.href))
      router()
    }
  })
  router()
})

window.addEventListener('popstate', () => {
  router()
})
