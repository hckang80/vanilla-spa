const router = async () => {
  const routes = [
    { path: "/", view: () => console.log("Viewing Home") },
    { path: "/posts", view: () => console.log("Viewing Posts") },
    { path: "/settings", view: () => console.log("Viewing Settings") },
  ]

  const pageMatches = routes.map((route) => {
    return {
      route,
      isMatch: route.path === location.pathname,
    }
  })

  const match = pageMatches.find((pageMatch) => pageMatch.isMatch)
  console.log(match.route.view())
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault()
      history.pushState(null, null, e.target.href)
      router()
    }
  })
  router()
})

window.addEventListener("popstate", () => {
  router()
})
