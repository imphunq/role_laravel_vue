import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'task',
      component: require('./components/Task.vue').default,
      meta: {
        requiredRoles: ['developer', 'manager']
      }
    },
    {
      path: '/user',
      name: 'user',
      component: require('./components/User.vue').default,
      meta: {
        requiredRoles: ['manager']
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let user = window.__user__
  if (to.meta.requiredRoles.includes(user.slug)) {
    next ()
  } else {
    alert('You dont have permission to access this page')
    next({
      path: '/'
    })
  }
})

export default router
