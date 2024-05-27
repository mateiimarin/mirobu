export default defineNuxtRouteMiddleware((to, from) => {
    const routesx = ['dashboard', 'analytics', 'settings', 'integrations']
    for(let routex of routesx) {
        if(to.path.includes(routex)) return navigateTo('/admin/coming-soon');
    }
    
  })